import React, { Component } from 'react';
import './Edit.css';
import { connect } from 'react-redux';

class Edit extends Component {

state = {
    movie: {
        title: '', 
        description: '',
        }
    }

goToDetails = (id) => {
        this.props.history.push(`/detail/:id`)
    }

//sets local state with values from input boxex
  handleChange = (inputValue, event) => {
    this.setState({
      movie: {
        ...this.state.movie,
        [inputValue]: event.target.value
       
      }
     
    })//end setState
  }//end handleChange

updateDetails = (id) => {
    this.props.dispatch({type: 'FETCH_DETAILS', payload: id})
   
}

    render() {
        return (
            <div className="border editContainer">
                     {this.props.reduxState.movies.map((movie) =>
        
               <form key={movie.id}>
            
                    <label className="editLabel">Edit {movie.title}'s Title:</label>
                    <input className="editInput"type="text" />
                    <label className="editLabel">Edit Description:</label>
                    <textarea className="editInput" onChange={(event) => this.handleChange('description', event)} />
                

                <section>
                    <button className="button editBtn"
                        onClick={this.goToDetails}>
                        Cancel
                  </button>
                    <button onClick={this.updateDetails}className="button editBtn">
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