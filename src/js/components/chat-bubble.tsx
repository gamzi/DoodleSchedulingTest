import React from "react";

import "components/chat-bubble.scss";

interface ChatBubbleProps {
    data: {
        author: string,
        timestamp: number,
        message: string
    },
    isUser: boolean
}

export default class ChatBubble extends React.Component<ChatBubbleProps> { 
    parseText = (text: string) => {
        //convert HTML character codes
        let textElement = document.createElement('textarea');
        textElement.innerHTML = text;
        return textElement.value;
    }

    render() {
        let {data, isUser} = this.props;

        //apply special styling for the users own messages
        let messageClass = isUser ? 'chat-bubble user' : 'chat-bubble';
        let timeClass = isUser ? 'time user' : 'time';

        //convert timestamp to a date object
        let time = new Date(data.timestamp);
        
        //date formatting options
        let localeStringOptions = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };

        return (
            <div className={messageClass}>
                { !isUser && //show author if it's not the user
                    <div className="author">{data.author}</div>
                }

                <div className="text">{ this.parseText(data.message) }</div>

                <div className={timeClass}>{ time.toLocaleString(undefined, localeStringOptions) }</div>
            </div>
        );
    }
}