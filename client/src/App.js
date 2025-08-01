import React, { useState, Fragment, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { v4 as uuid } from 'uuid'
import apiUrl from './apiConfig'

import AutoDismissAlert from './components/shared/AutoDismissAlert/AutoDismissAlert'
import Header from './components/shared/Header'
import RequireAuth from './components/shared/RequireAuth'
import Home from './components/pages/Home_Folder/Home'
import SignUp from './components/auth/SignUp'
import SignIn from './components/auth/SignIn'
import SignOut from './components/auth/SignOut'
import ChangePassword from './components/auth/ChangePassword'
import Profile from './components/pages/Profile_Folder/Profile'
import Art from './components/pages/Art_Folder/Art'
import Filtered_Art from './components/pages/Art_Folder/Filtered_Art'
import Subscription from './components/pages/Subscription_Folder/Subscription'
import Checkout from './components/pages/Subscription_Folder/Checkout'
import EditProfile from './components/pages/Profile_Folder/EditProfile'
import About from './components/pages/About_Folder/About'

const App = () => {
	const [user, setUser] = useState(null)
	const [msgAlerts, setMsgAlerts] = useState([])
	const [foundProfile, setFoundProfile] = useState({})

	const clearUser = () => setUser(null)

	useEffect(() => {
		getProfile()
	}, [user])

	const deleteAlert = (id) => {
		setMsgAlerts(prevState => prevState.filter(msg => msg.id !== id))
	}

	const msgAlert = ({ heading, message, variant }) => {
		const id = uuid()
		setMsgAlerts([{ heading, message, variant, id }])
	}

	const getProfile = () => {
		if (user) {
			fetch(`${apiUrl}/api/profiles/user/${user._id}`, {
				headers: {
					Authorization: `Bearer ${user.token}`
				}
			})
			.then(res => {
				if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`)
				return res.json()
			})
			.then(foundObject => {
				setFoundProfile(foundObject.profile) // use .profile, not .profile[0]
			})
			.catch(err => console.error('GET PROFILE ERROR:', err))
		}
	}

	const patchProfile = () => {
		const preJSONBody = {
			name: foundProfile.name,
			address: foundProfile.address,
			tags: foundProfile.tags,
			isSubscribed: foundProfile.isSubscribed,
			userId: foundProfile.userId
		}

		const requestOptions = {
			method: 'PATCH',
			body: JSON.stringify(preJSONBody),
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${user.token}`
			}
		}

		fetch(`${apiUrl}/api/profiles/user/${user._id}`, requestOptions)
			.then(res => {
				if (!res.ok) throw new Error(`PATCH failed with status ${res.status}`)
			})
			.catch(err => console.error('PATCH PROFILE ERROR:', err))
	}

	return (
		<Fragment>
			<Header user={user} />
			<Routes>
				<Route path='/' element={<Home msgAlert={msgAlert} user={user} />} />
				<Route path='/sign-up' element={<SignUp msgAlert={msgAlert} setUser={setUser} />} />
				<Route path='/sign-in' element={<SignIn msgAlert={msgAlert} setUser={setUser} />} />
				<Route path='/sign-out' element={
					<RequireAuth user={user}>
						<SignOut msgAlert={msgAlert} clearUser={clearUser} user={user} />
					</RequireAuth>
				} />
				<Route path='/change-password' element={
					<RequireAuth user={user}>
						<ChangePassword msgAlert={msgAlert} user={user} />
					</RequireAuth>
				} />
				<Route path='/profile' element={
					<RequireAuth user={user}>
						<Profile msgAlert={msgAlert} getProfile={getProfile} profile={foundProfile} user={user} />
					</RequireAuth>
				} />
				<Route path='/available_art' element={<Art msgAlert={msgAlert} user={user} />} />
				<Route path='/about' element={<About msgAlert={msgAlert} user={user} />} />
				<Route path='/filtered_available_art' element={
					<Filtered_Art profile={foundProfile} msgAlert={msgAlert} user={user} />
				} />
				<Route path='/subscription' element={
					<Subscription msgAlert={msgAlert} profile={foundProfile} patchProfile={patchProfile} user={user} />
				} />
				<Route path='/subscription/checkout' element={
					<Checkout msgAlert={msgAlert} getProfile={getProfile} patchProfile={patchProfile} user={user} />
				} />
				<Route path='/profile/edit' element={
					<EditProfile msgAlert={msgAlert} getProfile={getProfile} profile={foundProfile} user={user} />
				} />
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
	)
}

export default App
