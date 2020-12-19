import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Home.css';

class Home extends Component {

componentDidMount() {
        this.props.dispatch({ type: 'FETCH_MOVIES' });
}

goToDetails = (id) => {
    console.log('Clicked');
    this.props.history.push(`detail/${id}`)
    this.props.dispatch({ type: 'FETCH_DETAILS', payload: id });
    this.props.dispatch({ type: 'FETCH_CATEGORY', payload: id });
}

  render() {
    return (
      <>

        <section className="background">
        
        {this.props.reduxState.movies.map((item) =>
                
                <p className="card" key={item.id}>
                    <img className="imageSize"src={item.poster} alt="Movie Poster"></img>
                    <br></br>
                    <button className="button" onClick={()=> this.goToDetails(item.id)}>{item.title}</button> 
                </p>

        )}
        
        </section>
      </>
    );
  }
}

const mapReduxStateToProps = (reduxState) => ({reduxState});

export default connect(mapReduxStateToProps)(Home);