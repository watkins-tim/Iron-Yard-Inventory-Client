import React from 'react';

import './stylesheets/App.css';
import './stylesheets/landing-header.css';

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
        document.getElementById('login-form').className='login-form-div';
    }
    componentDidMount(){
        document.getElementById('header-container').scrollTop=0;
        let height = window.innerHeight
        || document.documentElement.clientHeight
        || document.body.clientHeight;

        document.getElementById("header-container").style.height = `${height}px`
    }
    render(){

        return(
            <div className='header-container' id='header-container'>
                <button onClick={e=>this.login(e)} className="login-button">Login</button>
                <LoginForm  
                id='login-form' 
                history={this.props.history}/>

                <h1 className='heading-text'>Iron Yard Inventory</h1>
            </div>
        
        )
    }
}

export default LandingHeader;