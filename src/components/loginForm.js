import React from 'react';
import {connect} from "react-redux";
import {reduxForm, Field} from 'redux-form';
import {required, nonEmpty} from '../validators';

import {login} from '../actions/user-actions';

import './stylesheets/landing-header.css'

import {API_URL} from '../config'

export class LoginForm extends React.Component{
    onSubmit(values){
        //console.log(values);
        fetch(`${API_URL}/api/auth/login`,{
            method:'POST',
            body:JSON.stringify(values),
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then(res=>{
            if(!res.status === 200){
                Promise.reject({
                });
            }
            return res.json()
        })
        .then(res=>{
            //console.log(res);

            this.props.dispatch(login(res));

            this.props.history.push('/inventory');

        })
        .catch(err=>console.log(err))

    }
    render(){
        return(
            <div
            className="login-form-div">
                <form
                    onSubmit={this.props.handleSubmit(values=>
                        this.onSubmit(values)
                        )}>
                    <label htmlFor="username">Username</label>
                    <Field 
                    name="username" 
                    id="username" 
                    type="text" 
                    component="input" 
                    validate={[required, nonEmpty]}/>
                    <label htmlFor="password">Password</label>
                    <Field 
                    name="password" 
                    id="password" 
                    type="text" 
                    component="input" 
                    validate={[required, nonEmpty]}/>
                    <button type="submit">Login</button>
                </form>
            </div>
        )
    }
}


export default connect()(reduxForm({form: 'login'})(LoginForm))
