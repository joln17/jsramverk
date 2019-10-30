import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { Container, Image, Nav, Navbar, NavDropdown, Row } from 'react-bootstrap';

import config from '../../config';

import headerImg from '../../assets/images/header_1920.jpg';

import './Header.css';

class Header extends Component {
    static propTypes = {
        location: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            adminOption: null,
            titlesFetched: null,
            loginMenu: 'Logga in',
            isLoggedIn: false
        };
    }

    componentDidMount() {
        const urlTitles = config.baseURL + '/reports/titles';

        fetch(urlTitles, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(response => {
            return response.json();
        }).then(result => {
            if (result.data) {
                const options = result.data.map(row => {
                    return <NavDropdown.Item key={row.id} as={Link} to={'/reports/week/' + row.id}>
                        {row.title}
                    </NavDropdown.Item>;
                });

                this.setState({ titlesFetched: options });
            } else if (result.error) {
                console.log(result.error);
            }
        }).catch(error => {
            console.log("Request failed due to the following error: ", error.message);
        });
    }

    render() {
        let adminNav, loginNav;
        const path = this.props.location.pathname.match(/^\/[^/]*/);

        if (localStorage.getItem('token')) {
            adminNav = <NavDropdown.Item key={0} as={Link} to={'/reports/admin'}>
                Admin
            </NavDropdown.Item>;
            loginNav = <Nav.Link as={Link} to="/logout" active={path[0] === "/login"}>
                Logga ut
            </Nav.Link>;
        } else {
            loginNav = <Nav.Link as={Link} to="/login" active={path[0] === "/login"}>
                Logga in
            </Nav.Link>;
        }

        return (
            <header>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Navbar.Brand as={Link} to="/">Me-sida</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link as={Link} to="/" active={path[0] === "/"}>Hem</Nav.Link>
                            <NavDropdown title="Redovisning" active={path[0] === "/reports"}>
                                {adminNav}
                                {this.state.titlesFetched}
                            </NavDropdown>
                            <Nav.Link as={Link} to="/chat/set-name" active={path[0] === "/chat"}>
                                Chatta
                            </Nav.Link>
                            <Nav.Link as={Link} to="/about" active={path[0] === "/about"}>
                                Om
                            </Nav.Link>
                            {loginNav}
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
