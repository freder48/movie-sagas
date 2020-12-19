import React, { Component } from 'react';
import { connect } from 'react-redux';
import './movieForm.css';


class movieForm extends Component {
 //local state
  state = {
    movie: {
      title: '',
      poster: '',
      description: '',
      genre_id: '',
    }
  }

  //routes back to home on cancel button
  goToHome = () => {
    this.props.history.push('/')
  }

  //sets local state with values from input boxex
  handleChange = (inputValue, event) => {
    event.preventDefault();
    this.setState({
      movie: {
        ...this.state.movie,
        [inputValue]: event.target.value
      }
    })//end setState
  }//end handleChange

  //on submit button dispatch to saga (index.js) to run post route 
  addMovie = () => {
    this.props.dispatch({ type: 'ADD_MOVIE', payload: this.state })
  }//end addMovie


  render() {
    return (
      <div className="border">
        <form id="colorForm">
          <label >Movie Title:</label>
          <input onChange={(event) => this.handleChange('title', event)} 
          type="text" />

          <label>Poster URL:</label>
          <input onChange={(event) => this.handleChange('poster', event)} 
          type="text" />

          <label>Description:</label>
          <textarea onChange={(event) => this.handleChange('description', event)} />

          <label>Genre:</label>
          <select name="category" id="category" 
          onChange={(event) => this.handleChange('genre_id', event)}>
            <option>Select</option>
            <option value="1">Documentary</option>
            <option value="2">Thriller</option>
            <option value="3">Horror</option>
            <option value="4">Action</option>
            <option value="5">Adventure</option>
            <option value="6">Animated</option>
            <option value="7">Biographical</option>
            <option value="8">Comedy</option>
            <option value="9">Disaster</option>
            <option value="10">Drama</option>
            <option value="11">Epic</option>
            <option value="12">Fantasy</option>
            <option value="13">Musical</option>
            <option value="14">Romantic</option>
            <option value="15">Science Fiction</option>
            <option value="16">Space-Opera</option>
            <option value="17">Superhero</option>

          </select>

          <button className="button" 
          onClick={this.addMovie}>Submit</button>

          <button className="button" 
          onClick={this.goToHome}>Cancel</button>
  
        </form>

      </div>
    );
  }
}

const mapReduxStateToProps = (reduxState) => ({ reduxState });

export default connect(mapReduxStateToProps)(movieForm);