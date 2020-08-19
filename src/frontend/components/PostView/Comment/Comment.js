import React from 'react'
import './Comment.css';
import {Avatar} from '@material-ui/core'

const Comment = ({comments}) => {
    return (
        <>
        {
            comments.map(comment => (
                <div className="Comment" key={comment.timestamp + comment.username}>
                    <Avatar 
                        className="avatar" 
                        alt={comment.username.toUpperCase()} 
                        src={comment.profilePhoto}
                    />
                    <div className="user-name">{comment.username}:&nbsp;</div>
                    <div className="comment">{comment.text}</div>
                </div>
            ))
        }
        </>

    )
}

export default Comment
