import React, {useContext, useState, useEffect} from 'react';
import firebase from 'firebase';
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
  const [peerProfilePhoto, setPeerProfilePhoto] = useState('')
  const classes = useStyles();
  const { user} = useContext(contextProvider);
  const {peer} = useParams();

  const handleMessageClick = async () => {
    await db
      .collection('users')
      .doc(user.displayName)
      .collection('conversations')
      .doc(peer)
      .set({
          profilePhoto: await db.collection('users').doc(peer).get().then(doc => doc.data().profilePhoto)
      });

    await db
      .collection('users')
      .doc(peer)
      .collection('conversations')
      .doc(user.displayName)
      .set({
          profilePhoto: await db.collection('users').doc(peer).get().then(doc => doc.data().profilePhoto)
      })
  }
  
  useEffect(() => {
    if(peer){
      db.collection('users').doc(peer).get().then(doc => setPeerProfilePhoto(doc.data().profilePhoto));
    }
  }, [peer])
  
  return (
      <>
      {
        peer === user.displayName ?
        <Redirect to="/profile" /> :
        <div className="UserProfile bottom-box-shadow">
            <div className="profile__header">
                <div className="avatar__container">
                    <Avatar className={classes.large} src={peerProfilePhoto}/>
                    <h3>{peer}</h3>
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
            <Link to={`/profile/${user?.displayName}/chat/${peer}`}><Button variant="contained" color="primary" onClick={() => handleMessageClick()}>message</Button></Link>
            </div>
        </div>

      }
      </>
  );
};

export default UserProfile;
