import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';

class ChatName extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            nameInput: '',
            redirect: false
        };
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({ redirect: true });
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={{
                pathname: '/chat',
                state: { name: this.state.nameInput }
            }} />;
        }
        return (
            <Container>
                <Row>
                    <Col md={{ span: 6, offset: 3 }}>
                        <h1 className="center">Ange chattnamn</h1>
                    </Col>
                    <Col md={{ span: 4, offset: 4 }}>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group controlId="formBasicName">
                                <Form.Label>Namn</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="nameInput"
                                    onChange={this.handleChange}
                                    maxLength="64"
                                />
                            </Form.Group>

                            <div className="center">
                                <Button variant="primary" type="submit">
                                    Börja chatta
                                </Button>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default ChatName;
