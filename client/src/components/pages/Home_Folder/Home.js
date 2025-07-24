import Tag from "../../Tag"
import CarouselImage from "../../homeComponents/Carousel"
import Cards from "../../homeComponents/Cards"
import PlansSection from "../../homeComponents/Plans"
import Community from "../../homeComponents/Community"

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
	width: "550px",
	margin: "0 auto",
	paddingBottom: "20px"
}
const Home = (props) => {
	// const { msgAlert, user } = props
	// console.log('props in home', props)

	return (
		<>
			<div>
				<CarouselImage />
			</div>
			<h1 style={title}>
				REfresh your ART... from the comfort of home.
			</h1>
			<p style={subtitle}>A subscription service delivers artwork right to your door. Tailored to your unique taste in art, season after season.</p>
			<p style={subtitle}>Check out some of our most popular categories:</p>
			<div>
				<Cards />
			</div>
			<div>
				<PlansSection />
			</div>
			<div>
				<h1 className="text-center" style={text}>From Our Community</h1>
				<Community />
			</div>
			<div>
				{/* <Tag /> */}
			</div>
		</>
	)
}

export default Home
