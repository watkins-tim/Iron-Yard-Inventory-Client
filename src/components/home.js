import React from 'react';
import LandingHeader from './landing-header';
import InfoSection from './info-section';
import SignupForm from './signupForm';
import LoginForm from './loginForm';



export default function Home(props){
    return(
        <div className='home-container'>
            <LandingHeader />
            <InfoSection />
            <LoginForm history={props.history}/>
            <SignupForm />
        </div>
    )
};
