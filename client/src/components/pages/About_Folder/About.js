import Cards from "../../homeComponents/Cards_About"

const text = {
	margin: '50px',
	fontSize: '40px'
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
const link = {
    color: '#74AFA3'
}

const About = (props) => {
	// const { msgAlert, user } = props
	// console.log('props in home', props)
	return (
		<>
            <h1 style={title}>
				The Team
			</h1>
            <p style={subtitle}>This project was in partial fulfillment for the General Assembly Software Engineering Immersive program in December 2021. Our project's <a href="https://github.com/isaac8069/Re-Art-Client" style={link} target="_blank">Github repository</a> has more information about our collaborative process and project documentation.</p>
            <p style={subtitle}>Tech Stack: MongoDB, Express, React, Node</p>
			<div style={{maxWidth: "1100px", margin: "0 auto"}}>
				<Cards />
			</div>
		</>
	)
}

export default About
