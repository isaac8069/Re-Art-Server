let apiUrl;
const apiUrls = {
  // Update this production URL when deploying
  production: 'https://reartapi.herokuapp.com',
  development: 'http://localhost:8000',
};

// Determine the environment
if (window.location.hostname === 'localhost') {
  apiUrl = apiUrls.development;
} else {
  apiUrl = apiUrls.production;
}

// Stripe API Endpoint (always points to your dev server unless adjusted for production)
const API_ENDPOINT = apiUrl;

/**
 * Handles Stripe payment method creation and backend confirmation.
 * @param {Object} data - Payment data including amount and result from Stripe
 * @param {Function} cb - Callback function to handle response
 */
export const stripePaymentMethodHandler = async (data, cb) => {
  const { amount, result } = data;
  if (result.error) {
    // Show error in payment form
    cb(result);
  } else {
    const paymentResponse = await stripePayment({
      payment_method_id: result.paymentMethod.id,
      name: result.paymentMethod.billing_details.name,
      email: result.paymentMethod.billing_details.email,
      amount,
    });
    console.log('Stripe Payment Response:', paymentResponse);
    cb(paymentResponse);
  }
};

/**
 * Calls backend API to confirm payment
 * @param {Object} data - Payment data (payment_method_id, name, email, amount)
 * @returns {Promise<Object>} - Response JSON
 */
const stripePayment = async (data) => {
  const res = await fetch(`${API_ENDPOINT}/pay`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return await res.json();
};

export default apiUrl;
