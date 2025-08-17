import React from 'react'
import CreateProfile from './CreateProfile'
import ExistingProfile from './ExistingProfile'

const Profile = (props) => {
  const { profile, user, getProfile, msgAlert, changePassword } = props;

  // If no profile yet, show CreateProfile
  if (!profile) {
    return <CreateProfile user={user} getProfile={getProfile} msgAlert={msgAlert} />;
  }

  // If profile exists, show ExistingProfile
  return <ExistingProfile changePassword={changePassword} profile={profile} />;
};

export default Profile;
