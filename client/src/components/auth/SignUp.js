import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import apiUrl from '../../apiConfig'

const SignUp = ({ msgAlert, setUser }) => {
	const navigate = useNavigate()

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [passwordConfirmation, setPasswordConfirmation] = useState('')

	const onSignUp = (event) => {
		event.preventDefault()

		fetch(`${apiUrl}/api/users/sign-up`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				credentials: {
					email,
					password,
					password_confirmation: passwordConfirmation
				}
			})
		})
			.then(res => {
				if (!res.ok) {
					throw new Error('Sign Up Failed')
				}
				return res.json()
			})
			.then(res => {
				setUser(res.user)
				msgAlert({
					heading: 'Sign Up Success',
					message: 'You are now registered and logged in.',
					variant: 'success'
				})
				navigate('/')
			})
			.catch(error => {
				console.error('Sign Up Error:', error)
				msgAlert({
					heading: 'Sign Up Failed',
					message: 'Email may be taken, or passwords don’t match.',
					variant: 'danger'
				})
			})
	}

	return (
		<div className="container mt-5">
			<h2>Sign Up</h2>
			<form onSubmit={onSignUp}>
				<div className="mb-3">
					<label htmlFor="email" className="form-label">Email</label>
					<input
						type="email"
						className="form-control"
						id="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="password" className="form-label">Password</label>
					<input
						type="password"
						className="form-control"
						id="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="passwordConfirmation" className="form-label">Confirm Password</label>
					<input
						type="password"
						className="form-control"
						id="passwordConfirmation"
						value={passwordConfirmation}
						onChange={(e) => setPasswordConfirmation(e.target.value)}
						required
					/>
				</div>
				<button type="submit" className="btn btn-primary">Sign Up</button>
			</form>
		</div>
	)
}

export default SignUp
