import React from 'react';

import './stylesheets/App.css';
import './stylesheets/landing-header.css';

import LoginForm from './loginForm';

class LandingHeader extends React.Component{
    constructor(props){
        super(props)
        if (localStorage.getItem('token')){
            this.state={
                loggedIn:true
            }
        }
        this.headerContainer=React.createRef();
    }
    login(e){
        document.getElementById('login-form').className='login-form-div';
    }
    componentDidMount(){
        document.getElementById('header-container').scrollTop = '0';
        let height = window.innerHeight
        || document.documentElement.clientHeight
        || document.body.clientHeight;

        document.getElementById("header-container").style.height = `${height}px`
    }
    render(){

        return(
            <div className='header-container' id='header-container' ref={this.headerContainer}>
                <button onClick={e=>this.login(e)} className="login-button">Login</button>
                <LoginForm  
                id='login-form' 
                history={this.props.history}/>

                <h1 className='heading-text'>Iron Yard Inventory</h1>
                <hr className="line-1"></hr>
                <h2 className='heading-subtext'>An Inventory Auditing Application for Steel Fabricators, Mills, and Service Centers</h2>

            </div>
        
        )
    }
}

export default LandingHeader;