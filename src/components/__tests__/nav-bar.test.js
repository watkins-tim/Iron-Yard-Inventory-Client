import React from 'react';
import NavBar from '../nav-bar'
import {shallow, mount} from 'enzyme';

it('renders without crashing', () => {
    shallow(<NavBar />);
});