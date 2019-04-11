import React from 'react';
import {connect} from "react-redux";
import {reduxForm, Field} from 'redux-form';
import {required, nonEmpty} from '../validators';

import {login} from '../actions/user-actions';

import './stylesheets/landing-header.css';


import {API_URL} from '../config';

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
                document.getElementById('feedback').innerHTML = 'Incorrect Username or Password'                
            }
            else if(err.status===500){
                document.getElementById('feedback').innerHTML = "Internal Server Error"                
            }
            else{
                document.getElementById('feedback').innerHTML = "Something went wrong."                
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
                            <label htmlFor="username">Username</label>
                            <Field 
                            name="username" 
                            className='input'
                            type="text" 
                            component="input" 
                            required
                            validate={[required, nonEmpty]}/>
                            <label htmlFor="password">Password</label>
                            <Field 
                            name="password" 
                            className='input'
                            type="password" 
                            component="input" 
                            required
                            validate={[required, nonEmpty]}/>
                            <button type="submit">Login</button><br></br>
                            <p className='feedback'
                            id="feedback"
                            ></p> 
                        </form>
                    </div>

                <button className='hide-button' onClick={e=>this.hide(e)} >X</button>
            </div> 
        )
    }
}


export default connect()(reduxForm({form: 'login'})(LoginForm))
