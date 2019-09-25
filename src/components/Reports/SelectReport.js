import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';

import config from '../../config';

class SelectReport extends Component {
    static propTypes = {
        reportId: PropTypes.string,
        selectReportId: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            titlesFetched: [<option key={0} value={''}>{''}</option>]
        };
    }

    handleChange(e) {
        this.props.selectReportId(e.currentTarget.value);
    }

    componentDidMount() {
        const urlTitles = config.baseURL + '/reports/titles';

        fetch(urlTitles, {
            method: 'GET',
            headers: {
                //x-access-token: token,
                'Content-Type': 'application/json'
            },
        }).then(response => {
            return response.json();
        }).then(result => {
            if (result.data) {
                result.data.unshift({ id: 0, title: "Välj rapport..." });
                let options = result.data.map(row => {
                    return <option key={row.id} value={String(row.id)}>{row.title}</option>;
                });

                this.setState({ titlesFetched: options });
            } else if (result.error) {
                console.log(result.error);
            }
        }).catch(error => {
            console.log("Request failed due to the following error: ", error.message);
        });
    }

    render() {
        return (
            <Form.Control as="select" value={this.props.reportId} onChange={this.handleChange}>
                {this.state.titlesFetched}
            </Form.Control>
        );
    }
}

export default SelectReport;
