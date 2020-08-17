import React, {useState, useEffect} from 'react';
import firebase from 'firebase';
import { db } from '../../../firebase'
import Comment from './Comment/Comment'
import './PostView.css'
import {Avatar, Button} from '@material-ui/core'
import { AiOutlineHeart } from 'react-icons/ai'
import { RiChat3Line } from 'react-icons/ri'
import { FiSend } from 'react-icons/fi'

const PostView = ({postId, user, username, imageUrl, likeNumber, caption}) => {

    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');

    useEffect(() => {
        let unsubscribe
        if(postId) {
            unsubscribe = db
                .collection('posts')
                .doc(postId)
                .collection('comments')
                .orderBy('timestamp', 'asc')
                .onSnapshot(snapshot => {
                    setComments(snapshot.docs.map(doc => doc.data()))
                })
        }

        return () => {
            unsubscribe();
        };
    }, [postId])

    const postComment = (e) => {
        e.preventDefault();

        db.collection("posts").doc(postId).collection("comments").add({
            text: comment,
            username: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });

        setComment('');
    }

    const iconSize = "20px";

    return (
        <div className="PostView bottom-box-shadow">
            <div className="post-header">
                <Avatar 
                    className="avatar" 
                    alt={username.toUpperCase()} 
                    src="/broken-image.jpg"
                />
                <div className="user-name">{username}</div> 
            </div>
            <img src={imageUrl} alt="text" className="image" />
            <div className="actions">
                <AiOutlineHeart size={iconSize} />
                <RiChat3Line size={iconSize}/>
                <FiSend size={iconSize}/>
            </div>
            <div className="likes-number">There are <b>{likeNumber} people</b> who like your post</div>
            <div className="caption">
                <strong>{username}&nbsp;</strong>{caption}
            </div>
            <Comment comments={comments}/>
            <div className="add-comment-container">
                <input 
                    className="add-comment" 
                    placeholder="Add a comment..."
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                />
                <Button 
                    className="post"
                    disabled={!comment}
                    type="submit"
                    onClick={postComment}
                >
                    Post
                </Button>
            </div>
        </div>
    )
}

export default PostView
