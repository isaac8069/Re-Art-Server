import React from 'react'
import CreateProfile from './CreateProfile'
import ExistingProfile from './ExistingProfile'


const Profile = (props) => {
    
    // If statment that test if user has a profile
    // When user has a profile that are sent to ExistingProfile component with profile prop
    // When the user dose not have profile is sent to CreateProfile with getProfile prop and user prop
    
    if(props.profile){
        return <ExistingProfile changePassword={props.changePassword}
                        profile={props.profile}/>
    } else {
        return <CreateProfile user={props.user} 
                        getProfile={props.getProfile}
                        msgAlert={props.msgAlert} />
    }
}

export default Profile