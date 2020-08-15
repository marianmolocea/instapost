import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import NavBar from './frontend/components/NavBar/NavBar'
import './App.scss';
import Feed from './frontend/components/Feed/Feed';
import AddPost from './frontend/components/AddPost/AddPost';
import LandingPage from './frontend/components/LandingPage/LandingPage';

function App() {

  let session = sessionStorage.getItem('login')

  return (
    <Router>
      <div className="App">
        {session && <NavBar />}
        <Route exact path="/" component={session ? Feed : LandingPage} /> 
        <Route exact path="/post" component={AddPost} />
      </div>
    </Router>
  );
}

export default App;
