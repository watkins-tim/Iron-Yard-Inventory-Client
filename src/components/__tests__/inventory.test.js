import React from 'react';
import Inventory from '../inventory'
import {shallow, mount} from 'enzyme';

it('renders without crashing', () => {
    shallow(<Inventory />);
});