export const LOGIN = 'LOGIN';
export const login = values => ({
    type: LOGIN,
    token:values.authToken,
    user:values.user
});

export const SIGNUP = 'SIGNUP';
export const signup = values => ({
    type: SIGNUP,
    user:values.user
});