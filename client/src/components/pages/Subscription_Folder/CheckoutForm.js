import { stripePaymentMethodHandler } from '../../../apiConfig';
import React, { useState } from 'react';
import {
  useStripe, useElements,
  CardNumberElement, CardExpiryElement, CardCvcElement
} from '@stripe/react-stripe-js';

// quick styling of cards
const CARD_ELEMENT_OPTIONS = {
    style: {
        base: {
            color: "#212529",
            fontSize: "18px",
            "::placeholder": {
              color: "#aab7c4",
            },
        },
        invalid: {
            color: "#fa755a",
            iconColor: "#fa755a",
        },
    },
};
 
export default function CheckoutForm(props) {
    // error hooks
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    // stripe api hooks
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    // // shipping data hooks
    // const [recipient, setRecipient] = useState('');
    // const [addressLine, setAddressLine] = useState('');
    // const [city, setCity] = useState('');
    // const [postalCode, setPostalCode] = useState('');
    // declare stripe and elements
    const stripe = useStripe();
    const elements = useElements();

    //handle form submission
    const handleSubmit = async (event) => {
        // We don't want to let default form submission happen here,
        // which would refresh the page.
        event.preventDefault();
        if (!stripe || !elements) {
          // Stripe.js has not yet loaded.
          // Make sure to disable form submission until Stripe.js has loaded.
          return;
        }
        setLoading(true);
        setErrorMsg('');
        // create object of stripe data for server
        const paymentMethodObj = {
            type: 'card',
            card: elements.getElement(CardNumberElement),
            billing_details: {
              name,
              email
            },
        };
        // can potentially post these to mongodb as a stretch goal
        // const shippingAddressObj = {
        //     recipient,
        //     addressLine,
        //     city,
        //     postalCode,
        // }

        // setup payment method for server use
        const paymentMethodResult = await stripe.createPaymentMethod(paymentMethodObj);
        //...with assistance from a method handler
        stripePaymentMethodHandler({
            // pass in relevant data
            result: paymentMethodResult,
            amount: props.amount
        }, handleResponse);
    };

// callback method to handle the response
const handleResponse = response => {
    setLoading(false);
    if (response.error) {
        setErrorMsg(typeof response.error === 'string' ? response.error : response.error.message);
        return;
    }
    props.setPaymentCompleted(response.success ? true : false);
    props.setSubscriptionCompleted(response.success ? true : false);
    //console.log(props.setSubscriptionCompleted)
};
  return (
    <React.Fragment>
      <form onSubmit={handleSubmit}>
          {/* collect shipping information for potential database use later */}
          {/* <h4 className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-muted">Shipping information</span>
          </h4>
        <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="shipping-name">Shipping Recipient</label>
              <input
                id="shipping-name"
                type="text"
                className="form-control"
                value={recipient}
                onChange={e => setRecipient(e.target.value)}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="shipping-address">Address</label>
              <input
                id="shipping-address"
                type="text"
                className="form-control"
                value={addressLine}
                onChange={e => setAddressLine(e.target.value)}
              />
            </div>
        </div>
        <div className="row">
            <div className="col-md-6 mb-3">
                <label htmlFor="city">City</label>
                <input
                  id="city"
                  type="text"
                  className="form-control"
                  value={city}
                  onChange={e => setCity(e.target.value)}
                />
            </div>
            <div className="col-md-6 mb-3">
                <label htmlFor="postalCode">Zipcode</label>
                <input
                  id="postalCode"
                  type="text"
                  className="form-control"
                  value={postalCode}
                  onChange={e => setPostalCode(e.target.value)}
                />
            </div>
        </div> */}
        {/* // collect credit card information for use with stripe api and server */}
        <h4 className="d-flex justify-content-between align-items-center mb-3">
            <span className="text-muted">Pay with card</span>
        </h4>
            <div className="row">
                <div className="col-md-6 mb-3">
                    <label htmlFor="cc-name">Name on card</label>
                    <input
                      id="cc-name"
                      type="text"
                      className="form-control"
                      value={name}
                      onChange={e => setName(e.target.value)}
                    />
                </div>
                <div className="col-md-6 mb-3">
                    <label htmlFor="cc-email">Email</label>
                    <input
                      id="cc-email"
                      type="text"
                      className="form-control"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-md-12 mb-3">
                    <label htmlFor="cc-number">Card Number</label>
                    <CardNumberElement
                      id="cc-number"
                      className="form-control"
                      options={CARD_ELEMENT_OPTIONS}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-md-6 mb-3">
                    <label htmlFor="expiry">Expiration Date</label>
                    <CardExpiryElement
                        id="expiry"
                        className="form-control"
                        options={CARD_ELEMENT_OPTIONS}
                    />
                </div>
              <div className="col-md-6 mb-3">
                  <label htmlFor="cvc">CVC</label>
                    <CardCvcElement
                        id="cvc"
                        className="form-control"
                        options={CARD_ELEMENT_OPTIONS}
                    />
              </div>
            </div>

          {/* while loading, show spinner */}
          <hr className="mb-4" />
          <button className="btn btn-dark w-100" type="submit" disabled={loading}>
              {loading ? <div className="spinner-border spinner-border-sm text-light" role="status"></div> : `PAY $${props.amount}`}
          </button>
          {/* if error, show error message */}
          {errorMsg && <div className="text-danger mt-2">{errorMsg}</div>}
      </form>
    </React.Fragment>
  );
}