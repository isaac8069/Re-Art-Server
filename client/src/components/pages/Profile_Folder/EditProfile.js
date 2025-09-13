import React, { useEffect, useMemo, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button, Card, Spinner, Alert } from 'react-bootstrap'
import apiUrl from '../../../apiConfig'

const box = { textAlign: 'left', margin: '2px', padding: '5px' }
const button = { margin: '10px' }
const bgc = { backgroundColor: 'lightgrey', marginTop: '20px', padding: '25px' }
const fav = { textAlign: 'left', margin: '2px', listStyle: 'none' }
const check = { padding: '5px' }
const title = { fontSize: '40px', textAlign: 'left', margin: '20px' }
const subtitle = { fontSize: '20px' }

const normalizeProfile = (p = {}) => ({
  name: p?.name ?? '',
  address: p?.address ?? '',
  tags: Array.isArray(p?.tags) ? p.tags : [],
  isSubscribed: Boolean(p?.isSubscribed),
})

const EditProfile = (props) => {
  const { user, profile: incomingProfile, getProfile, msgAlert } = props
  const navigate = useNavigate()

  // form state
  const [currentProfile, setCurrentProfile] = useState(normalizeProfile(incomingProfile))

  // tags state
  const [tags, setTags] = useState([])
  const [tagsLoading, setTagsLoading] = useState(true)
  const [tagsError, setTagsError] = useState(null)

  // submit state
  const [submitting, setSubmitting] = useState(false)

  // sync if parent updates profile after mount
  useEffect(() => {
    setCurrentProfile(normalizeProfile(incomingProfile))
  }, [incomingProfile])

  // selected tag ids (supports array of ids or populated objects)
  const selectedTagIds = useMemo(() => {
    const ids = (currentProfile.tags || [])
      .map(t => (typeof t === 'string' ? t : t?._id))
      .filter(Boolean)
    return new Set(ids)
  }, [currentProfile.tags])

  // load tags
  useEffect(() => {
    const controller = new AbortController()

    async function loadTags () {
      try {
        setTagsLoading(true)
        setTagsError(null)

        const res = await fetch(`${apiUrl}/api/tags`, { signal: controller.signal })
        if (!res.ok) throw new Error(`Tags request failed (${res.status})`)
        const data = await res.json()
        const parsed = Array.isArray(data) ? data : (data?.tags || [])
        setTags(parsed)
      } catch (err) {
        if (err.name === 'AbortError') return
        console.error('GET TAGS ERROR:', err)
        setTagsError('Could not load tags.')
        msgAlert?.({
          heading: 'Could not load tags',
          message: 'Please try again shortly.',
          variant: 'danger',
        })
      } finally {
        setTagsLoading(false)
      }
    }

    loadTags()
    return () => controller.abort()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // handlers
  const handleChange = useCallback((e) => {
    const { name, value } = e.target
    setCurrentProfile(prev => ({ ...prev, [name]: value }))
  }, [])

  const handleCheck = useCallback((e) => {
    const { id, checked } = e.target
    setCurrentProfile(prev => {
      const prevIds = new Set(
        (prev.tags || []).map(t => (typeof t === 'string' ? t : t?._id)).filter(Boolean)
      )
      if (checked) prevIds.add(id)
      else prevIds.delete(id)
      return { ...prev, tags: Array.from(prevIds) }
    })
  }, [])

  const goBack = useCallback(() => navigate('/profile'), [navigate])

  const patchProfile = useCallback(async (e) => {
    e.preventDefault()
    if (submitting) return
    setSubmitting(true)

    const payload = {
      profile: {
        name: currentProfile.name,
        address: currentProfile.address,
        tags: Array.isArray(currentProfile.tags)
          ? currentProfile.tags.map(t => (typeof t === 'string' ? t : t?._id)).filter(Boolean)
          : [],
        isSubscribed: Boolean(currentProfile.isSubscribed),
      },
    }

    try {
      const res = await fetch(`${apiUrl}/api/profiles`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error(`PATCH failed (${res.status})`)
      const data = await res.json()

      msgAlert?.({
        heading: 'Profile updated',
        message: 'Your changes have been saved.',
        variant: 'success',
      })

      if (data?.profile) setCurrentProfile(normalizeProfile(data.profile))
      getProfile?.()
      navigate('/profile')
    } catch (err) {
      console.error('PATCH PROFILE ERROR:', err)
      msgAlert?.({
        heading: 'Update failed',
        message: 'Please review your changes and try again.',
        variant: 'danger',
      })
    } finally {
      setSubmitting(false)
    }
  }, [currentProfile, getProfile, msgAlert, navigate, submitting, user?.token])

  const patchSubscription = useCallback(async (e) => {
    e.preventDefault()
    if (submitting) return
    setSubmitting(true)

    const payload = { profile: { isSubscribed: false } }

    try {
      const res = await fetch(`${apiUrl}/api/profiles`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error(`PATCH failed (${res.status})`)
      const data = await res.json()

      msgAlert?.({
        heading: 'Subscription canceled',
        message: 'Your subscription has been canceled.',
        variant: 'success',
      })

      if (data?.profile) setCurrentProfile(normalizeProfile(data.profile))
      getProfile?.()
      navigate('/profile')
    } catch (err) {
      console.error('CANCEL SUBSCRIPTION ERROR:', err)
      msgAlert?.({
        heading: 'Could not cancel',
        message: 'Please try again.',
        variant: 'danger',
      })
    } finally {
      setSubmitting(false)
    }
  }, [getProfile, msgAlert, navigate, submitting, user?.token])

  return (
    <div>
      <div className='container' style={bgc}>
        <h1 style={title}>Edit Profile</h1>

        <Form onSubmit={patchProfile}>

          <div className='container' style={box}>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label style={subtitle}>Name</Form.Label>
              <Form.Control
                style={{ width: '18rem' }}
                placeholder="Enter name"
                onChange={handleChange}
                type="text"
                name="name"
                value={currentProfile.name}
                disabled={submitting}
              />
            </Form.Group>
          </div>

          <div className='container' style={box}>
            <Form.Group className="mb-3" controlId="address">
              <Form.Label style={subtitle}>Address</Form.Label>
              <Form.Control
                style={{ width: '18rem' }}
                placeholder="Address"
                onChange={handleChange}
                type="text"
                name="address"
                value={currentProfile.address}
                disabled={submitting}
              />
            </Form.Group>
          </div>

          <div className='container' style={box}>
            <Card style={{ width: '18rem' }}>
              <Card.Header style={subtitle}>Favorite Art Categories</Card.Header>

              {tagsLoading && (
                <div className="p-3">
                  <Spinner animation="border" size="sm" /> Loading tags…
                </div>
              )}

              {!tagsLoading && tagsError && (
                <div className="p-3">
                  <Alert variant="danger" className="mb-0">Could not load tags.</Alert>
                </div>
              )}

              {!tagsLoading && !tagsError && (
                <ul style={{ margin: 0, padding: 0 }}>
                  {tags.map(tag => (
                    <li key={tag._id} style={fav}>
                      <input
                        onChange={handleCheck}
                        type="checkbox"
                        id={tag._id}
                        name={tag.name}
                        checked={selectedTagIds.has(tag._id)}
                        disabled={submitting}
                      />
                      <label style={check} htmlFor={tag._id}>{tag.name}</label>
                    </li>
                  ))}
                  {tags.length === 0 && (
                    <li className="p-3">No tags available.</li>
                  )}
                </ul>
              )}
            </Card>
          </div>

          <Button variant="light" type="submit" style={button} disabled={submitting}>
            {submitting ? 'Saving…' : 'Submit'}
          </Button>

          <Button variant="light" type="button" onClick={goBack} style={button} disabled={submitting}>
            Cancel
          </Button>

          <Button
            hidden={!currentProfile.isSubscribed}
            variant="danger"
            type="button"
            onClick={patchSubscription}
            style={button}
            disabled={submitting}
          >
            {submitting ? 'Processing…' : 'Cancel Subscription'}
          </Button>
        </Form>
      </div>
    </div>
  )
}

export default EditProfile
