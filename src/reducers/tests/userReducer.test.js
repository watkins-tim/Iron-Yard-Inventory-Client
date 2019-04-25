import userReducer from '../userReducer';
import {login, LOGIN} from '../../actions/user-actions'

describe('login', () => {
    it('Should login user', () => {
        let state = {
        };
        const user = 'testUser';
        const token = 'token';
        state = userReducer(state, login({user:user, authToken:token}));

        expect(state).toEqual({
            user:user,
            authToken:token
        });
    });
});