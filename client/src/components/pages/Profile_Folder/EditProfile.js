import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button, Card } from 'react-bootstrap'
import apiUrl from '../../../apiConfig'


const box = {
  textAlign: 'left',
  margin: '2px',
  padding: '5px'
}
const button = {
  margin: '10px',
}
const bgc = {
  backgroundColor: 'lightgrey',
  marginTop: "20px",
  padding: '25px'
}
const fav = {
  textAlign: 'left',
  margin: '2px',
  listStyle: 'none'
}
const check = {
  padding: '5px'
}
const title = {
  fontSize: '40px',
  textAlign: 'left',
  margin: '20px'
}
const subtitle = {
	fontSize: '20px',
}

const EditProfile = (props) => {
  //useNavigate for redirecting once profile is succesfully patched

  const navigate = useNavigate();

  // State are set for our currentProfile that is passed from App.js and tags which will come from props.profile as well
  // State for tagNames an array of the tag names need for testing which tags are currently attaced to the users profile
  const [currentProfile, setCurrentProfile] = useState(props.profile)
  const [tags, setTags] = useState([])
  const [tagNames, setTagNames] = useState(props.profile.tags.map((e) => e.name))

  // call to api when components renders and gets the tags from database
  useEffect(() => {
    getTags()
  }, [])

  // A function that is called every time the name or address inputs are changed
  // Function then sets these inputs as the currentProfile state  
  const handleChange = e => {
    setCurrentProfile({ ...currentProfile, [e.target.name]: e.target.value })
  }

  // Function that runs any time user checks or unchecks one of the tag boxes
  // Runs logic that either removes or addes tag object to currentProfile
  // Also either removes or addes tag name to tagNames state
  const handleCheck = e => {
    if (e.target.checked) {
      setCurrentProfile({ ...currentProfile, tags: [...currentProfile.tags, { _id: e.target.id, name: e.target.name }] })
      setTagNames([...tagNames, e.target.name])
    }
    else {
      let bufferTags = currentProfile.tags
      let index = tagNames.indexOf(e.target.name)
      bufferTags.splice(index, 1)
      setCurrentProfile({ ...currentProfile, tags: bufferTags })
      setTagNames(currentProfile.tags.map((e) => e.name))
    }
  }

  // api call the gets the tags
  const getTags = () => {
    fetch(`${apiUrl}/tags`)
      .then(res => res.json())
      .then(foundTags => {
        setTags(foundTags.tags)
      })
      .catch(err => console.log(err))
  }

  // Function runs when Edit Profile button is pressed
  // Sets currentProfile state to an object that is sent to our data base as a PATCH request
  // At the end getProfile is run to ensure that profile is up to date inside App.js
  const patchProfile = (e) => {
    e.preventDefault()
    let preJSONBody = {
      name: currentProfile.name,
      address: currentProfile.address,
      tags: currentProfile.tags,
      isSubscribed: currentProfile.isSubscribed,
      userId: currentProfile.userId
    }
    const requestOptions = {
      method: 'PATCH',
      body: JSON.stringify(preJSONBody),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${props.user.token}`
      },
    }
    fetch(`${apiUrl}/profiles/user/${props.user._id}`, requestOptions)
      .then(patchedProfile => {
        props.getProfile()
        navigate('/profile')
      })
      .catch(err => console.error(err))
  }

  // Function runs any time user press the cancel subscription button
  // Sends a object with only the isSubscribed attribute as a PATCH request to our data base
  // At end runs getProfile to ensure that our profile in App.js is up to date
  const patchSubscription = (e) => {
    e.preventDefault()
    let preJSONBody = {
      isSubscribed: false,
    }
    const requestOptions = {
      method: 'PATCH',
      body: JSON.stringify(preJSONBody),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${props.user.token}`
      },
    }
    fetch(`${apiUrl}/profiles/user/${props.user._id}`, requestOptions)
      .then(patchedProfile => {
        props.getProfile()
        navigate('/profile')
      })
      .catch(err => console.error(err))
  }

  // Funtion that runs when cancel button is pressed that takes user back to existing profile
  const goBack = () => {
    return navigate('/profile')
  }

  return (
    <div>
      <div className='container' style={bgc}>
        <h1 style={title}>Edit Profile</h1>
        <Form onSubmit={patchProfile}>
          <div className='container' style={box}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label style={subtitle}>Name</Form.Label>
              <Form.Control style={{ width: '18rem' }} placeholder="Enter name" onChange={handleChange} type="text" name="name" id="name" />
            </Form.Group>
          </div>
          <div className='container' style={box}>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label style={subtitle}>Address</Form.Label>
              <Form.Control style={{ width: '18rem' }} placeholder="Address" onChange={handleChange} type="text" name="address" id="address" />
            </Form.Group>
          </div>
          <div className='container' style={box}>
            <Card style={{ width: '18rem' }}>
              <Card.Header style={subtitle}>Favorite Art Categories</Card.Header>
              {
                tags.map(tag => (
                  <li style={fav}>
                    <label style={check} htmlFor={tag.name}>{tag.name}</label>
                    <input onChange={handleCheck} type="checkbox" checked={tagNames.includes(tag.name) ? true : false} name={tag.name} id={tag._id} />
                  </li>
                ))
              }
            </Card>
          </div>
          <Button variant="light" type="submit" style={button}>
            Submit
          </Button>
          <Button variant="light" type="goBack" onClick={goBack} style={button}>
            Cancel
          </Button>
          <Button hidden={!currentProfile.isSubscribed} variant="danger" type="goBack" onClick={patchSubscription} style={button}>
            Cancel Subscription
          </Button>
        </Form>
      </div>
    </div>
  )
}

export default EditProfile