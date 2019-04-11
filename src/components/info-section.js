import React from 'react';

import './stylesheets/info-section.css';

import SignupForm from './signupForm';


class InfoSection extends React.Component{


    showSignup(e){
        document.getElementById('signup-form-div').className='signup-form-div';
    }

    render(){
        return(
            <div className='info-container'>
            
                <h2 className='info-text'>Info</h2>
                <p>This is where the purpose and feature information will go</p>
                <button onClick={e=>this.showSignup(e)}>Signup</button>
                <SignupForm />
            </div>
        )
    }
}
export default InfoSection