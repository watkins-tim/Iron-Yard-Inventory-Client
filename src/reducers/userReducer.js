import {LOGIN} from '../actions/user-actions';

const initialState = {
    authToken: "",
    user:{}
};

export default(state=initialState, action)=>{
    if (action.type === LOGIN){
        //console.log(action.token);
        localStorage.setItem('token', action.token)
        return Object.assign({}, state, {
            authToken: action.token,
            user:action.user
        });
    }
    return state;

};

