import React from 'react';
import InfoSection from '../info-section'
import {shallow, mount} from 'enzyme';

it('renders without crashing', () => {
    const wrapper = shallow(<InfoSection />);
});