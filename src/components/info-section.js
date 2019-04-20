import React from 'react';

import './stylesheets/info-section.css';

import SignupForm from './signupForm';


class InfoSection extends React.Component{


    showSignup(e){
        document.getElementById('signup-form-div').className='signup-form-div';
    }

    render(){
        return(
            <div className='info-container'>
            
                <h2 className='info-header'>About</h2>
                <p className='info-text'>The steel industry has an abundance of material types, shapes, sizes and grades.  Keeping track of all of material is a daily challenge for 
                    steel fabricators, mills, and service centers.  While traditional ERP software helps track of inventory as it is sold, purchased, cut or recycled, it is often 
                    difficult to use for auditing material stock and for end of year inventory operations.  Iron Yard Inventory aims to solve these issues by allowing employees to report 
                    stock materials from the steel yard, storerooms and shops.  Users can to download inventory information in CSV or JSON format for auditing 
                    calculations, or for updating of inventory in ERP software. 
                </p>
                <button onClick={e=>this.showSignup(e)} className="signup-button">Employee Signup</button>
                <SignupForm history={this.props.history}/>

            </div>
        )
    }
}
export default InfoSection