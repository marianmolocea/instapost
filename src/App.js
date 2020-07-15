import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import NavBar from './frontend/components/NavBar/NavBar'
import './App.scss';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
      </div>
      <Route exact path="/post" component="" />
    </Router>
  );
}

export default App;
