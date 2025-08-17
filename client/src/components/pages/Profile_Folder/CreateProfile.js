import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button, Card } from 'react-bootstrap'
import apiUrl from '../../../apiConfig'

const box = {
  textAlign: 'left',
  margin: '2px',
  padding: '5px'
}
const button = { margin: '10px' }
const bgc = {
  backgroundColor: 'lightgrey',
  marginTop: '20px',
  padding: '25px'
}
const title = {
  fontSize: '40px',
  textAlign: 'left',
  margin: '20px'
}
const subtitle = { fontSize: '20px' }
const list = { listStyle: 'none' }

const CreateProfile = (props) => {
  const { user, getProfile, msgAlert } = props
  const navigate = useNavigate()

  // New profile state
  const [newProfile, setNewProfile] = useState({
    name: '',
    address: '',
    tags: [],
    isSubscribed: false
  })
  const [tags, setTags] = useState([])

  useEffect(() => {
    getTags()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Fetch available tags
  const getTags = () => {
    fetch(`${apiUrl}/api/tags`)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`)
        return res.json()
      })
      .then(found => {
        setTags(found.tags || [])
      })
      .catch(err => {
        console.error('GET TAGS ERROR:', err)
        msgAlert?.({
          heading: 'Could not load tags',
          message: 'Please try again shortly.',
          variant: 'danger'
        })
      })
  }

  // Handle text inputs
  const handleChange = (e) => {
    const { name, value } = e.target
    setNewProfile(prev => ({ ...prev, [name]: value }))
  }

  // Handle tag checkbox changes (immutable)
  const handleCheck = (e) => {
    const { id, checked } = e.target
    setNewProfile(prev => {
      if (checked) {
        // add id if not already included
        if (prev.tags.includes(id)) return prev
        return { ...prev, tags: [...prev.tags, id] }
      } else {
        // remove id
        return { ...prev, tags: prev.tags.filter(tagId => tagId !== id) }
      }
    })
  }

  // Submit profile
  const postProfile = (e) => {
    e.preventDefault()

    const payload = {
      profile: {
        name: newProfile.name,
        address: newProfile.address,
        tags: newProfile.tags,
        isSubscribed: newProfile.isSubscribed
        // user is inferred from bearer token on the server
      }
    }

    fetch(`${apiUrl}/api/profiles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`
      },
      body: JSON.stringify(payload)
    })
      .then(res => {
        if (!res.ok) throw new Error(`POST failed with status ${res.status}`)
        return res.json()
      })
      .then(() => {
        msgAlert?.({
          heading: 'Profile created',
          message: 'Your profile has been saved.',
          variant: 'success'
        })
        getProfile?.()
        navigate('/')
      })
      .catch(err => {
        console.error('CREATE PROFILE ERROR:', err)
        msgAlert?.({
          heading: 'Profile not created',
          message: 'Please check your info and try again.',
          variant: 'danger'
        })
      })
  }

  return (
    <div>
      <div className='container' style={bgc}>
        <h1 style={title}>Create a Profile</h1>
        <Form onSubmit={postProfile}>
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
                value={newProfile.name}
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
                value={newProfile.address}
              />
            </Form.Group>
          </div>

          <div className='container' style={box}>
            <Card style={{ width: '18rem' }}>
              <Card.Header style={subtitle}>Favorites</Card.Header>
              <ul style={{ margin: 0, padding: 0 }}>
                {tags.map(tag => (
                  <li key={tag._id} style={list}>
                    <label htmlFor={tag._id}>{tag.name}</label>
                    <input
                      onChange={handleCheck}
                      type="checkbox"
                      name={tag.name}
                      id={tag._id}
                      style={button}
                      checked={newProfile.tags.includes(tag._id)}
                    />
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          <Button variant="light" type="submit" style={button}>
            Submit
          </Button>
        </Form>
      </div>
    </div>
  )
}

export default CreateProfile
