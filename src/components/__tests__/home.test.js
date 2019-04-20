import React from 'react';
import Home from '../home'
import {shallow, mount} from 'enzyme';

it('renders without crashing', () => {
    shallow(<Home />);
});
