import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Col, Container, Form, Row } from 'react-bootstrap';
import io from 'socket.io-client';

import ChatMessages from './ChatMessages';
import SaveLoadToolbar from './SaveLoadToolbar';

import config from '../../config';
import './Chat.css';

let socket;

class Chat extends Component {
    static propTypes = {
        location: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.setMessages = this.setMessages.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
        this.state = {
            isLoggedIn: false,
            connected: false,
            messages: []
        };
    }

    setMessages(messages) {
        this.setState({
            messages: messages
        });
    }

    handleKeyUp(e) {
        if (e.key === 'Enter' && this.state.connected) {
            const message = {
                name: this.props.location.state.name,
                time: Date.now(),
                text: e.target.value
            };

            socket.emit('chat message', message);
            e.target.value = '';
        }
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

        if (this.props.location.state) {
            socket = io('https://socket-server.joln17.me');
            //socket = io('http://localhost:8300');
            socket.on('connect', () => {
                this.setState({ connected: true });
                socket.on('chat message', message => {
                    this.setState({ messages: this.state.messages.concat(message) });
                });
                const connectMessage = {
                    name: this.props.location.state.name + " anslöt till chatten",
                    time: Date.now(),
                    text: ""
                };

                socket.emit('chat message', connectMessage);
            });
        }
    }

    render() {
        if (!this.props.location.state) {
            return <Redirect to='/chat/set-name' />;
        }
        let buttonToolbar = this.state.isLoggedIn ?
            <SaveLoadToolbar messages={this.state.messages} setMessages={this.setMessages} /> :
            null;

        return (
            <Container>
                <Row>
                    <Col md={{ span: 6, offset: 3 }}>
                        <h1 className="center">Chatta som {this.props.location.state.name}</h1>
                        <ChatMessages messages={this.state.messages} />
                        {buttonToolbar}
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group controlId="formText">
                                <Form.Label>Skriv meddelande:</Form.Label>
                                <Form.Control as="textarea"
                                    rows="3"
                                    onKeyUp={this.handleKeyUp}
                                />
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Chat;
