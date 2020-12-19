import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Detail.css';

class Detail extends Component {

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
                  <p className="genreList">
                    {genre.name}
                  </p>
                )}

                <p>{item.description}</p>
              </div>
            </div>

          )}

        </section>
      </>
    );
  }
}

const mapReduxStateToProps = (reduxState) => ({ reduxState });


export default connect(mapReduxStateToProps)(Detail);