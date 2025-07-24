import React from 'react'
import { Route, useNavigate } from 'react-router-dom'
import Checkout from './Checkout';
import SignIn from '../../auth/SignIn'
import messages from '../../shared/AutoDismissAlert/messages'
import { Card, Button, Row, Col, CardGroup } from 'react-bootstrap'

// styling
const button = {
  margin: '20px',
}
const box = {
  justifyContent: 'center',
  textAlign: 'center',
  padding: '25px'
}
const icon = {
  margin: '15 auto',
  height: "75px",
  width: "75px",
}
const title = {
	fontSize: '40px',
	textAlign: 'center',
	margin: '50px'
}
const subtitle = {
	fontSize: '20px',
	textAlign: 'center',
	width: "720px",
	margin: "0 auto",
	paddingBottom: "20px"
}
const iconBoxesContainer = {
	textAlign: 'center',
  justifyContent: 'center'
}

// function that renders Subscription Page
function Subscription(props) {
  // uses hook that allows navigation
  const navigate = useNavigate()
  console.log(props.profile)

  // handels when user trys to sign up for subscription
  // tests if user is populated
  // if populated will go onto next test for profile
  // if passes all tests will enter checkout page
  const handleClick = (e) => {
    // Check for signed in
    if (props.user === null) {
      props.msgAlert({
        heading: 'Please Sign in',
        message: messages.signUpSubsubscription,
        variant: 'danger',
      })
      // NEVER GOT FLESHED OUT
      // Go back to correct screen after sign-in
      // props.setAfterSignInTargetUrl('/subscription/checkout')
      return navigate('/sign-in')
    } else {
      // Check for profile created
      if (props.profile) {
        // return navigate('/subscription/checkout')
        props.patchProfile()
        return navigate('/filtered_available_art')
      } else {
        props.msgAlert({
          heading: 'Please create a profile',
          message: messages.profileNeededToSubscribe,
          variant: 'danger',
        })
        return navigate('/profile')
      }
    }
  }

  // renders page with description of subscription 
  // also has button that triggers test if sign in is true as well as profile created
  return (
    <div className="container">
      <h2 style={title}>Pick a Plan</h2>
      <h4 style={subtitle}>Become a member to access a forever-rotating curated collection of art. No commitments. Pause or cancel anytime.</h4>
      <div>
        <Row style={box}>
          <Card style={{ width: '18rem', margin: '20px', backgroundColor: "#D3D3D3", border: "none" }}>
            <Card.Body>
            <Card.Title>Basic Access</Card.Title>
              <Card.Text>
                Up to
                <br></br><b>2</b> pieces per season
              </Card.Text>
              <div>
                <Button onClick={handleClick} variant="dark" style={button}>Try Now</Button>
              </div>
              <Card.Text>
                1 shipment per season <br></br>
                <b>$89</b> trial season <br></br>$109/season after
              </Card.Text>
            </Card.Body>
          </Card>
          <br />
          <Card border="dark" style={{ width: '18rem', margin: '20px', backgroundColor: "#D3D3D3", border: "none" }}>
            <Card.Body>
              <Card.Title>Value Access</Card.Title>
              <Card.Text>
                Up to
                <br></br><b>4</b> pieces per season
              </Card.Text>
              <Button variant="dark" style={button}>Coming Soon</Button>
              <Card.Text>
                2 shipments per season <br></br>
                <b>$129</b> trial season <br></br> $149/season after
              </Card.Text>
            </Card.Body>
          </Card>
          <br />
          <Card border="dark" style={{ width: '18rem', margin: '20px', backgroundColor: "#D3D3D3", border: "none" }}>
            <Card.Body>
              <Card.Title>Premium Access</Card.Title>
              <Card.Text>
                Up to
                <br></br><b>6</b> pieces per season
              </Card.Text>
              <Button variant="dark" style={button}>Coming Soon</Button>
              <Card.Text>
                3 shipments per season <br></br>Choose your pieces<br></br> 
                <b>$169</b> trial season <br></br> $189/season after
              </Card.Text>
            </Card.Body>
          </Card>
        </Row>
      </div>
      <div style={iconBoxesContainer}>
        <Row xs={1} md={2} className="g-4" style={iconBoxesContainer}>
          <Card style={{width: "400px", margin: "25px" }} >
            <svg style={icon} xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-truck" viewBox="0 0 16 16">
              <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5v-7zm1.294 7.456A1.999 1.999 0 0 1 4.732 11h5.536a2.01 2.01 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456zM12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12v4zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
            </svg>
            <Card.Body>
              <Card.Title>Free Shipping and Ruturns</Card.Title>
              <Card.Text>
                Orders include a prepaid return label and typically arrive 2 business days after shipping.
              </Card.Text>
            </Card.Body>
          </Card>
          <Card style={{width: "400px", margin: "25px" }} >
            <svg style={icon} xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-recycle" viewBox="0 0 16 16">
              <path d="M9.302 1.256a1.5 1.5 0 0 0-2.604 0l-1.704 2.98a.5.5 0 0 0 .869.497l1.703-2.981a.5.5 0 0 1 .868 0l2.54 4.444-1.256-.337a.5.5 0 1 0-.26.966l2.415.647a.5.5 0 0 0 .613-.353l.647-2.415a.5.5 0 1 0-.966-.259l-.333 1.242-2.532-4.431zM2.973 7.773l-1.255.337a.5.5 0 1 1-.26-.966l2.416-.647a.5.5 0 0 1 .612.353l.647 2.415a.5.5 0 0 1-.966.259l-.333-1.242-2.545 4.454a.5.5 0 0 0 .434.748H5a.5.5 0 0 1 0 1H1.723A1.5 1.5 0 0 1 .421 12.24l2.552-4.467zm10.89 1.463a.5.5 0 1 0-.868.496l1.716 3.004a.5.5 0 0 1-.434.748h-5.57l.647-.646a.5.5 0 1 0-.708-.707l-1.5 1.5a.498.498 0 0 0 0 .707l1.5 1.5a.5.5 0 1 0 .708-.707l-.647-.647h5.57a1.5 1.5 0 0 0 1.302-2.244l-1.716-3.004z" />
            </svg>
            <Card.Body>
              <Card.Title>Quick Turn Around</Card.Title>
              <Card.Text>
                Let us know which items you’re sending back and instantly rent something new.
              </Card.Text>
            </Card.Body>
          </Card>
          <Card style={{width: "400px", margin: "25px" }} >
            <svg style={icon} xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
            </svg>
            <Card.Body>
              <Card.Title>Members-Only Sales</Card.Title>
              <Card.Text>
                Get exclusive discounts on purchases.
              </Card.Text>
            </Card.Body>
          </Card>
          <Card style={{width: "400px", margin: "25px" }} >
            <svg style={icon} xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-receipt" viewBox="0 0 16 16">
              <path d="M1.92.506a.5.5 0 0 1 .434.14L3 1.293l.646-.647a.5.5 0 0 1 .708 0L5 1.293l.646-.647a.5.5 0 0 1 .708 0L7 1.293l.646-.647a.5.5 0 0 1 .708 0L9 1.293l.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .801.13l.5 1A.5.5 0 0 1 15 2v12a.5.5 0 0 1-.053.224l-.5 1a.5.5 0 0 1-.8.13L13 14.707l-.646.647a.5.5 0 0 1-.708 0L11 14.707l-.646.647a.5.5 0 0 1-.708 0L9 14.707l-.646.647a.5.5 0 0 1-.708 0L7 14.707l-.646.647a.5.5 0 0 1-.708 0L5 14.707l-.646.647a.5.5 0 0 1-.708 0L3 14.707l-.646.647a.5.5 0 0 1-.801-.13l-.5-1A.5.5 0 0 1 1 14V2a.5.5 0 0 1 .053-.224l.5-1a.5.5 0 0 1 .367-.27zm.217 1.338L2 2.118v11.764l.137.274.51-.51a.5.5 0 0 1 .707 0l.646.647.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.509.509.137-.274V2.118l-.137-.274-.51.51a.5.5 0 0 1-.707 0L12 1.707l-.646.647a.5.5 0 0 1-.708 0L10 1.707l-.646.647a.5.5 0 0 1-.708 0L8 1.707l-.646.647a.5.5 0 0 1-.708 0L6 1.707l-.646.647a.5.5 0 0 1-.708 0L4 1.707l-.646.647a.5.5 0 0 1-.708 0l-.509-.51z" />
              <path d="M3 4.5a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zm8-6a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5z" />
            </svg>
            <Card.Body>
              <Card.Title>Rental Coverage</Card.Title>
              <Card.Text>
              All coverage is provided by a carrier with a group rating of “A” (Excellent) by AM Best – the leading rating agency for the insurance industry.
              </Card.Text>
            </Card.Body>
          </Card>

        </Row>
      </div>
      <div className='container'>
        <h2 style={box}>How it Works</h2>
        <CardGroup className=''>
          <Card style={box}>
            <Card.Body>

              <Card.Text>
                Browse the Re-Art collection and view some of our notable artworks, ranging from impressionist to pop art. A Monet? A George Condo? The choice is–always–yours.
              </Card.Text>
              <Card.Text>
                Update your profile preferences for a curated selection of artworks based on your taste.
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">For any questions or concerns contact us at info@ReArt.com or call 1-800-367-3278</small>
            </Card.Footer>
          </Card>
        </CardGroup>
      </div>
    </div>
  )
}

export default Subscription;
