import React, { Component } from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';

import meImg from '../../assets/images/me001bws.jpg';

class Me extends Component {
    constructor(props) {
        super(props);
        this.state = { mdText: "" };
    }

    componentDidMount() {
        fetch('https://me-api.joln17.me/')
            .then(response => {
                return response.json();
            })
            .then(data => {
                this.setState({ mdText: data.text });
            });
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col md={{ span: 8, offset: 2 }}>
                        <h1>Min Me-sida i kursen jsramverk</h1>
                        <Image src={meImg} className="img-float-left" />
                        <ReactMarkdown source={this.state.mdText} />
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Me;
