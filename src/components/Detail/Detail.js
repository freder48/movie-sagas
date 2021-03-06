import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Detail.css';

class Detail extends Component {

  componentDidMount = (id) => {
    this.props.dispatch({type: 'FETCH_DETAILS', payload: this.props.match.params.id})
    this.props.dispatch({type: 'FETCH_CATEGORY', payload: this.props.match.params.id })
  }

  goToEdit = (id) => {
    // this.props.dispatch({type: 'GET_INPUTS', payload: item })
    this.props.dispatch({type: 'FETCH_DETAILS', payload: id})
    this.props.dispatch({type: 'FETCH_CATEGORY', payload: id})
  
    this.props.history.push('/edit')
  }

  render() {

    return (
      <>
        <section className="containerAll">

          {this.props.reduxState.movies.map((item) =>

            <div className="size" key={item.id}>

              <img className="poster" src={item.poster} alt={item.title}></img>
              <div className="container">
                <h3>{item.title}</h3>
                <br></br>

                {this.props.reduxState.genres.map((genre) =>
                  <p key={genre.name}className="genreList">
                    {genre.name}
                  </p>
                )}

                <p>{item.description}</p>
              </div>
              <button 
              className="button"
              onClick={() => this.goToEdit(item.id)}>Edit</button>
            </div>

          )}

        </section>
      </>
    );
  }
}

const mapReduxStateToProps = (reduxState) => ({ reduxState });


export default connect(mapReduxStateToProps)(Detail);