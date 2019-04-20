import React from 'react';
import Item from '../item'
import {shallow, mount} from 'enzyme';

it('renders without crashing', () => {
    shallow(<Item />);
});