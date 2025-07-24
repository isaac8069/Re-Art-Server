import React from "react"
import { Card, CardGroup } from "react-bootstrap"
import CommunityImage from "./../homeComponents/images/community1.jpeg"
import CommunityImage2 from "./../homeComponents/images/community2.jpg"

const communitystyle = {
    height: '400px',
    objectFit: 'cover'
}
const communitystyle2 = {
    height: '400px',
    objectFit: 'cover'
}
const space = {
    textAlign: "center",
    margin: '45px'
}

const Community = () => {

    return (
        <div>
            <CardGroup style={space}>
                <Card>
                    <Card.Img variant="top" src={CommunityImage} style={communitystyle} />
                </Card>
                <br />
                <Card>
                    <Card.Body>
                        <Card.Text>
                            "I never have to stand in the checkout line at HomeGoods ever again!"
                        </Card.Text>
                        <Card.Text>
                            "I love switching out my artwork each season, and I don't even have to leave my house."
                        </Card.Text>
                        <Card.Text>
                            "I started out with the lowest tier of artwork delivery (1 per season) and now I am receiving 6 per season and couldn't be happier that my house is turning into an art museum!"
                        </Card.Text>
                        <Card.Text>
                            "I no longer need an interior designer to handle my artwork for me."
                        </Card.Text>
                    </Card.Body>
                </Card>
                <br />
                <Card>
                    <Card.Img variant="top" src={CommunityImage2} style={communitystyle2} />
                </Card>
            </CardGroup>
        </div>
    )
}

export default Community