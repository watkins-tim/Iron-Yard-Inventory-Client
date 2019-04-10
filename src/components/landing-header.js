import React from 'react';

import './stylesheets/App.css'
import './stylesheets/landing-header.css'

import LoginForm from './loginForm';

class LandingHeader extends React.Component{
    constructor(props){
        super(props)
        if (localStorage.getItem('token')){
            this.setState({},{
                loggedIn:true
            })
        }

    }
    login(e){
        document.getElementById('login-form').style.height='50px';
    }
    render(){

        return(
            <div className='header-container'>
                <button onClick={e=>this.login(e)} className="login-button">Login</button>
                <LoginForm  id='login-form'history={this.props.history}/>
                <h1 className='heading-text'>Iron Yard Inventory</h1>
            </div>
        
        )
    }
}

export default LandingHeader;