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
    yield takeEvery('FETCH_MOVIES', fetchMovies)
    yield takeEvery('FETCH_DETAILS', fetchDetails)
}

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

//start fetchMovies GET
function* fetchDetails(action) {
    try { 
        const response = yield axios.get(`/api/movie/${action.payload}`)
        // inside a saga, use 'put' to dispatch an action (no props)
        // This is SET - update the redux store
        // DON'T do another FETCH or you'll get an infinite loop
        yield put ({ type: 'SET_MOVIES', payload: response.data});
    } catch (error) {
        console.log('error with movies get request', error);
    }
}//end fetchMovies

//start fetchMovies GET
function* fetchMovies() {
    // Move GET request from App.js
    console.log('in fetchMovies saga');
    // Go to server, update redux store with data from server
    try { 
        const response = yield axios.get('/api/movie')
        // inside a saga, use 'put' to dispatch an action (no props)
        // This is SET - update the redux store
        // DON'T do another FETCH or you'll get an infinite loop
        yield put ({ type: 'SET_MOVIES', payload: response.data});
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
