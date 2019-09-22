import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Container, Image, Nav, Navbar, NavDropdown, Row } from 'react-bootstrap';

import headerImg from '../../assets/images/header_1920.jpg';

import './Header.css';

class Header extends Component {
    static propTypes = {
        location: PropTypes.object.isRequired
    };

    render() {
        const { location } = this.props;
        const path = location.pathname.match(/^\/[^/]*/);

        return (
            <header>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Navbar.Brand href="/">Me-sida</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="/" active={path[0] === "/"}>Hem</Nav.Link>
                            <NavDropdown title="Redovisning" active={path[0] === "/reports"}>
                                <NavDropdown.Item href="/reports/week/1">Kmom01</NavDropdown.Item>
                                <NavDropdown.Item href="/reports/week/2">Kmom02</NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link href="/about" active={path[0] === "/about"}>Om</Nav.Link>
                            <Nav.Link href="/login" active={path[0] === "/login"}>
                                Logga in
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <Container fluid>
                    <Row>
                        <Image src={headerImg} className="img-header" />
                    </Row>
                </Container>
            </header>
        );
    }
}

export default withRouter(Header);
