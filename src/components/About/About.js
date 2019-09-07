import React, { Component } from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';

import logo from '../../assets/images/logo.svg';
import meArticle from '../../assets/articles/about.md';

class About extends Component {
    constructor(props) {
        super(props);
        this.state = { mdText: "" };
    }

    componentDidMount() {
        fetch(meArticle)
            .then(response => {
                return response.text();
            })
            .then(text => {
                this.setState({ mdText: text });
            });
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col md={{ span: 8, offset: 2 }}>
                        <h1>Om</h1>
                        <Image src={logo} className="img-float-right" />
                        <ReactMarkdown source={this.state.mdText} />
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default About;
