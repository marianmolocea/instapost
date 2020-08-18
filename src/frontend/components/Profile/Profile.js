import React, {useContext, useState} from 'react';
import { auth, storage } from '../../../firebase'
import { Redirect } from 'react-router-dom';
import {contextProvider} from '../../context';
import './Profile.css';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Button } from '@material-ui/core';
import {AiFillPlusCircle } from 'react-icons/ai'

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(16),
    height: theme.spacing(16),
  },
}));

const Profile = () => {
  const classes = useStyles();
  const {session} = useContext(contextProvider);
  const [progress, setProgress] = useState(0);
  const {user, profilePicture, setProfilePicture} = useContext(contextProvider);
  
  const handleUpload = (image) => {
    const uploadTask = storage.ref(`profiles/${image.name}`).put(image);
  
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
              .ref('profiles')
              .child(image.name)
              .getDownloadURL()
              .then((url) => {
                user.updateProfile({
                  photoURL: url
                });
                setProfilePicture(url)
              })
      })
  }
  
  const handleChange = (e) => {
    if ( e.target.files[0] ) {
      handleUpload(e.target.files[0]);
    }
  }
  
  return (
    <>
    {
      !session ? 
        <Redirect to="/" />
        :
        <div className="Profile bottom-box-shadow">
          <div className="profile__header">
            <div className="avatar__container">
              <Avatar className={classes.large} src={profilePicture}/>
              <label className="avatar-upload__label">
                <input 
                  type="file" 
                  className="add-avatar-image"
                  multiple={false}
                  onChange={handleChange}
                />
                <AiFillPlusCircle fill="#fb3958" size="32px" className="plus__btn" />
              </label>
                
            </div>
            <div className="profile__information">
                <h4>Posts</h4>
                <h4>Followers</h4>
                <h4>Following</h4>
                <span>20</span>
                <span>1568</span>
                <span>479</span>
            </div>
          </div>
          <div className="buttons-container">
            <Button variant="contained" color="primary">follow</Button>
            <Button variant="contained" color="primary">message</Button>
            <Button onClick={() => auth.signOut()} variant="outlined" color="secondary" className="profile__logout">Logout</Button>
          </div>
        </div>
    }
    </>
  );
};

export default Profile;
