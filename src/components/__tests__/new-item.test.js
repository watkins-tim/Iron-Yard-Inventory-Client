import React from 'react';
import NewItem from '../new-item'
import {shallow, mount} from 'enzyme';

it('renders without crashing', () => {
    shallow(<NewItem />);
});