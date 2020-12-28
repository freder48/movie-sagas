import React, { Component } from 'react';
import './Edit.css';
import { connect } from 'react-redux';

class Edit extends Component {
componenentDidMount = () => {
    this.props.dispatch({ type: 'FETCH_DETAILS', payload: this.props.match.params.id });
    this.props.dispatch({ type: 'FETCH_CATEGORY', payload: this.props.match.params.id });
    
}

goToDetails = (id) => {
        
        this.props.history.push(`/detail/${id}`)
    }

//sets local state with values from input boxex
  handleChange = (inputValue, event) => {
    let updatedMovie = {
        ...this.props.reduxState.movies[0], [inputValue]: event.target.value
    }
    this.props.dispatch({type: 'SET_MOVIES', payload: [updatedMovie]})
    console.log('Updated movie is', updatedMovie);
    
  }//end handleChange

updateDetails = (event, id) => {
    this.props.dispatch({type: 'UPDATE_MOVIE', payload: this.props.reduxState.movies[0]})
    this.props.dispatch({ type: 'FETCH_DETAILS', payload: id });
    this.props.dispatch({ type: 'FETCH_CATEGORY', payload: id });
    this.props.history.push(`/detail/:id`)
    }

    render() {
        
        return (
            <div className="border editContainer">
                     {this.props.reduxState.movies.map((movie) =>
        
               <form key={movie.id}>
                    <label className="editLabel">Edit {movie.title}'s Title:</label>
                    <input className="editInput"type="text" value={this.props.reduxState.movies[0].title}
                    onChange={(event) => this.handleChange('title', event)}/>

                    <label className="editLabel">Edit Description:</label>
                    <textarea value={this.props.reduxState.movies[0].description} 
                    className="editInput" 
                    onChange={(event) => this.handleChange('description', event)} />
                
                <section>
                    <button className="button editBtn"
                        onClick={() => this.goToDetails(movie.id)}>
                        Cancel
                  </button>
                    <button onClick={(event) => this.updateDetails(event, movie.id)}className="button editBtn">
                        Save
                  </button>
                </section>

            </form>
                     )}
            </div>
        );
    }
}

const mapReduxStateToProps = (reduxState) => ({ reduxState });

export default connect(mapReduxStateToProps)(Edit);