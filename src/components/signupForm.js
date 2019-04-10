import React from 'react';
import {connect} from "react-redux";
import {reduxForm, Field} from 'redux-form';


import {login} from '../actions/user-actions'

import {API_URL} from '../config'

export class SignupForm extends React.Component{
    goToInventory() {
        this.props.history.push('/inventory');
    }
    
    onSubmit(values){
        const postVals = values;
        delete postVals.confirmPass;
        console.log(postVals);

        return fetch(`${API_URL}/api/user/`,{
            method:'POST',
            body:JSON.stringify(postVals),
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then(res=>{
            if(!(res.status===201)){
                Promise.reject({
                    code:res.status,
                });
            }
            return fetch(`${API_URL}/api/auth/login`,{
                method:'POST',
                body:JSON.stringify({username:values.username,password:values.password}),
                headers:{
                    'Content-Type':'application/json'
                }
            })
            .then(res=>res.json())
            .then(res=>{
                //console.log(res);
                if(!(res.status===200)){
                    Promise.reject({
                        code:res.status
                    });
                }
                this.props.dispatch(login(res));
                this.goToInventory();
            })
            .catch(err=>console.log(err))
        })
        .catch(err=>console.log(err))
    }

    render(){
        return(
            <form
                onSubmit={this.props.handleSubmit(values=>
                    this.onSubmit(values)
                    )}>
                <label htmlFor="firstName">First Name</label>
                <Field name="firstName" id="firstName" type="text" component="input" />
                <label htmlFor="lastName">Last Name</label>
                <Field name="lastName" id="lastName" type="text" component="input" />
                <label htmlFor="username">Username</label>
                <Field name="username" id="username" type="text" component="input" />
                <label htmlFor="password">Password</label>
                <Field name="password" id="password" type="text" component="input" />
                <label htmlFor="confirmPass">Confirm Password</label>
                <Field name="confirmPass" id="confirmPas" type="text" component="input" />
                <label htmlFor="companyID">Company ID</label>
                <Field name="companyID" id="companyID" type="text" component="input" />
                <button type="submit">Signup</button>
            </form>
        )
    }
}


export default connect()(reduxForm({form: 'signup'})(SignupForm))
