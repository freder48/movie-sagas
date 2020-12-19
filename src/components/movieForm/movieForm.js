import React, { Component } from 'react';
import { connect } from 'react-redux';


class movieForm extends Component {

  state = {
    movie: {
      title: '', 
      poster: '', 
      description: '',
      genre_id: '', 
    }
  }

  goToHome = () => {
    this.props.history.push('/')
  }

  handleChange = (inputValue, event) => {
    event.preventDefault();
    this.setState({
      movie: {
        ...this.state.movie,
        [inputValue]: event.target.value
      }
    })
  }

  addMovie = () => {
    this.props.dispatch({type: 'ADD_MOVIE',payload: this.state})
    this.props.dispatch({type: 'ADD_GENRE',payload: this.state})
  }


  render() {
    return (
      <>
        <h1>movieForm Component</h1>
        <form>
          <label >Movie:</label>
          <input onChange={(event) => this.handleChange('title', event)}type="text" />

          <label>Poster URL:</label>
          <input onChange={(event) => this.handleChange('poster', event)} type="text" />

          <label>Description:</label>
          <textarea onChange={(event) => this.handleChange('description', event)} />

          <select name="category" id="category" onChange={(event) => this.handleChange('genre_id', event)}>
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

          <button onClick={this.addMovie}>Submit</button>
        </form>
        <button onClick={this.goToHome}>Cancel</button>
        
      </>
    );
  }
}

const mapReduxStateToProps = (reduxState) => ({ reduxState });

export default connect(mapReduxStateToProps)(movieForm);