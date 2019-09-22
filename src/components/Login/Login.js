import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Col, Container, Form, InputGroup, Row } from 'react-bootstrap';

import './Login.css';

class Login extends Component {
    constructor(props) {
        super(props);
        this.setPasswordVisibility = this.setPasswordVisibility.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            emailInput: '',
            passwordInput: '',
            passwordInputType: 'password',
            passwordInputIcon: 'visibility',
            redirect: false
        };
    }

    setPasswordVisibility() {
        if (this.state.passwordInputType === 'password') {
            this.setState({
                passwordInputType: 'text',
                passwordInputIcon: 'visibility_off'
            });
        } else {
            this.setState({
                passwordInputType: 'password',
                passwordInputIcon: 'visibility'
            });
        }
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        //const url = 'https://me-api.joln17.me/auth/login';
        const url = 'http://localhost:8333/auth/login';

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: this.state.emailInput,
                password: this.state.passwordInput,
            })
        }).then(response => {
            return response.json();
        }).then(result => {
            if (result.data && result.data.token) {
                localStorage.setItem('token', result.data.token);
                this.setState({ redirect: true });
            } else if (result.error) {
                console.log(result.error);
            }
        }).catch(error => {
            console.log("Request failed due to the following error: ", error.message);
        });
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to='/' />;
        }
        return (
            <Container>
                <Row>
                    <Col md={{ span: 6, offset: 3 }}>
                        <h1 className="center">Logga in</h1>
                    </Col>
                    <Col md={{ span: 4, offset: 4 }}>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Epost</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="emailInput"
                                    onChange={this.handleChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Lösenord</Form.Label>
                                <InputGroup>
                                    <Form.Control
                                        type={this.state.passwordInputType}
                                        name="passwordInput"
                                        onChange={this.handleChange}
                                        required
                                    />
                                    <InputGroup.Append>
                                        <Button variant="secondary"
                                            onClick={this.setPasswordVisibility}>
                                            <i className="form-input material-icons">
                                                {this.state.passwordInputIcon}
                                            </i>
                                        </Button>
                                    </InputGroup.Append>
                                </InputGroup>
                            </Form.Group>
                            <div className="center">
                                <Button variant="primary" type="submit">
                                    Logga in
                                </Button>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Login;
