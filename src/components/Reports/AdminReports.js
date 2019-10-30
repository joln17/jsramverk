import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';

import config from '../../config';

import SelectReport from './SelectReport';

class AdminReports extends Component {
    static propTypes = {
        history: PropTypes.object.isRequired
    }

    constructor(props) {
        super(props);
        this.selectReportId = this.selectReportId.bind(this);
        this.handleEditClick = this.handleEditClick.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.state = {
            isLoggedIn: false,
            reportId: ''
        };
    }

    selectReportId(id) {
        this.setState({
            reportId: id
        });
    }

    handleEditClick() {
        if (this.state.reportId > 0) {
            this.props.history.push('/reports/update/' + this.state.reportId);
        }
    }

    handleDeleteClick() {
        if (this.state.reportId > 0) {
            this.props.history.push('/reports/delete/' + this.state.reportId);
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
    }

    render() {
        if (!this.state.isLoggedIn) {
            return null;
        }
        return (
            <Container>
                <Row>
                    <Col md={{ span: 8, offset: 2 }}>
                        <h1 className="center">Administrera rapporter</h1>
                        <Form>
                            <Form.Group controlId="formTitle">
                                <Form.Label>Titel</Form.Label>
                                <Row className="flex-row-no-wrap">
                                    <Col md={{ span: 10 }}>
                                        <SelectReport
                                            reportId={this.state.reportId}
                                            selectReportId={this.selectReportId}
                                        />
                                    </Col>
                                    <Col>
                                        <Button variant="primary" onClick={this.handleEditClick}>
                                            <i className="form-input material-icons">
                                                edit
                                            </i>
                                        </Button>
                                    </Col>
                                    <Col>
                                        <Button variant="primary" onClick={this.handleDeleteClick}>
                                            <i className="form-input material-icons">
                                                delete
                                            </i>
                                        </Button>
                                    </Col>
                                </Row>
                            </Form.Group>

                            <div className="center">
                                <Button variant="primary" as={Link} to="/reports/create">
                                    Skapa ny rapport
                                </Button>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default AdminReports;
