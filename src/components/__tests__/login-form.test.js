import React from 'react';
import LoginForm from '../loginForm'
import {shallow, mount} from 'enzyme';

it('renders without crashing', () => {
    shallow(<LoginForm />);
});