import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';

import config from '../../config';

class DeleteReport extends Component {
    static propTypes = {
        history: PropTypes.object.isRequired,
        match: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            isLoggedIn: false,
            reportId: this.props.match.params.id,
            titleInput: '',
            textInput: ''
        };
    }

    handleSubmit(e) {
        e.preventDefault();
        const urlReport = config.baseURL + '/reports/week/' + this.state.reportId;

        fetch(urlReport, {
            method: 'DELETE',
            headers: {
                'x-access-token': localStorage.getItem('token'),
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.status === 204) {
                this.props.history.push('/reports/admin');
            }
        }).catch(error => {
            console.log("Request failed due to the following error: ", error.message);
        });
    }

    componentDidMount() {
        const urlReport = config.baseURL + '/reports/week/' + this.state.reportId;

        fetch(urlReport, {
            method: 'GET',
            headers: {
                //'x-access-token': localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
        }).then(response => {
            return response.json();
        }).then(result => {
            if (result.data) {
                this.setState({
                    titleInput: result.data.title,
                    textInput: result.data.text
                });
            } else if (result.error) {
                console.log(result.error);
            }
        }).catch(error => {
            console.log("Request failed due to the following error: ", error.message);
        });

        const urlVerifyLogin = config.baseURL + '/auth/verify-admin-login';

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
        return (
            <Container>
                <Row>
                    <Col md={{ span: 8, offset: 2 }}>
                        <h1 className="center">Ta bort rapport</h1>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group controlId="formTitle">
                                <Form.Group controlId="formId">
                                    <Form.Label>Kursmoment</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="reportId"
                                        value={this.state.reportId}
                                        disabled
                                    />
                                </Form.Group>
                                <Form.Label>Titel</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="titleInput"
                                    value={this.state.titleInput}
                                    disabled
                                />
                            </Form.Group>

                            <Form.Group controlId="formText">
                                <Form.Label>Text</Form.Label>
                                <Form.Control as="textarea"
                                    rows="10"
                                    name="textInput"
                                    value={this.state.textInput}
                                    disabled
                                />
                            </Form.Group>
                            <div className="center">
                                <Button variant="danger" type="submit">
                                    Ta bort
                                </Button>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default DeleteReport;
