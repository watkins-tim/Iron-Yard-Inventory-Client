import React from 'react';

import './stylesheets/App.css'
import './stylesheets/info-section.css'

import SignupForm from './signupForm';


class InfoSection extends React.Component{
    constructor (props){
        super(props)
        this.state={signup:false}
    }

    render(){
        let entryDiv;
        if (this.state.signup){
            entryDiv = <SignupForm history={this.props.history}/>
        } 

        return(
            <div className='info-container'>
            
                <h2 className='info-text'>Info</h2>
                <p>This is where the purpose and feature information will go</p>
            </div>
        )
    }
}
export default InfoSection