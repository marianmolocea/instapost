import React from 'react'
import data from './posts.json'
import PostView from '../PostView/PostView'

const Feed = () => {
    return (
        <div className="Feed">
            {
                data.map(item => <PostView userName={item.userName} image={item.image} likeNumber={item.likesNumber} caption={item.caption} />)
            }
        </div>
    )
}

export default Feed
