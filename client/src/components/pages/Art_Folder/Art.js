import React, { useState, useEffect } from 'react'
// Import Pieces to show each art piece
import Pieces from './Pieces_All'
import apiUrl from '../../../apiConfig'

const title = {
    fontSize: '40px',
    textAlign: 'center',
    margin: '38px 0px 20px 0px'
  }
  const subtitle = {
    fontSize: '20px',
    textAlign: 'center',
    width: "720px",
    margin: "0 auto",
    paddingBottom: "20px"
  }

const Art = (props) => {

    // State that holds all objects from Server
    const [art, setArt] = useState([])
    // useEffect that access the Server API
    useEffect(() => {
        fetch(`${apiUrl}/pieces`)
        .then(res => res.json())
        .then(foundPieces=>{
            // Sets API data to state allArt
            setArt(foundPieces.pieces)
        })
    }, [])

    // Maps art state and passes info from object to Pieces component
    const pieces = art.map(a=>{
        return <Pieces
            key={a._id}
            title = {a.title}
            artist = {a.artist}
            imgUrl = {a.imgUrl}
            description = {a.description}
            // price = {a.price}
        />
    })

    return (
        <div>
            <h1 style={title}>
				The Collection
			</h1>
            <p style={subtitle}>Browse a portion of our collection below- the possibilities are endless! Once you create a profile, you can list keywords to begin filtering the artwork by style.</p>
            <div className = "row">            
                {pieces}
            </div>
        </div>
    )
}

export default Art