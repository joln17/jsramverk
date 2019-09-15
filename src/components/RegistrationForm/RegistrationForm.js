import React, { Component } from 'react';
import { Button, Col, Container, Form, InputGroup, Row } from 'react-bootstrap';

import DatePicker from './DatePicker/DatePicker';

import './RegistrationForm.css';

class RegistrationForm extends Component {
    constructor(props) {
        super(props);
        this.log = this.log.bind(this);
        this.setPasswordVisibility = this.setPasswordVisibility.bind(this);
        this.state = { selectedDate: '', passwordInput: 'password', passwordIcon: 'visibility' };
    }

    log(date) {
        this.setState({
            selectedDate: date
        });
    }

    setPasswordVisibility() {
        if (this.state.passwordInput === 'password') {
            this.setState({
                passwordInput: 'text',
                passwordIcon: 'visibility_off'
            });
        } else {
            this.setState({
                passwordInput: 'password',
                passwordIcon: 'visibility'
            });
        }
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col md={{ span: 6, offset: 3 }}>
                        <h1 className="center">Registrera ny användare</h1>
                    </Col>
                    <Col md={{ span: 4, offset: 4 }}>
                        <Form>
                            <Form.Group controlId="formBasicName">
                                <Form.Label>Namn</Form.Label>
                                <Form.Control
                                    type="text"
                                    pattern="^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]+$" //eslint-disable-line
                                />
                            </Form.Group>

                            <Form.Group controlId="formBasicDate">
                                <Form.Label>Födelsedatum</Form.Label>
                                <DatePicker
                                    onChange={this.log}
                                    value={this.state.selectedDate}
                                    disabled={false}
                                />
                            </Form.Group>

                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Epost<span className="red-text">*</span></Form.Label>
                                <Form.Control
                                    type="email"
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Lösenord<span className="red-text">*</span></Form.Label>
                                <InputGroup>
                                    <Form.Control
                                        type={this.state.passwordInput}
                                        minLength="8"
                                        required
                                    />
                                    <InputGroup.Append>
                                        <Button variant="secondary"
                                            onClick={this.setPasswordVisibility}>
                                            <i className="form-input material-icons">
                                                {this.state.passwordIcon}
                                            </i>
                                        </Button>
                                    </InputGroup.Append>
                                </InputGroup>
                                <Form.Text className="text-muted">
                                    Minst 8 tecken.
                                </Form.Text>
                            </Form.Group>
                            <p><span className="red-text">*</span>) Anger obligatoriska fält</p>
                            <Form.Group controlId="formBasicApprove">
                                <Form.Check
                                    type="checkbox"
                                    className="center"
                                    label="Jag godkänner villkoren"
                                    required
                                />
                            </Form.Group>
                            <div className="center">
                                <Button variant="primary" type="submit">
                                    Registrera
                                </Button>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default RegistrationForm;
