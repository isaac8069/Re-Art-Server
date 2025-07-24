import React from 'react';
import { Link } from 'react-router-dom';
import ThemeToggle from '../../../theme/ThemeToggle';
import { useAuth } from '../../../context/auth/AuthContext';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import { FaUserCircle } from 'react-icons/fa';
import styles from './Header.module.css';

const Header = () => {
  const { user } = useAuth(); // AuthContext state

  return (
    <header className={styles.header}>
      <Navbar expand="lg" className={`${styles.headerContent} w-100`}>
        <Container className="px-0">
          {/* Logo */}
          <Navbar.Brand as={Link} to="/" className={styles.logo}>
            Re-Art
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="main-navbar" />
          <Navbar.Collapse id="main-navbar">
            {/* Left navigation links */}
            <Nav className={styles.navLinks}>
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/about">About</Nav.Link>
              <Nav.Link as={Link} to="/available_art">Art</Nav.Link>
            </Nav>

            {/* Right side links */}
            <Nav className="ms-auto align-items-center">
              {user ? (
                <NavDropdown
                  align="end"
                  id="user-nav-dropdown"
                  title={
                    <span className={styles.userDropdown}>
                      <FaUserCircle /> {user.email}
                    </span>
                  }
                >
                  <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/change-password">Change Password</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item as={Link} to="/sign-out">Sign Out</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <>
                  <Nav.Link as={Link} to="/sign-in">Sign In</Nav.Link>
                  <Nav.Link as={Link} to="/sign-up">Sign Up</Nav.Link>
                </>
              )}
              <ThemeToggle />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
