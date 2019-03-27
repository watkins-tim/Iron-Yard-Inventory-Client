import {createStore, combineReducers} from 'redux';
import userReducer from './reducers/userReducer';
import invReducer from './reducers/inventoryReducer';
import { composeWithDevTools } from 'redux-devtools-extension';

import { reducer as formReducer } from 'redux-form';


const reducers = combineReducers({
    form:formReducer,
    userReducer:userReducer,
    invReducer:invReducer
});

const store = createStore(reducers, composeWithDevTools());
//console.log(store.getState())

export default store;