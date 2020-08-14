import React, { useEffect, useState } from 'react'
import data from './posts.json'
import PostView from '../PostView/PostView'
import { db } from '../../../firebase';

const Feed = () => {

    const [posts, setPosts] = useState([])

    useEffect(()=> {
        db.collection('posts').onSnapshot(snapshot => {
            setPosts(snapshot.docs.map(doc => doc.data()))
        });
    }, [])

    return (
        <div className="Feed">
            {
                posts.map(item => <PostView key={item.id} username={item.username} imageUrl={item.imageUrl} likeNumber={item.likesNumber} caption={item.caption} />)
            }
        </div>
    )
}

export default Feed
