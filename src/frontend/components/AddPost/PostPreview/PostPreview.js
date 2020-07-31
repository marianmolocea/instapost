import React, {useState, useEffect} from 'react';
import {useDropzone} from 'react-dropzone'
import './PostPreview.css'

const PostPreview = () => {

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
  });

  const thumbs = files.map((file) => (
    <div className="thumb" key={file.name}>
      <div className="thumbInner">
        <img src={file.preview} className="img" />
      </div>
    </div>
  ));

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  return (
    <section className="PostPreview">
      <div {...getRootProps({ className: 'PostPreview' })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <aside className="thumbsContainer">{thumbs}</aside>
    </section>
  );
};

export default PostPreview;
