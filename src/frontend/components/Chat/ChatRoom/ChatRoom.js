import React, { useState, useEffect } from 'react';
import firebase from 'firebase'
import {db} from '../../../../firebase';
import './ChatRoom.css';
import Message from './Message/Message';
import { useParams } from 'react-router-dom';
import { Avatar } from '@material-ui/core';

const ChatRoom = () => {

    const [input, setInput] = useState('');
    const [messages, setMessages] = useState(["hello", "Hi", "Hi", "Hi", "its me"]);
    const {username, peer} = useParams();
    const [peerPhoto, setPeerPhoto] = useState('')

    const sendMessage = async (e) => {
        e.preventDefault();

        if (input) {
            
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
    }, [peer, username]);

    useEffect(() => {
        const unsubscribe = db.collection('users').doc(peer).onSnapshot(snapshot => setPeerPhoto(snapshot.data().profilePhoto));

        return () => unsubscribe();
    })

    return (
        <div className="ChatRoom bottom-box-shadow">
            <div className="chatRoom__header bottom-box-shadow">
                <Avatar src={peerPhoto} />
                <h3>{peer}</h3>
            </div>
            <div className="messages-container">
                {
                    messages.map(message => <Message msg={message.data?.message} key={message?.id} sender={message.data?.name === username}/>)
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
