import React from 'react';
import {connect} from "react-redux";

import ItemContainer from './item-container';
import NavBar from './nav-bar';
import NewItem from './new-item'

import './stylesheets/inventory.css';
import {getInv, loading, notLoading} from '../actions/inventory-actions';


class Inventory extends React.Component{

    componentWillMount(){
        this.props.dispatch(loading())
        const token = localStorage.getItem('token');

        return fetch('http://localhost:8080/api/item?page=0',{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization': 'Bearer ' + token,
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
            this.props.dispatch(getInv(res));
            this.props.dispatch(notLoading());
        })
        .catch(err=>console.log(err))
    }

    render(){
        let newItemContainer;
        if (this.props.newItem===true){
            newItemContainer = <NewItem className="new-item-container"/>
        }

        return(
            <div className='inventory-container'>
                <NavBar />
                <ItemContainer />
                {newItemContainer}
            </div>
        );
    }
}
const mapStateToProps = state => {
    return{
        newItem:state.invReducer.newItem
    }
};

export default connect(mapStateToProps)(Inventory);