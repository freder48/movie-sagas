import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import axios from 'axios';
import { takeEvery, put } from 'redux-saga/effects';

// Create the rootSaga generator function
function* rootSaga() {
    yield takeEvery('FETCH_MOVIES', fetchMovies);
    yield takeEvery('FETCH_DETAILS', fetchDetails);
    yield takeEvery('FETCH_CATEGORY', fetchCategory);
    yield takeEvery('ADD_MOVIE', addMovie);
}//end rootSaga

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store movies returned from the server
const movies = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        default:
            return state;
    }
}

//used post input information from movieForm
function* addMovie(action) {
    // console.log('index post', action.payload);
    try {
        yield axios.post('/api/movie', action.payload)
        yield put({ type: 'FETCH_MOVIES' })
    } catch (error) {
        console.log('error with add movie request', error);
    }
}//end addMovie

//Getting all of the categories for one specific movie id
function* fetchCategory(action) {
    try {
        const response = yield axios.get(`/api/genre/${action.payload}`)
        yield put({ type: 'SET_GENRES', payload: response.data });
        console.log(response.data);
    } catch (error) {
        console.log('error with genre get request', error);
    }
}//end fetchCategory

//start fetchDetails - GETs all details for specific movie id 
function* fetchDetails(action) {
    try {
        const response = yield axios.get(`/api/movie/${action.payload}`)
        yield put({ type: 'SET_MOVIES', payload: response.data });
    } catch (error) {
        console.log('error with movies get request', error);
    }
}//end fetchDetails

//start fetchMovies GETs ALL movie information
function* fetchMovies() {
    // Move GET request from App.js
    console.log('in fetchMovies saga');
    // Go to server, update redux store with data from server
    try {
        const response = yield axios.get('/api/movie')
        yield put({ type: 'SET_MOVIES', payload: response.data });
    } catch (error) {
        console.log('error with movies get request', error);
    }
}//end fetchMovies

// Used to store the movie genres
const genres = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRES':
            return action.payload;
        default:
            return state;
    }
}

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        movies,
        genres,
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(<Provider store={storeInstance}><App /></Provider>,
    document.getElementById('root'));
registerServiceWorker();
