import React, { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, ListGroup, Button } from 'react-bootstrap'

const box = { textAlign: 'left', margin: '2px', padding: '5px' }
const button = { margin: '10px' }
const bgc = { backgroundColor: 'lightgrey', marginTop: '20px', padding: '25px' }
const passwordLink = {
  cursor: 'pointer',
  textDecoration: 'none',
  textAlign: 'left',
  margin: '2px',
  padding: '5px',
  color: 'teal',
}
const list = { listStyle: 'none', paddingLeft: 0, margin: 0 }
const title = { fontSize: '40px', textAlign: 'left', margin: '20px' }
const subtitle = { fontSize: '20px' }

const ExistingProfile = ({ profile = {}, /* changePassword not used here */ }) => {
  const navigate = useNavigate()

  const subscriptionText = profile.isSubscribed ? 'Currently Subscribed' : 'Currently Not Subscribed'

  // Normalize tags to an array of {_id, name} for rendering
  const normalizedTags = useMemo(() => {
    const tags = Array.isArray(profile.tags) ? profile.tags : []
    return tags.map((t) =>
      typeof t === 'string' ? { _id: t, name: t } : { _id: t?._id || t?.id || t?.name, name: t?.name || '' }
    )
  }, [profile.tags])

  const editProfile = () => navigate('/profile/edit')
  const goChangePassword = () => navigate('/change-password')

  return (
    <div>
      <div className='container' style={bgc}>
        <h1 style={title}>Profile</h1>

        <div className='container' style={box}>
          <Card style={{ width: '18rem' }}>
            <Card.Header style={subtitle}>Account Details</Card.Header>
            <ListGroup variant='flush'>
              <ListGroup.Item style={box}>{profile.name || '—'}</ListGroup.Item>
              <ListGroup.Item style={box}>{profile.address || '—'}</ListGroup.Item>
              <ListGroup.Item style={box}>{subscriptionText}</ListGroup.Item>
              <Card.Link style={{ ...box, ...passwordLink }} onClick={goChangePassword}>
                Change Password
              </Card.Link>
            </ListGroup>
          </Card>
        </div>

        <div className='container' style={box}>
          <Card style={{ width: '18rem' }}>
            <Card.Header style={subtitle}>Favorite Art Categories</Card.Header>
            <ListGroup variant='flush'>
              <ListGroup.Item style={box}>
                <ul style={list}>
                  {normalizedTags.length === 0 ? (
                    <li key='empty'>No favorites selected.</li>
                  ) : (
                    normalizedTags.map((tag) => <li key={tag._id || tag.name}>{tag.name || '—'}</li>)
                  )}
                </ul>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </div>

        <Button onClick={editProfile} variant='light' style={button}>
          Edit Profile
        </Button>
      </div>
    </div>
  )
}

export default ExistingProfile
