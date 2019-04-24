import React from 'react';
import {connect} from "react-redux";
import {reduxForm, Field} from 'redux-form';
import {required, nonEmpty} from '../validators';

import {login} from '../actions/user-actions';

import './stylesheets/landing-header.css';


import {API_URL} from '../config';
console.log(API_URL);
export class LoginForm extends React.Component{
    onSubmit(values){
        fetch(`${API_URL}/api/auth/login`,{
            method:'POST',
            body:JSON.stringify(values),
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then(res=>{
            if(!(res.status === 200)){
                return Promise.reject({
                    status:res.status,
                });
            }
            return res.json()
        })
        .then(res=>{
            this.props.dispatch(login(res));
            this.props.history.push('/inventory');
        })
        .catch(err=>{
            document.getElementById('login-form').style.height="auto";
            if (err.status===401){
                document.getElementById('feedback-login').innerHTML = 'Incorrect Username or Password'                
            }
            else if(err.status===500){
                document.getElementById('feedback-login').innerHTML = "Internal Server Error"                
            }
            else{
                document.getElementById('feedback-login').innerHTML = "Something went wrong."                
            }
        })

    }

    hide(e){
        document.getElementById('login-form').className="login-form-div collapsed";
    }
    render(){
        return(
            <div id='login-form'
            className="login-form-div collapsed">
                <div>
                        <form
                            onSubmit={this.props.handleSubmit(values=>
                                this.onSubmit(values)
                                )}>
                            <label htmlFor="username">Username
                                <Field 
                                name="username" 
                                className='input'
                                type="text" 
                                component="input" 
                                required
                                validate={[required, nonEmpty]}/>
                            </label>
                            <label htmlFor="password"> Password
                                <Field 
                                name="password" 
                                className='input'
                                type="password" 
                                component="input" 
                                required
                                validate={[required, nonEmpty]}/>
                            </label>
                            <p className="sample-login">Sample Login -- Username: testUser  Password: password123</p>
                            <button type="submit" className='login-submit-button'>Login</button><br></br>
                            <p className='feedback'
                            id="feedback-login"
                            ></p> 
                        </form>
                    </div>

                <button className='hide-button' onClick={e=>this.hide(e)} >X</button>
            </div> 
        )
    }
}


export default connect()(reduxForm({form: 'login'})(LoginForm))
