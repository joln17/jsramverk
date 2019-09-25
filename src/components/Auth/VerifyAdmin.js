import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Col, Container, Form, InputGroup, Row } from 'react-bootstrap';

import config from '../../config';

class VerifyAdmin extends Component {
    constructor(props) {
        super(props);
        this.setAdminVisibility = this.setAdminVisibility.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            adminInput: '',
            adminInputType: 'password',
            adminInputIcon: 'visibility',
            redirect: false
        };
    }

    setAdminVisibility() {
        if (this.state.adminInputType === 'password') {
            this.setState({
                adminInputType: 'text',
                adminInputIcon: 'visibility_off'
            });
        } else {
            this.setState({
                adminInputType: 'password',
                adminInputIcon: 'visibility'
            });
        }
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        const urlVerifyAdmin = config.baseURL + '/auth/verify-admin';

        fetch(urlVerifyAdmin, {
            method: 'POST',
            headers: {
                'x-access-token': localStorage.getItem('token'),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                adminPass: this.state.adminInput
            })
        }).then(response => {
            return response.json();
        }).then(result => {
            if (result.data && result.data.token) {
                localStorage.setItem('token', result.data.token);
                this.setState({ redirect: true });
            }
        }).catch(error => {
            console.log("Request failed due to the following error: ", error.message);
        });
    }

    componentDidMount() {
        const urlVerifyLogin = config.baseURL + '/auth/verify-login';

        fetch(urlVerifyLogin, {
            method: 'GET',
            headers: {
                'x-access-token': localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
        }).then(response => {
            return response.json();
        }).then(result => {
            if (result.data) {
                this.setState({ isLoggedIn: true });
            } else if (result.error) {
                console.log(result.error);
            }
        }).catch(error => {
            console.log("Request failed due to the following error: ", error.message);
        });
    }

    render() {
        if (!this.state.isLoggedIn) {
            return null;
        }
        if (this.state.redirect) {
            return <Redirect to='/reports/admin' />;
        }
        return (
            <Container>
                <Row>
                    <Col md={{ span: 6, offset: 3 }}>
                        <h1 className="center">Verifiera adminåtkomst</h1>
                    </Col>
                    <Col md={{ span: 4, offset: 4 }}>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group controlId="formBasicAdmin">
                                <Form.Label>Administratörkod</Form.Label>
                                <InputGroup>
                                    <Form.Control
                                        type={this.state.adminInputType}
                                        name="adminInput"
                                        onChange={this.handleChange}
                                    />
                                    <InputGroup.Append>
                                        <Button variant="secondary"
                                            onClick={this.setAdminVisibility}>
                                            <i className="form-input material-icons">
                                                {this.state.adminInputIcon}
                                            </i>
                                        </Button>
                                    </InputGroup.Append>
                                </InputGroup>
                                <Form.Text className="text-muted">
                                    Om du erhållit en administratörkod ange den här
                                </Form.Text>
                            </Form.Group>

                            <div className="center">
                                <Button variant="primary" type="submit">
                                    Verifiera
                                </Button>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default VerifyAdmin;
