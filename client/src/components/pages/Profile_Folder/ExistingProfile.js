import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { render } from 'sass'
import { Card, ListGroup, Button } from 'react-bootstrap'
import ChangePassword from '../../auth/ChangePassword';
import EditProfile from './EditProfile'

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
const password = {
  cursor: 'pointer',
  textDecoration: 'none',
  textAlign: 'left',
  margin: '2px',
  padding: '5px',
  color: 'teal'
}
const list = {
  listStyle: 'none'
}
const title = {
  fontSize: '40px',
  textAlign: 'left',
  margin: '20px'
}
const subtitle = {
	fontSize: '20px',
}

const ExistingProfile = (props) => {

  // seting a stat to hold our tags, subscription, and useNavigate
  // sets tags as loading until tag data comes back from dataBase
  // sets subscription to loading untill data comes back from dataBase
  const [tagsArray, setTagsArray] = useState([<li>Loading...</li>])
  const [subscription, setSubscription] = useState('Loading...')
  const navigate = useNavigate()

  // This use effect test the profile and sets outputs to page based on data
  // The useEffect is set to run everytime profile changes
  useEffect(() => {
    if (props.profile.tags) {
      setTagsArray(props.profile.tags.map((tag) => {
        return <li>{tag.name}</li>
      }))
    }
    if (props.profile.isSubscribed) {
      setSubscription('Currently Subscribed')
    } else {
      setSubscription('Currently Not Subscribed')
    }
  }, [props.profile])

  // Function that runs when user clicks Edit Profile button
  const editProfile = () => {
    return navigate('/profile/edit')
  }

  // Function that runs when user clicks Change Passwork button
  const changePassword = () => {
    return navigate('/change-password')
  }
  
  return (
    <div>
      <div className='container' style={bgc}>
        <h1 style={title}>Profile</h1>
        <div className='container' style={box}>
          <Card style={{ width: '18rem' }}>
            <Card.Header style={subtitle}>Account Details</Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item style={box}>{props.profile.name}</ListGroup.Item>
              <ListGroup.Item style={box}>{props.profile.address}</ListGroup.Item>
              <ListGroup.Item style={box}>{subscription}</ListGroup.Item>
              <Card.Link style={box, password} onClick={changePassword}>Change Password</Card.Link>
            </ListGroup>
          </Card>
        </div>
        <div className='container' style={box}>
          <Card style={{ width: '18rem' }}>
            <Card.Header style={subtitle}>Favorite Art Categories</Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item style={list}>{tagsArray}</ListGroup.Item>
            </ListGroup>
          </Card>
        </div>
        {/* <p>{subscription}</p> */}
        <Button onClick={editProfile} variant="light" style={button}>Edit Profile</Button>
        {/* <button onClick={editProfile}>Edit Profile</button> */}
      </div>
    </div>
  )
}

export default ExistingProfile