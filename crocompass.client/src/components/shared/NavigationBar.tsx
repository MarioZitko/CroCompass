import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useAuth } from '../shared/AuthContext';

const NavigationBar: React.FC = () => {
    const { currentUser, logout, role } = useAuth();  // Assume `role` is also provided by `useAuth`

    return (
        <Navbar bg="dark" fixed="top" expand="lg" variant="dark">
            <Container>
                <Navbar.Brand as={Link} to="/">CroCompass</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        {role === 'Admin' && (
                            <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
                        )}
                        {role === 'Advertiser' && (
                            <Nav.Link as={Link} to="/create-ad">Create Advertisement</Nav.Link>
                        )}
                        {role === 'User' && (
                            <Nav.Link as={Link} to="/my-reviews">My Reviews</Nav.Link>
                        )}
                    </Nav>
                    <Nav>
                        {currentUser ? (
                            <>
                                <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
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
