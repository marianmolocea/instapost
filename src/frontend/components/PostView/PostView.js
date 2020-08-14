import React from 'react'
import './PostView.css'
import Avatar from '@material-ui/core/Avatar'
import { AiOutlineHeart } from 'react-icons/ai'
import { RiChat3Line } from 'react-icons/ri'
import { FiSend } from 'react-icons/fi'

const PostView = ({username, imageUrl, likeNumber, caption}) => {

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
            <div className="caption">{caption}</div>
            <div className="comments"></div>
            <div className="add-comment-container">
                <input className="add-comment" placeholder="Add a comment..." />
                <button className="post">Post</button>
            </div>
        </div>
    )
}

export default PostView
