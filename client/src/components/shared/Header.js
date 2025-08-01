import React from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Link } from 'react-router-dom'
import logo2 from "./../homeComponents/images/logo2.png"

const linkStyle = {
	color: 'white',
	textDecoration: 'none'
}

const authenticatedOptions = (
	<>
		<Nav.Link as={Link} to='/available_art' style={linkStyle}>
			The Collection
		</Nav.Link>
		<Nav.Link as={Link} to='/subscription' style={linkStyle}>
			Subscriptions
		</Nav.Link>
		<Nav.Link as={Link} to='/about' style={linkStyle}>
			About
		</Nav.Link>
		<Nav.Link as={Link} to='/profile' style={linkStyle}>
			Profile
		</Nav.Link>
		<Nav.Link as={Link} to='/sign-out' style={linkStyle}>
			Sign Out
		</Nav.Link>
	</>
)

const unauthenticatedOptions = (
	<>
		<Nav.Link as={Link} to='/available_art' style={linkStyle}>
			The Collection
		</Nav.Link>
		<Nav.Link as={Link} to='/subscription' style={linkStyle}>
			Subscriptions
		</Nav.Link>
		<Nav.Link as={Link} to='/about' style={linkStyle}>
			About
		</Nav.Link>
		<Nav.Link as={Link} to='/sign-up' style={linkStyle}>
			Register
		</Nav.Link>
		<Nav.Link as={Link} to='/sign-in' style={linkStyle}>
			Sign In
		</Nav.Link>
	</>
)

const Header = ({ user }) => (
	<Navbar bg='secondary' variant='dark' expand='md'>
		<Navbar.Brand as={Link} to='/' style={linkStyle}>
			<img src={logo2} alt="Re-Art logo" style={{ maxWidth: '300px', height: '100px' }} />
		</Navbar.Brand>
		<Navbar.Toggle aria-controls='basic-navbar-nav' />
		<Navbar.Collapse id='basic-navbar-nav'>
			<Nav className='me-auto'>
				{user ? authenticatedOptions : unauthenticatedOptions}
			</Nav>
		</Navbar.Collapse>
	</Navbar>
)

export default Header
