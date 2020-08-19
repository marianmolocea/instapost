import React, { useState } from 'react';
import {db} from '../../../../firebase';
import './ChatRoom.css';
import Message from './Message/Message';

const ChatRoom = () => {

    const [input, setInput] = useState('');
    const [messages, setMessages] = useState(["hello", "Hi", "Hi", "Hi", "its me"]);

    const sendMessage = (e) => {
        e.preventDefault();
    }

    return (
        <div className="ChatRoom bottom-box-shadow">
            <div className="messages-container">
                {
                    messages.map((message, i) => <Message message={message} i={i}/>)
                }
            </div>
            <form>
                <input 
                    className="message-input" 
                    value={input} 
                    onChange={e => setInput(e.target.value)} 
                    placeholder="Message..."
                />
                <button type="submit" onClick={sendMessage}>Send</button>
            </form>
        </div>
    )
}

export default ChatRoom
