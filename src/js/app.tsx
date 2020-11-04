import React from "react";
import axios from "axios";

import ChatBubble from "./components/chat-bubble";

import "app.scss";

const user = "Marko K."; //current user

const api = axios.create({
    baseURL: 'https://chatty.kubernetes.doodle-test.com/api/chatty/v1.0',
    headers: {
        'Content-Type': 'application/json',
        'token': 'UQngykNP5WHC'
    }
});

const refreshInterval = 2500; //time interval, for message data updates

interface AppState {
    inputText: string,
    messages: Array<any>
}

export default class App extends React.Component<{}, AppState> {
    constructor (props) {
        super(props);

        this.state = {
            inputText: '', //new message input text
            messages: [] //message data
        };
    }
    
    private chatWrapperRef = React.createRef<HTMLDivElement>(); //reference to chat wrapper

    componentDidMount() {
        this.getMessages(); //retrieve initial message data

        setInterval(this.getMessages, refreshInterval); //update message data on intervals
    }

    getMessages = () => {
        //retrieve message data
        api.get('').then((response) => {
            if (response.data.length > this.state.messages.length) {
                //update message data if new messages are present
                this.setState({
                    messages: response.data
                }, () => {
                    //scroll to bottom of chat wrapper if new messages arrived
                    this.scrollToBottom();
                });
            }
        })
        .catch((error) => {
            console.error(error);
        });
    }

    scrollToBottom = () => {
        //scroll to bottom of chat wrapper
		this.chatWrapperRef.current.scrollTop = this.chatWrapperRef.current.scrollHeight;
    }

    handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        //update new message text
        this.setState({
            inputText: e.target.value
        });
    }

    onKeyEnter = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') { //submit message on 'Enter'
            e.preventDefault();
            this.sendMessage();
        }
    }

    sendMessage = () => {
        if (this.state.inputText.length > 0) { //dont send message if its empty
            api.post('', {
                "message": this.state.inputText,
                "author": user
            }).then(() => {
                this.getMessages(); //retrieve and update messages
            })
            .catch((error) => {
                console.error(error);
            });

            this.setState({
                inputText: '' //clear input
            });
        }
    }
      
    render() {
        return (
            <div className="chat" ref={this.chatWrapperRef}>
                <div className="chat-messages">
                    {
                        this.state.messages.map(item => {
                            //iterate through message data and render chat bubbles
                            let isUser = item.author === user; //confirm if author is the user

                            return <ChatBubble key={item._id} data={item} isUser={isUser}/>
                        })
                    }
                </div>

                <div className="chat-input-bar-wrapper">
                    <div className="chat-input-bar">
                        <input
                            placeholder="Message"
                            value={this.state.inputText}
                            onChange={this.handleInputChange}
                            onKeyDown={this.onKeyEnter}
                        />

                        <button onClick={this.sendMessage}>Send</button> 
                    </div>
                </div>
            </div>
        );
    }
}