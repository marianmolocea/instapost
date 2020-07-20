import React from 'react'
import './PostView.css'
import Avatar from './Avatar/Avatar'
import { AiOutlineHeart } from 'react-icons/ai'
import { RiChat3Line } from 'react-icons/ri'
import { FiSend } from 'react-icons/fi'

const PostView = ({userName, image, likeNumber, caption}) => {

    const iconSize = "25px";

    return (
        <div className="PostView bottom-box-shadow">
            <div className="post-header">
                <Avatar userName={userName}/>
                <div className="element">{userName}</div> 
            </div>
            <img src={image} alt="text" className="image" />
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
