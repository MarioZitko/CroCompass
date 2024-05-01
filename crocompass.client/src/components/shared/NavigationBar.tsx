import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, NavItem } from 'react-bootstrap';
import { useAuth } from '../shared/AuthContext';

const NavigationBar: React.FC = () => {
    const { currentUser, logout } = useAuth();

    return (
        <Navbar bg="dark" fixed="top" expand="sm" variant="dark" className="justify-content-between">
            <Container>
                <Navbar.Brand as={Link} to="/">TriangleApp</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
                    <Nav className="align-items-center">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        {currentUser ? (
                            <>
                                <Nav.Link as={Link} to="/add-triangle">Add Triangle</Nav.Link>
                                <NavItem className="mx-auto">
                                    <span className="navbar-text text-white">{currentUser}</span>
                                </NavItem>
                                <Nav.Link as={Link} to="/" onClick={logout}>Logout</Nav.Link>
                            </>
                        ) : (
                            <>
                                <Nav.Link as={Link} to="/signup">SignUp</Nav.Link>
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
