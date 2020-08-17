import React, {useState, useEffect} from 'react';
import {useDropzone} from 'react-dropzone'
import './PostPreview.css'

const PostPreview = ({uploadImage, completed}) => {

  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
      
    },
    multiple: false,
  });
  
  const thumbs = files.map((file) => (
    <div className="thumb" key={file.name}>
      <div className="thumbInner">
        <img src={file.preview} className="img" />
      </div>
    </div>
  ));

  useEffect(() => {
    uploadImage(files[0]);
  }, [files, uploadImage])

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  useEffect(() => {
    completed && setFiles([])
  }, [completed, setFiles])

  return (
    <section className="PostPreview">
      <div {...getRootProps({ className: 'previews' })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop images here, or click to select images</p>
      </div>
      <aside className="thumbsContainer">{thumbs}</aside>
    </section>
  );
};

export default PostPreview;
