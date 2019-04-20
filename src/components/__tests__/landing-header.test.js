import React from 'react';
import LandingHeader from '../landing-header'
import {shallow, mount} from 'enzyme';

it('renders without crashing', () => {
    shallow(<LandingHeader />);
});