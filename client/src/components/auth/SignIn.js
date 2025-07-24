import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { signIn } from '../../api/auth'
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

const SignIn = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

	const onSignIn = (event) => {
		event.preventDefault()
		const { msgAlert, setUser } = props

        const credentials = {email, password}

		signIn(credentials)
			.then((res) => setUser(res.data.user))
			.then(() =>
				msgAlert({
					heading: 'Sign In Success',
					message: messages.signInSuccess,
					variant: 'success',
				})
			)
			.then(() => navigate('/'))
			.catch((error) => {
                setEmail('')
                setPassword('')
				msgAlert({
					heading: 'Sign In Failed with error: ' + error.message,
					message: messages.signInFailure,
					variant: 'danger',
				})
			})
	}

    //NEVER GOT FLESHED OUT
    // Once they leave SignIn page for any reason, set the redirect path to default
    // console.log('afterSignInTargetUrl: ',props.afterSignInTargetUrl)
    // useEffect(() => {
    //     // equivalent to componentWillUnmount
    //     return function cleanup(){
    //         props.setAfterSignInTargetUrl('/')
    //     }
    // })

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
                            onChange={e => setEmail(e.target.value)}
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
                            onChange={e => setPassword(e.target.value)}
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
