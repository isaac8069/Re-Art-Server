let apiUrl
const apiUrls = {
	production: 'https://reartapi.herokuapp.com',
	development: 'http://localhost:8000',
}

if (window.location.hostname === 'localhost') {
	apiUrl = apiUrls.development
} else {
	apiUrl = apiUrls.production
}

const API_ENDPOINT = apiUrl  // <-- update this

export const stripePaymentMethodHandler = async (data, cb) => {
	const { amount, result, token } = data
	if (result.error) {
		cb(result)
	} else {
		const paymentResponse = await stripePayment({
			payment_method_id: result.paymentMethod.id,
			name: result.paymentMethod.billing_details.name,
			email: result.paymentMethod.billing_details.email,
			amount: amount,
			token: token // <-- pass the user token along
		})
		console.log(paymentResponse)
		cb(paymentResponse)
	}
}

const stripePayment = async data => {
	const res = await fetch(`${API_ENDPOINT}/pay`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${data.token}` // <-- attach token
		},
		body: JSON.stringify(data),
	})
	return await res.json()
}

export default apiUrl
