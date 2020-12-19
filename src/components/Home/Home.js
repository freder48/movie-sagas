import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Home.css';

class Home extends Component {

    //start componentDidMount
    componentDidMount() {
        //dispatch to sagas to get all movies on page load
        this.props.dispatch({ type: 'FETCH_MOVIES' });
    }//end componenetDidMount

    //start goToDetails
    goToDetails = (id) => {
        //route to detail page for specific movie id
        this.props.history.push(`detail/${id}`)
        //get specific movie based on id
        this.props.dispatch({ type: 'FETCH_DETAILS', payload: id });
        //get specific genre based on id
        this.props.dispatch({ type: 'FETCH_CATEGORY', payload: id });
    }//end goToDetails

    render() {
        return (
            //Map through movies reducer to get movie info from movies database
            <>

                <section className="background">
                    
                    {this.props.reduxState.movies.map((item) =>

                        <p className="card" key={item.id}>
                            <img className="imageSize" 
                            src={item.poster} 
                            alt={item.title}></img>

                            <button className="button" 
                            onClick={() => this.goToDetails(item.id)}>
                            {item.title}
                            </button>
                        </p>

                    )}

                </section>
            </>
        );
    }
}

const mapReduxStateToProps = (reduxState) => ({ reduxState });

export default connect(mapReduxStateToProps)(Home);