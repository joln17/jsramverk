import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, Container, Row } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';

import kmom01 from '../../assets/articles/kmom01.md';
import kmom02 from '../../assets/articles/kmom02.md';

class Reports extends Component {
    static propTypes = {
        match: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.state = { mdText: "" };
    }

    componentDidMount() {
        const { match } = this.props;
        const { kmom } = match.params;
        const reports = {
            1: kmom01,
            2: kmom02
        };

        fetch(reports[kmom])
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
                        <ReactMarkdown source={this.state.mdText} />
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Reports;
