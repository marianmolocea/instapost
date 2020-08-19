import React, {useContext, useState, useEffect} from 'react';
import { db } from '../../../firebase'
import { useParams, Redirect, Link } from 'react-router-dom';
import {contextProvider} from '../../context';
import './UserProfile.css';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(14),
    height: theme.spacing(14),
  },
}));

const UserProfile = () => {
  const [userProfilePhoto, setUserProfilePhoto] = useState('')
  const classes = useStyles();
  const { user} = useContext(contextProvider);
  const {username} = useParams();
  
  useEffect(() => {
    if(username){
      db.collection('users').doc(username).get().then(doc => setUserProfilePhoto(doc.data().profilePhoto))
    }
  }, [username])
  
  return (
      <>
      {
        username === user.displayName ?
        <Redirect to="/profile" /> :
        <div className="UserProfile bottom-box-shadow">
            <div className="profile__header">
                <div className="avatar__container">
                    <Avatar className={classes.large} src={userProfilePhoto}/>
                    <h3>{username}</h3>
                </div>
                <div className="information__display">
                  <div className="profile__information">
                      <h4>Posts</h4>
                      <h4>Followers</h4>
                      <h4>Following</h4>
                      <span>20</span>
                      <span>1568</span>
                      <span>479</span>
                  </div>
                </div>
            </div>
            <div className="buttons-container">
            <Button variant="contained" color="primary">follow</Button>
            <Link to={`/profile/${user?.displayName}/chat/${username}`} ><Button variant="contained" color="primary">message</Button></Link>
            </div>
        </div>

      }
      </>
  );
};

export default UserProfile;
