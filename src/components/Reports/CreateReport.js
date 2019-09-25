import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';

import config from '../../config';

class CreateReport extends Component {
    static propTypes = {
        history: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            isLoggedIn: false,
            reportId: '',
            titleInput: '',
            textInput: ''
        };
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        const urlReports = config.baseURL + '/reports';

        fetch(urlReports, {
            method: 'POST',
            headers: {
                'x-access-token': localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: this.state.reportId,
                title: this.state.titleInput,
                text: this.state.textInput,
            })
        }).then(response => {
            return response.json();
        }).then(result => {
            if (result.data) {
                this.props.history.push('/reports/admin');
            } else if (result.error) {
                console.log(result.error);
            }
        }).catch(error => {
            console.log("Request failed due to the following error: ", error.message);
        });
    }

    componentDidMount() {
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
                        <h1 className="center">Skapa ny rapport</h1>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group controlId="formId">
                                <Form.Label>Kursmoment</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="reportId"
                                    value={this.state.reportId}
                                    onChange={this.handleChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="formTitle">
                                <Form.Label>Titel</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="titleInput"
                                    value={this.state.titleInput}
                                    onChange={this.handleChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="formText">
                                <Form.Label>Text</Form.Label>
                                <Form.Control as="textarea"
                                    rows="10"
                                    name="textInput"
                                    value={this.state.textInput}
                                    onChange={this.handleChange}
                                />
                            </Form.Group>
                            <div className="center">
                                <Button variant="primary" type="submit">
                                    Spara
                                </Button>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default CreateReport;
