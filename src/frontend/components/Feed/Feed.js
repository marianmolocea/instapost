import React, { useEffect, useState } from 'react'
import data from './posts.json'
import PostView from '../PostView/PostView'
import { db } from '../../../firebase';

const Feed = () => {

    const [posts, setPosts] = useState([])

    useEffect(()=> {
        db.collection('posts').onSnapshot(snapshot => {
            setPosts(snapshot.docs.map(doc => ({id: doc.id, post: doc.data()})))
        });
    }, [])

    return (
        <div className="Feed">
            {
                posts.map(({id, post}) => <PostView key={id} username={post.username} imageUrl={post.imageUrl} likeNumber={post.likesNumber} caption={post.caption} />)
            }
        </div>
    )
}

export default Feed
