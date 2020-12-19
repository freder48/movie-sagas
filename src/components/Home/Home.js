import React, { Component } from 'react';
import { connect } from 'react-redux';

class Home extends Component {

componentDidMount() {
        this.props.dispatch({ type: 'FETCH_MOVIES' });
}

goToDetails = (id) => {
    console.log('Clicked');
    this.props.history.push(`detail/${id}`)
    this.props.dispatch({ type: 'FETCH_DETAILS', payload: id });
}

  render() {
    return (
      <>

        <section>

        
        {this.props.reduxState.movies.map((item) =>
                
                <p key={item.id}>
                    <img src={item.poster} alt="Movie Poster"></img>
                    <br></br>
                    <button onClick={()=> this.goToDetails(item.id)}>{item.title}</button> 
                </p>

        )}
        
        </section>
      </>
    );
  }
}

const mapReduxStateToProps = (reduxState) => ({reduxState});

export default connect(mapReduxStateToProps)(Home);