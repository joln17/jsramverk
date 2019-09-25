import React, { Component } from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';

import config from '../../config';

import meImg from '../../assets/images/me001bws.jpg';

class Me extends Component {
    constructor(props) {
        super(props);
        this.state = { text: '' };
    }

    componentDidMount() {
        const url = config.baseURL;

        fetch(url, {
            method: 'GET',
            headers: {
                //x-access-token: token,
                'Content-Type': 'application/json'
            },
        }).then(response => {
            return response.json();
        }).then(result => {
            if (result.text) {
                this.setState({
                    text: result.text
                });
            } else if (result.error) {
                console.log(result.error);
            }
        }).catch(error => {
            console.log("Request failed due to the following error: ", error.message);
        });
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col md={{ span: 8, offset: 2 }}>
                        <h1>Min Me-sida i kursen jsramverk</h1>
                        <Image src={meImg} className="img-float-left" />
                        <ReactMarkdown source={this.state.text} />
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Me;
