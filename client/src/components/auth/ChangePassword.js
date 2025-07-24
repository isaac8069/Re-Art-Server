import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { changePassword } from '../../api/auth'
import messages from '../shared/AutoDismissAlert/messages'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Image from "./../homeComponents/images/pwd.jpeg"

const box = {
    textAlign: 'left',
    margin: '2px',
    padding: '5px'
  }
  
  const button = {
    margin: '10px',
  }
  
  const bgc = {
    backgroundColor: 'lightgrey'
  }

const ChangePassword = (props) => {
    // constructor(props) {
    // 	super(props)

    // 	this.state = {
    // 		oldPassword: '',
    // 		newPassword: '',
    // 	}
    // }
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')

    const navigate = useNavigate()

    const onChangePassword = (event) => {
        event.preventDefault()

        const { msgAlert, user } = props
        console.log('the user', user)


        const passwords = { oldPassword, newPassword }

        changePassword(passwords, user)
            .then(() =>
                msgAlert({
                    heading: 'Change Password Success',
                    message: messages.changePasswordSuccess,
                    variant: 'success',
                })
            )
            .then(() => navigate('/'))
            .catch((error) => {
                setOldPassword('')
                setNewPassword('')
                msgAlert({
                    heading: 'Change Password Failed with error: ' + error.message,
                    message: messages.changePasswordFailure,
                    variant: 'danger',
                })
            })
    }



    return (
        <div className='row'>
            <div className='col-sm-10 col-md-8 mx-auto mt-5' style={bgc}>
                <h5>Change Password</h5>
                <Form onSubmit={onChangePassword}>
                <div className='container' style={box}>
                    <Form.Group controlId='oldPassword'>
                        <Form.Label>Old password</Form.Label>
                        <Form.Control
                            style={{ width: '18rem' }}
                            required
                            name='oldPassword'
                            value={oldPassword}
                            type='password'
                            placeholder='Old Password'
                            onChange={e => setOldPassword(e.target.value)}
                        />
                    </Form.Group>
                    </div>

                    <div className='container' style={box}>
                    <Form.Group controlId='newPassword'>
                        <Form.Label>New Password</Form.Label>
                        <Form.Control
                            style={{ width: '18rem' }}
                            required
                            name='newPassword'
                            value={newPassword}
                            type='password'
                            placeholder='New Password'
                            onChange={e => setNewPassword(e.target.value)}
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

export default ChangePassword