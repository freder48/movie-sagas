import React, { Component } from 'react';
import {HashRouter as Router, Route, Link} from 'react-router-dom';
import './App.css';
import Home from '../Home/Home'
import Detail from '../Detail/Detail'
import movieForm from '../movieForm/movieForm'

class App extends Component {
  // Renders the entire app on the DOM
  render() {
    return (
      <div className="App">
        <h1>Movies!</h1>
        <Router>
          <nav>
            <Link to="/">Home</Link>
          </nav>



          <Route exact path="/" component={Home}/>
          <Route path="/detail" component={Detail}/>
          <Route path="/form" component={movieForm}/>
          
        </Router>
        <p>Empty Page</p>
      </div>
    );
  }
}

export default App;
