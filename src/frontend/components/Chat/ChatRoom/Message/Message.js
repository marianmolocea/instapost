import React from 'react';
import './Message.css'

const Message = ({message, i}) => {
    return (
        <div className={`Message ${i % 2 && "receiver"}`}>
            {message}
        </div>
    )
}

export default Message
