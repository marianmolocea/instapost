import React, { useState, useContext } from 'react';
import './AddPost.css';
import PostPreview from './PostPreview/PostPreview';
import { Button } from '@material-ui/core';
import {storage, db} from '../../../firebase';
import firebase from "firebase";
import {contextProvider} from '../../context'


const AddPost = () => {
    const [image, setImage] = useState(null);
    const [caption, setCaption] = useState('');
    const [progress, setProgress] = useState(0);
    const [completeUpload, setCompleteUpload] = useState(false);

    const {user} = useContext(contextProvider);

    const handleImageUpload = (imageData) => {
        setImage(imageData)
    }

    const uploadHandler = async () => {
        try {
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
    
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                // progress function
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                setProgress(progress);
            
            },
            (err) => {
                // Error function
                console.log(err);
            },
            () => {
                // complete function 
                storage
                    .ref('images')
                    .child(image.name)
                    .getDownloadURL()
                    .then((url) => {
                        db.collection('posts').add({
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            caption: caption,
                            imageUrl: url,
                            username: user.displayName
                        });
                        setProgress(0);
                        setCaption('');
                        setImage(null);
                        setCompleteUpload(true);
                    })
            }
        );
        setCompleteUpload(false)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="AddPost bottom-box-shadow">
            <PostPreview uploadImage={handleImageUpload} completed={completeUpload}/>
            <textarea className="caption" placeholder="Caption Here" value={caption} onChange={e => setCaption(e.target.value)}/>
            { progress === 0 ? "" : <progress value={progress} max="100" /> }
            <Button 
                disabled={completeUpload}
                variant="outlined"
                onClick={uploadHandler}
            >Post</Button>
        </div>
    )
}

export default AddPost
