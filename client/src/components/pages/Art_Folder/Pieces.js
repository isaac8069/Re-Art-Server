
import { Card } from 'react-bootstrap'


const Pieces = (props) => {

    const imgStyle = {
        width: '350px',
        height: "350px",
        objectFit: 'cover'
    }
    const cardStyle = {
        textAlign: 'center',
        width: '350px'    
    }
    const title = {
        fontSize: '20px',
        textAlign: 'center',
        marginTop: '25px'
    }
    const subtitle = {
        fontSize: '14px',
        textAlign: 'center',
        margin: "10px 15px"
    }
    return (
        <div className = "col">  
            <Card style={cardStyle}>
            <img style={imgStyle} src={props.imgUrl}></img>
            <h2 style={title}>{props.title}</h2>
            <h4 style={subtitle}>Artist: {props.artist}</h4>
            <p style={subtitle}>Description: {props.description}</p>
            </Card>
        </div>
    )
}

export default Pieces