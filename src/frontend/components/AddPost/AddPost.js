import React, { useState } from 'react'
import './AddPost.css'
import Dropzone from 'react-dropzone'
import PostPreview from './PostPreview/PostPreview';



const AddPost = () => {
    const [image, setImage] = useState(null);

    const handleOnDrop = (acceptedFiles, rejectedFiles) => {
        
        if(acceptedFiles && acceptedFiles.length > 0) {
            const currentFile = acceptedFiles[0];
            const myFileReader = new FileReader();
            myFileReader.addEventListener('load', () => {
                setImage(myFileReader.result)
            });
           myFileReader.readAsDataURL(currentFile);
        } else {
            console.log('Nothing happened', rejectedFiles, acceptedFiles)
        }
    }

    return (
        <div className="AddPost bottom-box-shadow">
            <div className="drag-drop">
{/*                 <Dropzone onDrop={handleOnDrop} accept='image/*' style={{height: '100%'}}>
                    {({getRootProps, getInputProps}) => (
                        <section>
                        <div {...getRootProps()} >
                            <input {...getInputProps()} />
                            <p >Drag 'n' drop some files here, or click to select files</p>
                        </div>
                        </section>
                    )}
                </Dropzone> */}
                <PostPreview />
            </div>
            <textarea className="caption" placeholder="Caption Here" />
            <button className="add-post">Post</button>
        </div>
    )
}

export default AddPost
