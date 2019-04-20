import React from 'react';
import LandingHeader from './landing-header';
import InfoSection from './info-section';

import './stylesheets/App.css'



export default function Home(props){
    return(
        <div className='home-container'>
            <LandingHeader history={props.history}/>
            <InfoSection history={props.history}/>
        </div>
    )
};
