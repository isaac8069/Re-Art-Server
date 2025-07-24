import React, { useState, useEffect } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import apiUrl from '../../../apiConfig';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe("pk_test_51K6PZKAPJKSXew76gFW4UmquGYQXmllbtBUGoJUnMv9NUIMZLBbLqogc6cwPxKEkVw9CpxmyPoMTfO0ue0HSw5ZQ00qoIaU4tC");

//message to appear if card payment is successful
const successMessage = () => {
    
    return (
        <div className="success-msg">
            <svg width="100px" height="100px" viewBox="0 0 16 16" className="bi bi-check2" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
            </svg>
            <div className="title">Payment Successful</div>
            <h6>Return to Profile</h6>
        </div>
  )
}
 
// styled cart of items 
// show next to payment information using bootstrap
const cart = () => {
    return (
        <React.Fragment>
            <h4 className="d-flex justify-content-between align-items-center mb-3">
            <span className="text-muted">Your cart</span>
            <span className="badge bg-secondary badge-pill">4</span>
            </h4>
            <ul className="list-group mb-3">
                <li className="list-group-item d-flex justify-content-between lh-condensed">
                    <div>
                    <h6 className="my-0">First piece</h6>
                    <small className="text-muted">1 out of 4 seasons completed</small>
                    </div>
                    <span className="text-muted">$89</span>
                </li>
                <li className="list-group-item d-flex justify-content-between lh-condensed">
                    <div>
                    <h6 className="my-0">Second piece</h6>
                    <small className="text-muted">2 out of 4 seasons completed</small>
                    </div>
                    <span className="text-muted">$109</span>
                </li>
                <li className="list-group-item d-flex justify-content-between lh-condensed">
                    <div>
                    <h6 className="my-0">Third piece</h6>
                    <small className="text-muted">3 out of 4 seasons completed</small>
                    </div>
                    <span className="text-muted">$109</span>
                </li>
                <li className="list-group-item d-flex justify-content-between lh-condensed">
                    <div>
                    <h6 className="my-0">Fourth piece</h6>
                    <small className="text-muted">4 out of 4 seasons completed</small>
                    </div>
                    <span className="text-muted">$109</span>
                </li>
                {/* <li className="list-group-item d-flex justify-content-between bg-light">
                    <div className="text-success">
                    <h6 className="my-0">Promo code</h6>
                    <small>NEWYEAR2022</small>
                    </div>
                    <span className="text-success">-$25</span>
                </li> */}
                <li className="list-group-item d-flex justify-content-between">
                    <span>Total (USD)</span>
                    <strong>$416</strong>
                </li>
            </ul>
        </React.Fragment>
    )
}
 
// checkout component structure for route render
function Checkout(props) {
    // boolean for testing successful payment
    const [paymentCompleted, setPaymentCompleted] = useState(false);
    // boolean for changing isSubscribed based on form response
    const [subscriptionCompleted, setSubscriptionCompleted] = useState(false)
    // boolean for communication with database isSubscribed
    // const [newSubscription, setNewSubscription] = useState()

    // return success message or CheckoutForm
    console.log("subscriptionCompleted: ", subscriptionCompleted)

    // useEffect(() => {
    //     patchProfile()
    // }, [subscriptionCompleted])

    // API CALL
    const patchProfile = () =>{
        // successMessage()
        console.log('Pressed Submit button')
        let preJSONBody = {
                isSubscribed: subscriptionCompleted,
        }
        const requestOptions = {
            method: 'PATCH',
            body: JSON.stringify(preJSONBody),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${props.user.token}`
              },
        }
        fetch(`${apiUrl}/profiles/user/${props.user._id}`, requestOptions)
            .then(patchedProfile=> {
                console.log("subscription saved", patchedProfile)
                props.getProfile()
            })
            .catch(err=>console.error(err))
      }

    subscriptionCompleted ? patchProfile() : console.log("subscription not saved")

    return (
        <div className="container">
            <div className="py-5 text-center">
                <h4>Checkout</h4>
            </div>
            <div className="row s-box">
                {/* if payment and subscription has been completed, show the success message */}
                {paymentCompleted ? successMessage() : 
                // if not, show the cart of artwork/shipping/billing form:
                    <React.Fragment>
                        <div className="col-md-5 order-md-2 mb-4">
                            {/* pulled in cart from above */}
                            {cart()}
                        </div>
                        <div className="col-md-7 order-md-1">
                            <Elements stripe={stripePromise}>
                                {/* pass bill amount and setpaymentcompleted boolean down to CheckoutForm */}
                                <CheckoutForm amount={416} setPaymentCompleted={setPaymentCompleted} setSubscriptionCompleted={setSubscriptionCompleted} />
                            </Elements>
                        </div>
                    </React.Fragment>
                }
            </div>
        </div>
    );
}
 
export default Checkout;
