import React, { useState, useEffect } from 'react'
// Import Pieces to show each art piece
import Pieces from './Pieces'
// navigate for redirecting to checkout
import { useNavigate } from 'react-router-dom'
// button styling
import { Button } from 'react-bootstrap'
import apiUrl from '../../../apiConfig'


const button = {
    marginTop: '40px',
  }
  const buttonContainer = {
    float: "right",
    marginRight: '30px'
  }
  const title = {
    fontSize: '40px',
    textAlign: 'center',
    margin: '38px 0px 20px 180px'
  }
  const subtitle = {
    fontSize: '20px',
    textAlign: 'center',
    width: "720px",
    margin: "0 auto",
    paddingBottom: "20px"
  }
  const list = {
    textAlign: 'center',
    listStyleType: 'none'
  }

const Filtered_Art = (props) => {
  console.log('Profile: ',props.profile)
  const navigate = useNavigate()
  // State that holds all objects from Server
  const [art, setArt] = useState([])
  // useEffect that access the Server API
  useEffect(() => {
      fetch(`${apiUrl}/pieces/profile/${props.profile._id}`)
      .then(res => res.json())
      .then(foundPieces=>{
          // Sets API data to state allArt
          setArt(foundPieces.pieces)
      })
  }, [])

  // Maps art state and passes info from object to Pieces component
  let pieces = <h5>No Art Found! Make sure your art preferences are in your profile.</h5>
  // console.log('art: ',art)
  if(art){
      pieces = art.map(a => {
          return <Pieces
              key={a._id}
              title = {a.title}
              artist = {a.artist}
              imgUrl = {a.imgUrl}
              description = {a.description}
              // price = {a.price}
          />
      })
  }
  const redirectToCheckout = () => {
      return navigate('/subscription/checkout')
    }

  return (
      <div>
        <div style={buttonContainer}>
            <Button onClick={redirectToCheckout} variant="light" style={button} className = "btn btn-outline-success">Proceed to Checkout <text>&#8594;</text></Button>
        </div>
        <div className="row">
            <div className = "col">
              <h3 style={title}>Our art, based on <em>your</em> preferences. </h3>
            </div>
        </div>
        <ul>
          <p style={subtitle}>You have selected our <strong>Basic Access</strong> package. Below is a sampling of the artwork we will send you, based on your profile preferences of:</p>
                {props.profile.tags.map((tag)=>{
                      return <li style={list}>{tag.name}</li>
                  }) } 
        </ul>
        <div className = "row">            
          {pieces}
        </div>
      </div>
  )
}

export default Filtered_Art