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
const title = {
  fontSize: '40px',
  textAlign: 'left',
  margin: '20px'
}
const subtitle = {
	fontSize: '20px',
}
const list = {
  listStyle: 'none'
}

const CreateProfile = (props) => {

  const navigate = useNavigate();

  // Setting a state to hold our users newProfile that will be sent to data Base to be stored with usersId as reference
  // Also setting a state for our tags
  const [newProfile, setNewProfile] = useState({
    //Other stuff will go in this object but basically we need to declare a property called tags as an array so that the spread operator will work in the first call of handleCheck
    tags: [],
    isSubscribed: false,
    userId: props.user._id
  })
  const [tags, setTags] = useState([])

  // useEffect that calls getTags everytime the component renders
  useEffect(() => {
    getTags()
  }, [])

  // Function that runs everytime that a input for either name or address changes
  // Function sets all inputs to our newProfile state
  const handleChange = e => {
    setNewProfile({ ...newProfile, [e.target.name]: e.target.value })
  }

  // This function will run everytime one of the profile checkboxes change
  // Based on checked stats of the checkbox will either add or remove the targeted tag to newProfile
  const handleCheck = e => {
    if (e.target.checked) {
      setNewProfile({ ...newProfile, tags: [...newProfile.tags, e.target.id] })
    }
    else {
      let bufferTags = newProfile.tags
      let index = newProfile.tags.indexOf(e.target.id)
      bufferTags.splice(index, 1)
      setNewProfile({ ...newProfile, tags: bufferTags })
    }
  }

  // this is the API call for tags at end of funciton sets found tags to our tag state
  const getTags = () => {
    fetch(`${apiUrl}/tags`)
      .then(res => res.json())
      .then(foundTags => {
        console.log('Found Tags by INDEX', foundTags.tags)
        setTags(foundTags.tags)
      })
      .catch(err => console.log(err))
  }


  // This funciton is set to run once the submit profile button is pressed
  // This sets the newProfile state to a object that is then sent to our Data Base as a POST request
  // At the end of function getProfile and patchProfile are run to ensure that profile data in App.js is up to date
  const postProfile = (e) => {
    e.preventDefault()
    console.log('Pressed Submit button')
    let preJSONBody = {
      name: newProfile.name,
      address: newProfile.address,
      tags: newProfile.tags,
      isSubscribed: newProfile.isSubscribed,
      userId: newProfile.userId
    }
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify(preJSONBody),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${props.user.token}`
      },
    }
    fetch(`${apiUrl}/profiles`, requestOptions)
      .then(postedProfile=> {
        props.getProfile()
        navigate('/')
      })
      .catch(err => console.error(err))
  }

  return (
    <div>
      <div className='container' style={bgc}>
        <h1 style={title}>Create a Profile</h1>
        <Form onSubmit={postProfile}>
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
              <Card.Header style={subtitle}>Favorites</Card.Header>
              {
                tags.map(tag => (
                  <li style={list}>
                    <label htmlFor={tag.name}>{tag.name}</label>
                    <input onChange={handleCheck} type="checkbox" name={tag.name} id={tag._id} style={button} />
                  </li>
                ))
              }
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