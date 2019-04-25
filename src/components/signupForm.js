import React from 'react';
import {connect} from "react-redux";
import {reduxForm, Field} from 'redux-form';


import {login} from '../actions/user-actions'

import {API_URL} from '../config';export class SignupForm extends React.Component{
    goToInventory() {
        this.props.history.push('/inventory');
    }
    
    onSubmit(values){
        const postVals = Object.assign({}, values);
        if (values.password === values.confirmPass){
            delete postVals.confirmPass;
        
            return fetch(`${API_URL}/api/user/`,{
                method:'POST',
                body:JSON.stringify(postVals),
                headers:{
                    'Content-Type':'application/json'
                }
            })
            .then(res=>{
                if(!(res.status===201)){
                    return Promise.reject({
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
            })
            .then(res=>{
                if(!(res.status===200)){
                    return Promise.reject({
                        code:res.status
                    });
                }
                return res.json()
            })
                .then(res=>{
                    //console.log(res);

                    this.props.dispatch(login(res));
                    this.goToInventory();
                })
                .catch(err=>{


                    if (err.code===422){
                        document.getElementById('feedback-signup').innerHTML = 'Username Already Taken or Company does not exist.'                
                    }
                    else if(err.code===500){
                        document.getElementById('feedback-signup').innerHTML = "Internal Server Error."                
                    }
                    else{
                        document.getElementById('feedback-signup').innerHTML = "Something went wrong."                
                    }
                    document.getElementById('signup-form-div').style.height="auto";

                })            
        }
        else{
            document.getElementById('feedback-signup').innerHTML = 'Passwords must match.'
        }    
    }

    hide(e){
        document.getElementById('signup-form-div').className='signup-form-div collapsed';
    }

    render(){
        return(
        <div className='signup-form-div collapsed'
        id='signup-form-div'>
            <form
                onSubmit={this.props.handleSubmit(values=>
                    this.onSubmit(values)
                    )}>
                <p className='feedback'
                    id="feedback-signup"
                ></p>
                <div className='input-col'>
                    <label htmlFor="firstName">First Name
                    <Field name="firstName" id="firstName" type="text" component="input" className='input' required/></label>
                    <label htmlFor="lastName"> Last Name
                    <Field name="lastName" id="lastName" type="text" component="input" className='input' required/></label>
                    <label htmlFor="username">Username
                    <Field name="username" id="username" type="text" component="input" className='input' required/></label>
                </div>
                <div className='input-col'>
                    <label htmlFor="password">Password
                    <Field name="password" id="password" type="password" component="input" className='input' required/></label>
                    <label htmlFor="confirmPass">Confirm PW
                    <Field name="confirmPass" id="confirmPas" type="password" component="input" className='input' required/></label>
                    <label htmlFor="companyID">Company ID
                    <Field name="companyID" id="companyID" type="text" component="input" className='input' required/></label>
                </div>
                <br></br>
                <button className="signup-submit-button" type="submit">Signup</button>
            </form>
            <button className="collapse-signup" onClick={e=>this.hide(e)}>X</button>
        </div>

        )
    }
}


export default connect()(reduxForm({form: 'signup'})(SignupForm))
