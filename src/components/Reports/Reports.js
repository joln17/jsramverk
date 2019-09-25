import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, Container, Row } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';

import config from '../../config';

class Reports extends Component {
    static propTypes = {
        match: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            reportId: this.props.match.params.kmom,
            title: '',
            text: ''
        };
    }

    componentDidMount() {
        const urlReport = config.baseURL + '/reports/week/' + this.state.reportId;

        fetch(urlReport, {
            method: 'GET',
            headers: {
                //x-access-token: token,
                'Content-Type': 'application/json'
            },
        }).then(response => {
            return response.json();
        }).then(result => {
            if (result.data) {
                this.setState({
                    title: result.data.title,
                    text: result.data.text
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
                        <ReactMarkdown source={this.state.text} />
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Reports;
