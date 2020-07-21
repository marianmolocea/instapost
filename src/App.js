import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import NavBar from './frontend/components/NavBar/NavBar'
import './App.scss';
import Feed from './frontend/components/Feed/Feed';
import AddPost from './frontend/components/AddPost/AddPost';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Route exact path="/" component={Feed} /> 
        <Route exact path="/post" component={AddPost} />
      </div>
    </Router>
  );
}

export default App;
