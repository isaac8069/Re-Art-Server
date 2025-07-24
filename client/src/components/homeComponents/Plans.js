import React from 'react'
import { Route, useNavigate } from 'react-router-dom'
import { Card, CardGroup } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import PlansImage from "./../homeComponents/images/plansImage.jpeg"


const cardstyle = {
    margin: '20px auto',
    objectFit: 'cover',
    border: "none"

}
const text = {
    fontSize: '40px',
    width: "400px",
    marginTop: '40px'
}
const text2 = {
  fontSize: '15px',
  width: "400px",
  marginTop: '20px',
  marginBottom: '20px'
}
const image = {
  minWidth: "400px"
}

const PlansSection = () => {
  const navigate = useNavigate()
  const handleClick = (e) =>{
    return(
      navigate('/subscription')
    )
  }
  return (
  <div>
    <div className="row">
      <div className="col">
        <Card style={cardstyle}>
          <Card.Img variant="top" src={PlansImage} style={image} />
        </Card>
      </div>
      <br />
      <div className="col">
        <Card style={cardstyle}>
        <Card.Body>
          <Card.Title style={text}>Explore Our Subscriptions</Card.Title>
          <Card.Text style={text2}>
            We have a plan for every budget, tiered by the number of art pieces delivered each season.
          </Card.Text>
          <Button variant="dark" onClick={handleClick}>Learn More</Button>
        </Card.Body>
        </Card>
      </div>
    </div>
  </div>
  )
}

export default PlansSection