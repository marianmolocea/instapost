import React, {useState, useEffect} from 'react';
import firebase from 'firebase';
import { db } from '../../../firebase'
import Comment from './Comment/Comment'
import './PostView.css'
import {Avatar, Button} from '@material-ui/core'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { RiChat3Line } from 'react-icons/ri'
import { FiSend } from 'react-icons/fi'

const PostView = ({postId, user, username, imageUrl, likeNumber, caption}) => {

    const [comments, setComments] = useState([]);
    const [likes, setLikes] = useState(0);
    const [comment, setComment] = useState('');
    const [isLiked, setIsLiked] = useState(false);
    const [activeHeart, setActiveHeart] = useState('')

    useEffect(() => {
        db
            .collection('posts')
            .doc(postId)
            .collection('likes')
            .doc(user.displayName)
            .get()
            .then(doc => setIsLiked(doc.data()?.like));
    }, [postId, user.displayName])

    useEffect(() => {
        let unsubscribe
        if(postId) {
            unsubscribe = {
                comments: db
                    .collection('posts')
                    .doc(postId)
                    .collection('comments')
                    .orderBy('timestamp', 'asc')
                    .onSnapshot(snapshot => {
                        setComments(snapshot.docs.map(doc => doc.data()))
                    }),
                likes: db
                    .collection('posts')
                    .doc(postId)
                    .collection('likes')
                    .onSnapshot(snapshot => {
                        setLikes(snapshot.docs.length)
                    }),
            }
        }

        return () => {
            unsubscribe.comments();
            unsubscribe.likes();
        };
    }, [postId, user.displayName])

    const postComment = (e) => {
        e.preventDefault();

        db.collection("posts").doc(postId).collection("comments").add({
            text: comment,
            username: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });

        setComment('');
    }

    const likePost = (e) => {
        e.preventDefault();

        db.collection('posts').doc(postId).collection('likes').doc(user.displayName).set({
            like: true
        })
        setIsLiked(true);
    }

    const unlikePost = (e) => {
        e.preventDefault(e)

        db.collection('posts').doc(postId).collection('likes').doc(user.displayName).delete()
        setIsLiked(false);
    }

    const triggerHeartEffect = (e) => {
        if (!isLiked) {
            likePost(e);
        } 
        setActiveHeart('active');
        setTimeout(() => setActiveHeart(''), 1001)
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
            <div className="image-container">
                <AiFillHeart className={`overlay-heart ${activeHeart}`} fill="#fff" size="80px" />
                <img onDoubleClick={triggerHeartEffect} src={imageUrl} alt="text" className="image" />
            </div>
            <div className="actions">
                <button className="like__button"
                    onClick={isLiked ? unlikePost : likePost}
                >
                    {
                        isLiked ? 
                        <AiFillHeart fill="#fb3958" size={iconSize} /> :
                        <AiOutlineHeart size={iconSize} />
                    }
                </button>
                <RiChat3Line size={iconSize}/>
                <FiSend size={iconSize}/>
            </div>
            <div className="likes-number">There are <b>{likes} people</b> who like your post</div>
            <div className="caption">
                <strong>{username}&nbsp;</strong>{caption}
            </div>
            <Comment comments={comments}/>
            <div className="add-comment-container">
                <input 
                    id="add-comment"
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
