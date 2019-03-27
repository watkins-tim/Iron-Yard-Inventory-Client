import React from 'react';
import {connect} from "react-redux";
import {reduxForm, Field} from 'redux-form';
import {required, nonEmpty} from '../validators';

import './stylesheets/new-item-container.css';

export class NewItem extends React.Component{
    onSubmit(values){
        console.log(values);


    }
    render(){
        return(
            <div className='new-item-container'>
                <form
                    onSubmit={this.props.handleSubmit(values=>
                        this.onSubmit(values)
                        )}>
                    <label htmlFor="location">Location:</label>
                    <Field 
                    name="location" 
                    id="location" 
                    type="text" 
                    component="input" 
                    validate={[required, nonEmpty]}/>
                    <label htmlFor="area">Area:</label>
                    <Field 
                    name="area" 
                    id="area" 
                    type="text" 
                    component="input" 
                    validate={[required, nonEmpty]}/>
                    <button type="submit">Login</button>
                </form>
            </div>
        )
    }
}


export default connect()(reduxForm({form: 'newItem'})(NewItem))
