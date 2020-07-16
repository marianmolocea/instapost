import React from 'react'
import './PostView.css'

const PostView = ({userName, image, likeNumber, caption}) => {
    return (
        <div className="PostView bottom-box-shadow">
            <div className="user-name">{userName}</div>
            <img src={image} alt="text" className="image" />
            <div className="actions"></div>
            <div className="likes-number">{likeNumber}</div>
            <div className="caption">{caption}</div>
            <div className="comments"></div>
            <div className="add-comment"></div>
        </div>
    )
}

export default PostView
