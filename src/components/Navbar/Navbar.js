import React, { useState, useContext } from "react";
import './Navbar.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../../assets/images/logo.png';
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
    const [activeRoute, setActiveRoute] = useState('/');
    const [navExpanded, setNavExpanded] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    const navigate = useNavigate();

    const onSelect = (route) => {
        window.scrollTo(0, 0);
        setActiveRoute(route);
        setNavExpanded(false);
    };

    const handleSignInUp = () => {
        setNavExpanded(false);
        navigate('/signinup'); 
    };

    return (
        <>
            <Navbar collapseOnSelect expanded={navExpanded} onToggle={setNavExpanded} fixed='top' expand="md" bg="dark" variant="dark">
                <Container fluid className="navbar-container">
                    <div className="brand-container">
                        <Navbar.Brand as={Link} to="/" className="brand-content">
                            <img src={logo} alt="logo" className="brand-logo" />
                            <span className="brand-text">Computer Society of India</span>
                        </Navbar.Brand>
                    </div>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="ml-auto">
                            <Nav.Link as={Link} to="/" onClick={() => onSelect('/')} active={activeRoute === '/'}>Home</Nav.Link>
                            <Nav.Link as={Link} to="/events" onClick={() => onSelect('/events')} active={activeRoute === '/events'}>Events</Nav.Link>
                            <Nav.Link as={Link} to="/blogs" onClick={() => onSelect('/blogs')} active={activeRoute === '/blogs'}>Blogs</Nav.Link>
                            <Nav.Link as={Link} to="/hackinfinity" onClick={() => onSelect('/hackinfinity')} active={activeRoute === '/hackinfinity'}>HackElite</Nav.Link>
                            <Nav.Link as={Link} to="/team" onClick={() => onSelect('/team')} active={activeRoute === '/team'}>Team</Nav.Link>
                            <Nav.Link as={Link} to="/zenith" onClick={() => onSelect('/zenith')} active={activeRoute === '/zenith'}>Domains</Nav.Link>
                            <button onClick={handleSignInUp} className="sign-in-up-button">Sign In/Up</button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            {showAlert && <div className='alert-box'>Use CSI Email ID</div>}
        </>
    );
};

export default NavBar;
