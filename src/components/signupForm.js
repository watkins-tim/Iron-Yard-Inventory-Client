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
                <label htmlFor="firstName">First Name
                <Field name="firstName" id="firstName" type="text" component="input" className='input'/></label>
                <label htmlFor="lastName"> Last Name
                <Field name="lastName" id="lastName" type="text" component="input" className='input'/></label>
                <label htmlFor="username">Username
                <Field name="username" id="username" type="text" component="input" className='input'/></label>
                <label htmlFor="password">Password
                <Field name="password" id="password" type="text" component="input" className='input'/></label>
                <label htmlFor="confirmPass">Confirm PW
                <Field name="confirmPass" id="confirmPas" type="text" component="input" className='input'/></label>
                <label htmlFor="companyID">Company ID
                <Field name="companyID" id="companyID" type="text" component="input" className='input'/></label>
                <button type="submit">Signup</button>
            </form>
            <button className="collapse-signup" onClick={e=>this.hide(e)}>X</button>
        </div>

        )
    }
}


export default connect()(reduxForm({form: 'signup'})(SignupForm))
