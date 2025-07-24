// import React, { Component } from 'react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { signUp, signIn } from '../../api/auth'
import messages from '../shared/AutoDismissAlert/messages'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

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

const SignUp = (props) => {
    // constructor(props) {
    // 	super(props)

    // 	this.state = {
    // 		email: '',
    // 		password: '',
    // 		passwordConfirmation: '',
    // 	}
    // }    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')

    const navigate = useNavigate()

    const onSignUp = (event) => {
        event.preventDefault()

        const { msgAlert, setUser } = props

        const credentials = { email, password, passwordConfirmation }

        signUp(credentials)
            .then(() => signIn(credentials))
            .then((res) => setUser(res.data.user))
            .then(() =>
                msgAlert({
                    heading: 'Sign Up Success',
                    message: messages.signUpSuccess,
                    variant: 'success',
                })
            )
            .then(() => navigate('/profile'))
            .catch((error) => {
                setEmail('')
                setPassword('')
                setPasswordConfirmation('')
                msgAlert({
                    heading: 'Sign Up Failed with error: ' + error.message,
                    message: messages.signUpFailure,
                    variant: 'danger',
                })
            })
    }

    return (
        <div className='row'>
            <div className='col-sm-10 col-md-8 mx-auto mt-5' style={bgc}>
                <h1 style={title}>Sign Up</h1>
                <Form onSubmit={onSignUp}>
                    <div className='container' style={box}>
                        <Form.Group controlId='email'>
                            <Form.Label style={subtitle}>Email address</Form.Label>
                            <Form.Control
                                style={{ width: '18rem' }}
                                required
                                type='email'
                                name='email'
                                value={email}
                                placeholder='Enter email'
                                onChange={e => setEmail(e.target.value)}
                            />
                        </Form.Group>
                    </div>

                    <div className='container' style={box}>
                        <Form.Group controlId='password'>
                            <Form.Label style={subtitle}>Password</Form.Label>
                            <Form.Control
                                style={{ width: '18rem' }}
                                required
                                name='password'
                                value={password}
                                type='password'
                                placeholder='Password'
                                onChange={e => setPassword(e.target.value)}
                            />
                        </Form.Group>
                    </div>

                    <div className='container' style={box}>
                        <Form.Group controlId='passwordConfirmation'>
                            <Form.Label style={subtitle}>Password Confirmation</Form.Label>
                            <Form.Control
                                style={{ width: '18rem' }}
                                required
                                name='passwordConfirmation'
                                value={passwordConfirmation}
                                type='password'
                                placeholder='Confirm Password'
                                onChange={e => setPasswordConfirmation(e.target.value)}
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

export default SignUp