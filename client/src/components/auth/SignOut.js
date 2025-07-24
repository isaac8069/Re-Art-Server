import { useNavigate } from 'react-router-dom'

import { Button, ButtonGroup } from 'react-bootstrap'

import { signOut } from '../../api/auth'
import messages from '../shared/AutoDismissAlert/messages'

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

const SignOut = (props) => {
    const { msgAlert, clearUser, user } = props
    console.log(props)

    const navigate = useNavigate()

    const onSignOut = () => {
        signOut(user)
            .finally(() =>
                msgAlert({
                    heading: 'Signed Out Successfully',
                    message: messages.signOutSuccess,
                    variant: 'success',
                })
            )
            .finally(() => navigate('/'))
            .finally(() => clearUser())
    }

    const onCancel = () => {
        navigate('/')
    }

    return (
        <>
            <div className='row'>
                <div className='col-sm-10 col-md-8 mx-auto mt-5' style={bgc}>
                    <h5>Are you sure you want to sign out?</h5>
                    <small>We hate to see you go...</small><br />

                    <Button variant='outline-dark' onClick={onSignOut} style={button}>
                        Sign Out
                    </Button>
                    <Button variant='outline-dark' onClick={onCancel} style={button}>
                        Cancel
                    </Button>

                </div>
            </div>
        </>
    )
}

export default SignOut
