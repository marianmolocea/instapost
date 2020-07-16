import React from 'react'
import './PostView.css'
import Avatar from './Avatar/Avatar'

const PostView = ({userName, image, likeNumber, caption}) => {
    return (
        <div className="PostView bottom-box-shadow">
            <div className="post-header">
                <Avatar userName={userName}/>
                <div className="element">{userName}</div> 
            </div>
            <img src={image} alt="text" className="image" />
            <div className="actions"></div>
            <div className="likes-number">There are <b>{likeNumber} people</b> who like your post</div>
            <div className="caption">{caption}</div>
            <div className="comments"></div>
            <div className="add-comment"></div>
        </div>
    )
}

export default PostView
