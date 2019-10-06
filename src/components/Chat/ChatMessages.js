import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ChatMessages extends Component {
    static propTypes = {
        messages: PropTypes.array
    };

    scrollToBottom() {
        const scrollHeight = this.messageList.scrollHeight;
        const height = this.messageList.clientHeight;
        const maxScrollTop = scrollHeight - height;

        this.messageList.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    }

    componentDidMount() {
        this.scrollToBottom();
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    render() {
        const messages = this.props.messages.map((message, index) => {
            const time = new Date(message.time);

            return <div key={index}>
                <p>
                    <strong>
                        {time.toLocaleTimeString('sv-SE')} {message.name}<br />
                    </strong>
                    {message.text}
                </p>
            </div>;
        });

        return (
            <div className="messages" ref={div => { this.messageList = div; }}>{messages}</div>
        );
    }
}

export default ChatMessages;
