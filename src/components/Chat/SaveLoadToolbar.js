import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonToolbar } from 'react-bootstrap';

import config from '../../config';

class SaveLoadToolbar extends Component {
    static propTypes = {
        messages: PropTypes.array,
        setMessages: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.handleLoad = this.handleLoad.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

    handleLoad() {
        const urlChat = config.baseURL + '/chat';

        fetch(urlChat, {
            method: 'GET',
            headers: {
                'x-access-token': localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
        }).then(response => {
            return response.json();
        }).then(result => {
            if (result.data) {
                this.props.setMessages(result.data);
            } else if (result.error) {
                console.log(result.error);
            }
        }).catch(error => {
            console.log("Request failed due to the following error: ", error.message);
        });
    }

    handleSave() {
        const urlChat = config.baseURL + '/chat';

        fetch(urlChat, {
            method: 'POST',
            headers: {
                'x-access-token': localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                messages: this.props.messages
            })
        }).then(response => {
            return response.json();
        }).then(result => {
            if (result.data) {
                console.log(result.data.message);
            } else if (result.error) {
                console.log(result.error);
            }
        }).catch(error => {
            console.log("Request failed due to the following error: ", error.message);
        });
    }

    render() {
        return (
            <ButtonToolbar className="flex-center">
                <Button
                    variant="primary"
                    type="button"
                    className="toolbar-button"
                    onClick={this.handleLoad}>
                        Ladda
                </Button>
                <Button variant="primary"
                    type="button"
                    className="toolbar-button"
                    onClick={this.handleSave}>
                    Spara
                </Button>
            </ButtonToolbar>
        );
    }
}

export default SaveLoadToolbar;
