// apiConfig + Stripe helpers

let apiUrl
const apiUrls = {
  production: 'https://reartapi.herokuapp.com',
  development: 'http://localhost:8000',
}

// Treat localhost and 127.0.0.1 as development
const host = typeof window !== 'undefined' ? window.location.hostname : ''
if (host === 'localhost' || host === '127.0.0.1') {
  apiUrl = apiUrls.development
} else {
  apiUrl = apiUrls.production
}

// Use the server's /api prefix everywhere
export const API = `${apiUrl}/api`
const API_ENDPOINT = API

export const stripePaymentMethodHandler = async (data, cb) => {
  const { amount, result, token } = data
  if (result.error) {
    cb(result)
    return
  }

  try {
    const paymentResponse = await stripePayment({
      payment_method_id: result.paymentMethod.id,
      name: result.paymentMethod.billing_details.name,
      email: result.paymentMethod.billing_details.email,
      amount,
      token, // user token
    })
    console.log(paymentResponse)
    cb(paymentResponse)
  } catch (err) {
    console.error('stripePayment failed:', err)
    cb({ error: err.message || 'Payment failed' })
  }
}

const stripePayment = async (data) => {
  const res = await fetch(`${API_ENDPOINT}/pay`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // Match your backend auth convention
      Authorization: `Token token=${data.token}`,
    },
    body: JSON.stringify(data),
  })

  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`HTTP ${res.status} ${res.statusText} – ${text}`)
  }
  return res.json()
}

export default apiUrl
