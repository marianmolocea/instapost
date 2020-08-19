import React, { useContext } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NavBar from './frontend/components/NavBar/NavBar';
import './App.scss';
import Feed from './frontend/components/Feed/Feed';
import AddPost from './frontend/components/AddPost/AddPost';
import LandingPage from './frontend/components/LandingPage/LandingPage';
import Profile from './frontend/components/Profile/Profile';
import { contextProvider } from './frontend/context';
import CircularProgress from '@material-ui/core/CircularProgress';
import UserProfile from './frontend/components/UserProfile/UserProfile';
import Chat from './frontend/components/Chat/Chat';
import ChatRoom from './frontend/components/Chat/ChatRoom/ChatRoom';

function App() {
  const { session, isLoading } = useContext(contextProvider);

  return (
    <Router>
      <div className="App">
        {session ? (
          <>
            <NavBar />
            <Route exact path="/" component={Feed} />
            <Route exact path="/post" component={AddPost} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/profile/:username" component={UserProfile} />
            <Route exact path="/profile/:username/chat" component={Chat} />
            <Route exact path="/profile/:username/chat/:peer" component={ChatRoom} />
          </>
        ) : isLoading ? (
          <CircularProgress className="spinner"/>
          ) : (
          <LandingPage />
        )}
      </div>
    </Router>
  );
}

export default App;
