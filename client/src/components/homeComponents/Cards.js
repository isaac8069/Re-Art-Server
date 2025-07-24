import React from 'react'
import { Card, CardGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Photo1 from "./../homeComponents/images/photo1.jpeg"
import Photo2 from "./../homeComponents/images/Modern1.jpeg"
import Photo3 from "./../homeComponents/images/pop.jpeg"

const cardstyle = {
    margin: '25px',
    height: '400px'
}
const image = {
    height: '80%',
    objectFit: 'cover'
}
const text = {
    textAlign: 'center',
    textDecoration: 'none',
    color: 'black',
    fontSize: '25px'
}

const Cards = () => {

    return (
        <div>
            <CardGroup >
                <Card style={cardstyle}>
                    <Card.Img variant="top" src={Photo2} style={image} />
                    <Card.Body>
                        <Card.Text style={text}>
                            <Link to="/available_art" style={text}>Modern</Link>
                        </Card.Text>
                    </Card.Body>
                </Card>
                <br />
                <Card style={cardstyle}>
                    <Card.Img variant="top" src={Photo3} style={image} />
                    <Card.Body>
                        <Card.Text style={text}>
                            <Link to="/available_art" style={text}>Pop</Link>
                        </Card.Text>
                    </Card.Body>
                </Card>
                <br />
                <Card style={cardstyle}>
                    <Card.Img variant="top" src={Photo1} style={image} />
                    <Card.Body>
                        <Card.Text style={text}>
                            <Link to="/available_art" style={text}>Photography</Link>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </CardGroup>
        </div>
    )
}

export default Cards