import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Search.css';

class Search extends Component {
    //local state
    state = {
        search: '',
    }

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

    //on search button dispatch to fetch_search saga
    searchMovie = () => {
        this.props.dispatch({ type: 'FETCH_SEARCH', payload: this.state.search });
        console.log(this.state.search);
        
        this.setState({ search: '' });
        
    }

    //set local state with input boxes
    handleChange = (event) => {
        this.setState({
            search: event.target.value
        })
    }

    render() {
        return (
            //Map through movies reducer to get movie info from movies database
            <>

                <section className="background">
                    <section className="searchContainer">
                    <input value={this.state.search} onChange={this.handleChange} className="homeInput" type="text" />
                    <button className="button homeBtn" onClick={this.searchMovie}>Search</button>
                    </section>
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

export default connect(mapReduxStateToProps)(Search);