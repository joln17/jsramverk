import React, { Component } from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';

import meImg from '../../assets/images/me001bws.jpg';
import meArticle from '../../assets/articles/me.md';

class Me extends Component {
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
