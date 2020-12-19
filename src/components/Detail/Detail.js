import React, { Component } from 'react';
import { connect } from 'react-redux';


class Detail extends Component {
  
  render() {
   
    return (
      <>
        <h1>Detail Component</h1>
        <section>
        
        {this.props.reduxState.movies.map((item) =>
                
                <p key={item.id}>

                    <img src={item.poster} alt={item.title}></img>
                    <br></br>
                    {item.title} 
                    <br></br>
                    {item.description}
                </p>

        )}

        {this.props.reduxState.genres.map((genre) => 
          <p>
              {genre.name}

          </p>
        )}

        </section>
      </>
    );
  }
}

const mapReduxStateToProps = (reduxState) => ({reduxState});
  

export default connect(mapReduxStateToProps)(Detail);