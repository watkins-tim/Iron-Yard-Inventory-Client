
import {LOGIN, login} from '../user-actions';

describe('login', () => {
    it('Should return the action', () => {
        const user = 'testUser';
        const token = 'token'
        const action = login({user:user, authToken:token});
        expect(action.type).toEqual(LOGIN);
        expect(action.token).toEqual(token);
        expect(action.user).toEqual(user);
    });
});