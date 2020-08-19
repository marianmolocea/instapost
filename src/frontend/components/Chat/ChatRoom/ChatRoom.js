import React, { useState, useEffect } from 'react';
import firebase from 'firebase'
import {db} from '../../../../firebase';
import './ChatRoom.css';
import Message from './Message/Message';
import { useParams } from 'react-router-dom';

const ChatRoom = () => {

    const [input, setInput] = useState('');
    const [messages, setMessages] = useState(["hello", "Hi", "Hi", "Hi", "its me"]);
    const {username, peer} = useParams();

    const sendMessage = async (e) => {
        e.preventDefault();

        await db
            .collection('users')
            .doc(username)
            .collection('conversations')
            .doc(peer)
            .set({
                name: peer
            })

        await db
            .collection('users')
            .doc(peer)
            .collection('conversations')
            .doc(username)
            .set({
                name: peer
            })
        
        db
            .collection('users')
            .doc(username)
            .collection('conversations')
            .doc(peer)
            .collection('messages').add({
                message: input,
                name: username,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });

        db
            .collection('users')
            .doc(peer)
            .collection('conversations')
            .doc(username)
            .collection('messages').add({
                message: input,
                name: username,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });

        setInput('');
    }

    useEffect(() => {
        if (peer) {
            db
                .collection('users')
                .doc(username)
                .collection('conversations')
                .doc(peer)
                .collection('messages')
                .orderBy('timestamp', 'asc')
                .onSnapshot(snapshot => {
                   setMessages(snapshot.docs.map(doc => ({
                       id: doc.id,
                       data: doc.data()
                   })))
                })
        }
    }, [peer, username])

    return (
        <div className="ChatRoom bottom-box-shadow">
            <div className="chatRoom__header">
                <h3>Chat with: {peer}</h3>
            </div>
            <div className="messages-container">
                {
                    messages.map(message => <Message msg={message.data?.message} key={message.id} sender={message.data?.name === username}/>)
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
