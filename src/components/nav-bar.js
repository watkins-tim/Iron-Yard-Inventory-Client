import React from 'react';
import {connect} from "react-redux";
import { saveAs } from 'file-saver';

import {newItemShow} from '../actions/inventory-actions';

import './stylesheets/nav-bar.css';

import {API_URL} from '../config';class NavBar extends React.Component{
    constructor(props){
        super(props);
        this.state={
            token: localStorage.getItem('token'),
            user: JSON.parse(localStorage.getItem('user'))
        }
    }

    showNewItem(e){
        this.props.dispatch(newItemShow());
    }

    logout(e){
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.props.history.push('/');
    }

    getJSON(e){
        fetch(`${API_URL}/api/item/json`,{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization': 'Bearer ' + this.state.token
            }
        })
            .then(res=>{
                return res.json()
            })
            .then(res=>{
                
                const blob = new Blob([JSON.stringify(res)], {type:'text/json'});
                saveAs(blob, 'inventory.json')
            })
            .catch(err=>{
                console.log(err)
            })

    }
    getCSV(e){
        fetch(`${API_URL}/api/item/csv`,{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization': 'Bearer ' + this.state.token
            }
        })
            .then(res=>res.text())
            .then(text=>{

                console.log(text);
                const blob = new Blob([text], {type:'text/csv'});
                saveAs(blob, 'inventory.csv')
            })
            .catch(err=>{
                console.log(err)
            })
        

    }


    render(){
        return(
            <div className='nav-bar-container'>
                <div className='iron-icon'></div>
                <h1>Iron Yard Inventory</h1>
                <div className='button-container'>
                    <button onClick={e=>this.showNewItem(e)}>New Item</button>
                    <button onClick={e=>this.getJSON(e)}>Download JSON</button>
                    <button onClick={e=>this.getCSV(e)}>Download CSV</button>
                    <button onClick={e=>this.logout(e)}>Logout</button>
                </div>
            </div>
            
        )
    }

}
const mapStateToProps = state => {
    return{
        newItem:state.newItem
    }
};

export default connect(mapStateToProps)(NavBar);