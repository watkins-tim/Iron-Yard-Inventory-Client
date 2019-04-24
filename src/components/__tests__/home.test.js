import React from 'react';
import Home from '../home'
import {shallow, mount} from 'enzyme';

it('renders without crashing', () => {
    const wrapper = shallow(<Home />);
    expect(wrapper.hasClass('home-container')).toEqual(true);

});
