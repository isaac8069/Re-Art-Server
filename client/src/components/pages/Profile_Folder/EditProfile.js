import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button, Card } from 'react-bootstrap'
import apiUrl from '../../../apiConfig'

const box = { textAlign: 'left', margin: '2px', padding: '5px' }
const button = { margin: '10px' }
const bgc = { backgroundColor: 'lightgrey', marginTop: '20px', padding: '25px' }
const fav = { textAlign: 'left', margin: '2px', listStyle: 'none' }
const check = { padding: '5px' }
const title = { fontSize: '40px', textAlign: 'left', margin: '20px' }
const subtitle = { fontSize: '20px' }

const EditProfile = (props) => {
  const { user, profile: incomingProfile, getProfile, msgAlert } = props
  const navigate = useNavigate()

  // Normalize incoming profile into a safe shape
  const normalizeProfile = (p = {}) => ({
    name: p.name ?? '',
    address: p.address ?? '',
    // ensure tags as array of {_id, name} or string ids
    tags: Array.isArray(p.tags) ? p.tags : [],
    isSubscribed: Boolean(p.isSubscribed),
  })

  const [currentProfile, setCurrentProfile] = useState(normalizeProfile(incomingProfile))
  const [tags, setTags] = useState([])

  // Derived: set of selected tag ids (works for ObjectId strings or populated tag objects)
  const selectedTagIds = new Set(
    (currentProfile.tags || []).map(t => (typeof t === 'string' ? t : t?._id)).filter(Boolean)
  )

  // Keep state in sync if parent profile prop changes later
  useEffect(() => {
    setCurrentProfile(normalizeProfile(incomingProfile))
  }, [incomingProfile])

  // Load tags on mount
  useEffect(() => {
    fetch(`${apiUrl}/api/tags`)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`)
        return res.json()
      })
      .then(data => setTags(data.tags || []))
      .catch(err => {
        console.error('GET TAGS ERROR:', err)
        msgAlert?.({
          heading: 'Could not load tags',
          message: 'Please try again shortly.',
          variant: 'danger',
        })
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Controlled inputs
  const handleChange = (e) => {
    const { name, value } = e.target
    setCurrentProfile(prev => ({ ...prev, [name]: value }))
  }

  // Toggle tag id in selection (immutable)
  const handleCheck = (e) => {
    const { id, checked } = e.target
    setCurrentProfile(prev => {
      // convert existing tags to ids
      const prevIds = new Set((prev.tags || []).map(t => (typeof t === 'string' ? t : t?._id)).filter(Boolean))
      if (checked) {
        prevIds.add(id)
      } else {
        prevIds.delete(id)
      }
      return { ...prev, tags: Array.from(prevIds) }
    })
  }

  // Save edits
  const patchProfile = (e) => {
    e.preventDefault()

    const payload = {
      profile: {
        name: currentProfile.name,
        address: currentProfile.address,
        // send ids only; server can populate when reading
        tags: Array.isArray(currentProfile.tags)
          ? currentProfile.tags.map(t => (typeof t === 'string' ? t : t?._id)).filter(Boolean)
          : [],
        isSubscribed: Boolean(currentProfile.isSubscribed),
      },
    }

    fetch(`${apiUrl}/api/profiles`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(payload),
    })
      .then(res => {
        if (!res.ok) throw new Error(`PATCH failed with status ${res.status}`)
        return res.json()
      })
      .then(({ profile }) => {
        msgAlert?.({
          heading: 'Profile updated',
          message: 'Your changes have been saved.',
          variant: 'success',
        })
        // sync with server truth if returned
        if (profile) setCurrentProfile(normalizeProfile(profile))
        getProfile?.()
        navigate('/profile')
      })
      .catch(err => {
        console.error('PATCH PROFILE ERROR:', err)
        msgAlert?.({
          heading: 'Update failed',
          message: 'Please review your changes and try again.',
          variant: 'danger',
        })
      })
  }

  // Cancel subscription
  const patchSubscription = (e) => {
    e.preventDefault()
    const payload = { profile: { isSubscribed: false } }

    fetch(`${apiUrl}/api/profiles`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(payload),
    })
      .then(res => {
        if (!res.ok) throw new Error(`PATCH failed with status ${res.status}`)
        return res.json()
      })
      .then(({ profile }) => {
        msgAlert?.({
          heading: 'Subscription canceled',
          message: 'Your subscription has been canceled.',
          variant: 'success',
        })
        if (profile) setCurrentProfile(normalizeProfile(profile))
        getProfile?.()
        navigate('/profile')
      })
      .catch(err => {
        console.error('CANCEL SUBSCRIPTION ERROR:', err)
        msgAlert?.({
          heading: 'Could not cancel',
          message: 'Please try again.',
          variant: 'danger',
        })
      })
  }

  const goBack = () => navigate('/profile')

  return (
    <div>
      <div className='container' style={bgc}>
        <h1 style={title}>Edit Profile</h1>

        <Form onSubmit={patchProfile}>
          <div className='container' style={box}>
            <Form.Group className="mb-3" controlId="name-input">
              <Form.Label style={subtitle}>Name</Form.Label>
              <Form.Control
                style={{ width: '18rem' }}
                placeholder="Enter name"
                onChange={handleChange}
                type="text"
                name="name"
                id="name"
                value={currentProfile.name}
              />
            </Form.Group>
          </div>

          <div className='container' style={box}>
            <Form.Group className="mb-3" controlId="address-input">
              <Form.Label style={subtitle}>Address</Form.Label>
              <Form.Control
                style={{ width: '18rem' }}
                placeholder="Address"
                onChange={handleChange}
                type="text"
                name="address"
                id="address"
                value={currentProfile.address}
              />
            </Form.Group>
          </div>

          <div className='container' style={box}>
            <Card style={{ width: '18rem' }}>
              <Card.Header style={subtitle}>Favorite Art Categories</Card.Header>
              <ul style={{ margin: 0, padding: 0 }}>
                {tags.map(tag => (
                  <li key={tag._id} style={fav}>
                    <label style={check} htmlFor={tag._id}>{tag.name}</label>
                    <input
                      onChange={handleCheck}
                      type="checkbox"
                      id={tag._id}
                      name={tag.name}
                      checked={selectedTagIds.has(tag._id)}
                    />
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          <Button variant="light" type="submit" style={button}>
            Submit
          </Button>
          <Button variant="light" type="button" onClick={goBack} style={button}>
            Cancel
          </Button>
          <Button
            hidden={!currentProfile.isSubscribed}
            variant="danger"
            type="button"
            onClick={patchSubscription}
            style={button}
          >
            Cancel Subscription
          </Button>
        </Form>
      </div>
    </div>
  )
}

export default EditProfile
