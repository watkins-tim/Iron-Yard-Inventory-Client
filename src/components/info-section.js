import React from 'react';

import './stylesheets/App.css'
import './stylesheets/info-section.css'

export default function InfoSection(props){
    return(
        <div className='info-container'>
            <h2 className='info-text'>Info</h2>
            <p>This is where the purpose and feature information will go</p>
        </div>
    )
};