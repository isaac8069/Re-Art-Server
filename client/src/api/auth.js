import apiUrl from '../apiConfig'
import axios from 'axios'

export const signUp = (credentials) => {
	return axios({
		method: 'POST',
		url: `${apiUrl}/api/users/sign-up`,
		data: {
			credentials: {
				email: credentials.email,
				password: credentials.password,
				password_confirmation: credentials.passwordConfirmation,
			},
		},
	})
}

export const signIn = (credentials) => {
	return axios({
		method: 'POST',
		url: `${apiUrl}/api/users/sign-in`,
		data: {
			credentials: {
				email: credentials.email,
				password: credentials.password,
			},
		},
	})
}

export const signOut = (user) => {
	return axios({
		method: 'DELETE',
		url: `${apiUrl}/api/users/sign-out`,
		headers: {
			Authorization: `Bearer ${user.token}`,
		},
	})
}

export const changePassword = (passwords, user) => {
	return axios({
		method: 'PATCH',
		url: `${apiUrl}/api/users/change-password`,
		headers: {
			Authorization: `Bearer ${user.token}`,
		},
		data: {
			passwords: {
				old: passwords.oldPassword,
				new: passwords.newPassword,
			},
		},
	})
}
