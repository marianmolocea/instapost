import React from 'react'
import './AddPost.css'
import Dropzone from 'react-dropzone'



const AddPost = () => {
    return (
        <div className="AddPost bottom-box-shadow">
            <div className="drag-drop">
                <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
                    {({getRootProps, getInputProps}) => (
                        <section>
                        <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            <p>Drag 'n' drop some files here, or click to select files</p>
                        </div>
                        </section>
                    )}
                </Dropzone>
            </div>
            <textarea className="caption" placeholder="Caption Here" />
            <button className="add-post">Post</button>
        </div>
    )
}

export default AddPost
