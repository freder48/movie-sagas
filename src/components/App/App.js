import React, { Component } from 'react';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';
import Home from '../Home/Home';
import Detail from '../Detail/Detail';
import movieForm from '../movieForm/movieForm';
import Edit from '../Edit/Edit';
import Search from '../Search/Search';

class App extends Component {
  // Renders the entire app on the DOM
  render() {
    return (
      <div className="App">
        <header className="appHeader">
          <h1>Cinema</h1>
        </header>

        <Router>
          
          <nav className="navBar">
            <li><Link to="/">Movie List</Link></li>
            <li><Link to="/form">Add Movie</Link></li>
            <li><Link to="/search">Search</Link></li>
          </nav>

          <Route exact path="/" component={Home} />
          <Route path="/detail/:id" component={Detail} />
          <Route path="/form" component={movieForm} />
          <Route path="/edit" component={Edit} />
          <Route path="/search" component={Search} />

        </Router>
      </div>
    );
  }
}

export default App;
