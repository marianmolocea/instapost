import React, {useContext} from 'react';
import './Profile.css';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Button } from '@material-ui/core';
import { auth } from '../../../firebase'
import { Redirect } from 'react-router-dom';
import {contextProvider} from '../../context'

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(16),
    height: theme.spacing(16),
  },
}));

const Profile = () => {
  const classes = useStyles();
  const {session} = useContext(contextProvider);

  return (
    <>
    {
      !session ? 
        <Redirect to="/" />
        :
        <div className="Profile bottom-box-shadow">
          <div className="profile__header">
            <Avatar className={classes.large} />
            <div className="profile__information">
                <h4>Posts</h4>
                <h4>Followers</h4>
                <h4>Following</h4>
                <span>20</span>
                <span>1568</span>
                <span>479</span>
            </div>
          </div>
          <Button onClick={() => auth.signOut()} variant="outlined" color="secondary" className="profile__logout">Logout</Button>
        </div>
    }
    </>
  );
};

export default Profile;
