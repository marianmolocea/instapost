import React, { useEffect, useState, useContext } from 'react'
import PostView from '../PostView/PostView'
import { db } from '../../../firebase';
import { contextProvider } from '../../context';

const Feed = () => {

    const [posts, setPosts] = useState([])
    const {user} = useContext(contextProvider)

    useEffect(()=> {
        const unsubscribe = db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
            setPosts(snapshot.docs.map(doc => ({id: doc.id, post: doc.data()})))
        });
        return () => {
            unsubscribe();
        }
    }, [])

    return (
        <div className="Feed">
            {
                posts.map(({id, post}) => <PostView key={id} postId={id} user={user} username={post.username} imageUrl={post.imageUrl} caption={post.caption} profilePhoto={post.profilePhoto}/>)
            }
        </div>
    )
}

export default Feed
