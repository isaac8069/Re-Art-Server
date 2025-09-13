import React, { useEffect, useMemo, useState, useCallback } from 'react'
import apiUrl from '../apiConfig'

/**
 * Props (all optional):
 * - apiBase: override API base (defaults to apiUrl)
 * - defaultSelected: array of tag IDs that should start selected
 * - onSubmit: function(selectedIds: string[]) => void
 * - refreshTags: function() => void  (called after successful submit, if provided)
 * - token: string (Bearer token to demonstrate an authenticated POST example)
 */
const Tag = ({
  apiBase = apiUrl,
  defaultSelected = [],
  onSubmit,
  refreshTags,
  token,
}) => {
  const [tags, setTags] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedIds, setSelectedIds] = useState(() => new Set(defaultSelected))
  const [submitting, setSubmitting] = useState(false)

  // Load tags on mount
  useEffect(() => {
    const controller = new AbortController()
    const load = async () => {
      try {
        setLoading(true)
        setError(null)
        // Adjust this path if your backend is /tags (without /api)
        const res = await fetch(`${apiBase}/api/tags`, { signal: controller.signal })
        if (!res.ok) throw new Error(`GET /api/tags failed (${res.status})`)
        const data = await res.json()
        const arr = Array.isArray(data) ? data : (data?.tags || [])
        setTags(arr)
      } catch (e) {
        if (e.name === 'AbortError') return
        console.error('GET TAGS ERROR:', e)
        setError('Could not load tags.')
      } finally {
        setLoading(false)
      }
    }
    load()
    return () => controller.abort()
  }, [apiBase])

  // Quick lookup to know if a tag is selected
  const isSelected = useCallback((id) => selectedIds.has(id), [selectedIds])

  // Toggle selection
  const handleCheck = useCallback((e) => {
    const { id, checked } = e.target
    setSelectedIds(prev => {
      const next = new Set(prev)
      if (checked) next.add(id)
      else next.delete(id)
      return next
    })
  }, [])

  // Submit selections
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault()
    const selected = Array.from(selectedIds)

    // If parent provided a handler, use that
    if (onSubmit) {
      onSubmit(selected)
      return
    }

    // Otherwise, example POST (adjust endpoint/shape as needed for your API)
    try {
      setSubmitting(true)
      const res = await fetch(`${apiBase}/api/profiles/tags`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ tags: selected }),
      })
      if (!res.ok) throw new Error(`PATCH /api/profiles/tags failed (${res.status})`)
      // Optionally refresh upstream list/UI:
      refreshTags?.()
    } catch (e) {
      console.error('SUBMIT TAGS ERROR:', e)
      setError('Could not save selected tags.')
    } finally {
      setSubmitting(false)
    }
  }, [apiBase, onSubmit, refreshTags, selectedIds, token])

  if (loading) return <div>Loading tags…</div>
  if (error) return <div style={{ color: 'crimson' }}>{error}</div>

  return (
    <div>
      <h1>Tags</h1>
      {tags.length === 0 ? (
        <div>No tags available.</div>
      ) : (
        <form onSubmit={handleSubmit}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {tags.map(tag => (
              <li key={tag._id} style={{ padding: '4px 0' }}>
                <input
                  type="checkbox"
                  id={tag._id}
                  name={tag.name}
                  checked={isSelected(tag._id)}
                  onChange={handleCheck}
                  disabled={submitting}
                />
                <label htmlFor={tag._id} style={{ marginLeft: 8 }}>
                  {tag.name}
                </label>
              </li>
            ))}
          </ul>

          <button type="submit" disabled={submitting} style={{ marginTop: 12 }}>
            {submitting ? 'Saving…' : 'Submit'}
          </button>
        </form>
      )}
    </div>
  )
}

export default Tag
