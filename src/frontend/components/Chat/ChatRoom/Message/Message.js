import React from 'react';
import './Message.css'

const Message = ({msg, sender}) => {
    return (
        <div className={`Message ${sender && "receiver"}`}>
            {msg}
        </div>
    )
}

export default Message
