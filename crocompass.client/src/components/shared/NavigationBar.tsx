// src/components/NavigationBar.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useAuth } from '../shared/AuthContext';

const NavigationBar: React.FC = () => {
    const { currentUser, logout, role } = useAuth();

    return (
        <Navbar bg="#F1F1F1" fixed="top" expand="lg" variant="light" className="navigation-bar ">
            <Container>
                <Navbar.Brand as={Link} to="/" className="navbar-logo">CroCompass</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/restaurants">Restaurants</Nav.Link>
                        <Nav.Link as={Link} to="/attractions">Attractions</Nav.Link>
                        <Nav.Link as={Link} to="/maps">Maps</Nav.Link>
                        <Nav.Link as={Link} to="/about">About Us</Nav.Link>
                        {role === 'Admin' && (
                            <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
                        )}
                        {role === 'Advertiser' && (
                            <Nav.Link as={Link} to="/create-ad">Create Advertisement</Nav.Link>
                        )}
                    </Nav>
                    <Nav>
                        {currentUser ? (
                            <>
                                <Nav.Link as={Link} to="/dashboard">{currentUser} (Profile)</Nav.Link>
                                <Nav.Link as={Link} to="/" onClick={logout}>Logout</Nav.Link>
                            </>
                        ) : (
                            <>
                                <Nav.Link as={Link} to="/signup">Sign Up</Nav.Link>
                                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavigationBar;
