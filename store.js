import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import mainReducer from './reducers/main-reducer'

export default createStore(
    mainReducer,
    applyMiddleware(thunk)
);
