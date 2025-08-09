import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import apiUrl from '../../apiConfig'
import messages from '../shared/AutoDismissAlert/messages'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import axios from 'axios'

const box = {
  textAlign: 'left',
  margin: '2px',
  padding: '5px',
}

const button = {
  margin: '10px',
}

const bgc = {
  backgroundColor: 'lightgrey',
  marginTop: '20px',
  padding: '25px',
}

const title = {
  fontSize: '40px',
  textAlign: 'left',
  margin: '20px',
}

const SignIn = ({ msgAlert, setUser }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const onSignIn = (event) => {
    event.preventDefault()

    const credentials = { email, password }

    axios
      .post(`${apiUrl}/api/users/sign-in`, { credentials })
      .then((res) => {
        setUser(res.data.user)
        msgAlert({
          heading: 'Sign In Success',
          message: messages.signInSuccess,
          variant: 'success',
        })
        navigate('/')
      })
      .catch((error) => {
        console.error('Sign In Error:', error)
        setEmail('')
        setPassword('')
        msgAlert({
          heading: `Sign In Failed: ${error.message}`,
          message: messages.signInFailure,
          variant: 'danger',
        })
      })
  }

  return (
    <div className='row'>
      <div className='col-sm-10 col-md-8 mx-auto mt-5' style={bgc}>
        <h1 style={title}>Sign In</h1>
        <Form onSubmit={onSignIn}>
          <div className='container' style={box}>
            <Form.Group controlId='email'>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                style={{ width: '18rem' }}
                required
                type='email'
                name='email'
                value={email}
                placeholder='Enter email'
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
          </div>

          <div className='container' style={box}>
            <Form.Group controlId='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                style={{ width: '18rem' }}
                required
                name='password'
                value={password}
                type='password'
                placeholder='Password'
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
          </div>

          <Button variant='light' type='submit' style={button}>
            Submit
          </Button>
        </Form>
      </div>
    </div>
  )
}

export default SignIn
