import React from 'react';
import ItemContainer from '../item-container'
import {shallow, mount} from 'enzyme';

it('renders without crashing', () => {
    shallow(<ItemContainer />);
});