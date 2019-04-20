import React from 'react';
import SignupForm from '../signupForm'
import {shallow, mount} from 'enzyme';

it('renders without crashing', () => {
    shallow(<SignupForm />);
});