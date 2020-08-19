import React, {useState, useEffect} from 'react';
import './Chat.css'
import { Avatar } from '@material-ui/core';
import { Link, useParams } from 'react-router-dom';
import { db } from '../../../firebase';

const Chat = () => {
    const [conversations, setConversations] = useState([]);
    const { username } = useParams();

    useEffect(() => {
        const unsubscribe = db.collection('users').doc(username).collection('conversations').onSnapshot(snapshot => {
            setConversations(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        });

        return () => unsubscribe();
    }, [username])

    return (
        <div className="Chat bottom-box-shadow">
            <h3>Messages</h3>
            {
                conversations.map(conversation => ( 
                    <Link to={`/profile/${username}/chat/${conversation.id}`} key={conversation.id} className="room-name__card bottom-box-shadow">
                        <Avatar className="chat-avatar"/>
                        <div className="room-name">{conversation.id}</div>
                    </Link>
                ))
            }
        </div>
    )
}

export default Chat
