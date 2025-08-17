// src/App.js

import React, { useState, Fragment, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import apiUrl from './apiConfig';

import AutoDismissAlert from './components/shared/AutoDismissAlert/AutoDismissAlert';
import Header from './components/shared/Header';
import RequireAuth from './components/shared/RequireAuth';
import Home from './components/pages/Home_Folder/Home';
import SignUp from './components/auth/SignUp';
import SignIn from './components/auth/SignIn';
import SignOut from './components/auth/SignOut';
import ChangePassword from './components/auth/ChangePassword';
import Profile from './components/pages/Profile_Folder/Profile';
import Art from './components/pages/Art_Folder/Art';
import Filtered_Art from './components/pages/Art_Folder/Filtered_Art';
import Subscription from './components/pages/Subscription_Folder/Subscription';
import Checkout from './components/pages/Subscription_Folder/Checkout';
import EditProfile from './components/pages/Profile_Folder/EditProfile';
import About from './components/pages/About_Folder/About';

const App = () => {
  const [user, setUser] = useState(null);
  const [msgAlerts, setMsgAlerts] = useState([]);
  // Initialize as null so components can differentiate "no profile yet" vs "empty object"
  const [foundProfile, setFoundProfile] = useState(null);

  const clearUser = () => {
    setUser(null);
    setFoundProfile(null);
  };

  useEffect(() => {
    if (!user?.token) {
      setFoundProfile(null);
      return;
    }
    getProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const deleteAlert = (id) => {
    setMsgAlerts((prevState) => prevState.filter((msg) => msg.id !== id));
  };

  const msgAlert = ({ heading, message, variant }) => {
    const id = uuid();
    setMsgAlerts([{ heading, message, variant, id }]);
  };

  // Fetch (and auto-create) the user's profile
  const getProfile = () => {
    if (!user?._id || !user?.token) return;

    fetch(`${apiUrl}/api/profiles/user/${user._id}?createIfMissing=true`, {
      headers: {
        // GA-style bearer expected by replace_token/passport
        Authorization: `Token token=${user.token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setFoundProfile(data.profile || null);
      })
      .catch((err) => console.error('GET PROFILE ERROR:', err));
  };

  // Update current user's profile via protected PATCH /api/profiles
  const patchProfile = () => {
    if (!user?.token) return;

    const payload = {
      profile: {
        name: foundProfile?.name ?? '',
        address: foundProfile?.address ?? '',
        // If your server expects tag _ids, ensure this is an array of ids
        tags: Array.isArray(foundProfile?.tags) ? foundProfile.tags : [],
        isSubscribed: foundProfile?.isSubscribed ?? false,
      },
    };

    fetch(`${apiUrl}/api/profiles`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token token=${user.token}`,
      },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (!res.ok) throw new Error(`PATCH failed with status ${res.status}`);
        return res.json();
      })
      .then(({ profile }) => {
        if (profile) setFoundProfile(profile);
      })
      .catch((err) => console.error('PATCH PROFILE ERROR:', err));
  };

  return (
    <Fragment>
      <Header user={user} />
      <Routes>
        <Route path='/' element={<Home msgAlert={msgAlert} user={user} />} />
        <Route path='/sign-up' element={<SignUp msgAlert={msgAlert} setUser={setUser} />} />
        <Route path='/sign-in' element={<SignIn msgAlert={msgAlert} setUser={setUser} />} />
        <Route
          path='/sign-out'
          element={
            <RequireAuth user={user}>
              <SignOut msgAlert={msgAlert} clearUser={clearUser} user={user} />
            </RequireAuth>
          }
        />
        <Route
          path='/change-password'
          element={
            <RequireAuth user={user}>
              <ChangePassword msgAlert={msgAlert} user={user} />
            </RequireAuth>
          }
        />
        <Route
          path='/profile'
          element={
            <RequireAuth user={user}>
              <Profile msgAlert={msgAlert} getProfile={getProfile} profile={foundProfile} user={user} />
            </RequireAuth>
          }
        />
        <Route path='/available_art' element={<Art msgAlert={msgAlert} user={user} />} />
        <Route path='/about' element={<About msgAlert={msgAlert} user={user} />} />
        <Route
          path='/filtered_available_art'
          element={<Filtered_Art profile={foundProfile} msgAlert={msgAlert} user={user} />}
        />
        <Route
          path='/subscription'
          element={<Subscription msgAlert={msgAlert} profile={foundProfile} patchProfile={patchProfile} user={user} />}
        />
        <Route
          path='/subscription/checkout'
          element={<Checkout msgAlert={msgAlert} getProfile={getProfile} patchProfile={patchProfile} user={user} />}
        />
        <Route
          path='/profile/edit'
          element={<EditProfile msgAlert={msgAlert} getProfile={getProfile} profile={foundProfile} user={user} />}
        />
      </Routes>
      {msgAlerts.map((msgAlert) => (
        <AutoDismissAlert
          key={msgAlert.id}
          heading={msgAlert.heading}
          variant={msgAlert.variant}
          message={msgAlert.message}
          id={msgAlert.id}
          deleteAlert={deleteAlert}
        />
      ))}
    </Fragment>
  );
};

export default App;
