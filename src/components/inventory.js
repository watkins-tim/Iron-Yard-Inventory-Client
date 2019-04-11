import React from 'react';
import {connect} from "react-redux";

import ItemContainer from './item-container';
import NavBar from './nav-bar';
import NewItem from './new-item'

import './stylesheets/inventory.css';

import {getInv, loading, notLoading} from '../actions/inventory-actions';

import {API_URL} from '../config'


class Inventory extends React.Component{

    componentWillMount(){
        this.setState({
            page:0,
            token:localStorage.getItem('token')
        },
        function(){
            this.getItems();
        });
    }
    nextPage(){
        if (this.state.page+1 < this.state.pages)     {
            this.setState({page:this.state.page+1},
            function(){
            console.log(this.state.page);
            this.getItems();
            });  
        }   

    }
    prevPage(){
        console.log(this.state.page);
        if (this.state.page > 0){
            this.setState({page:this.state.page-1},
            function(){
                this.getItems();
                });
        }

    }

    getItems(){
        this.props.dispatch(loading());

        return fetch(`${API_URL}/api/item?page=${this.state.page}`,{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization': 'Bearer ' + this.state.token,
            }
        })
        .then(res=>{
            if(!res.status === 200){
                Promise.reject({
                    status:res.status
                });
            } 

            return res.json()
        })
        .then(res=>{

            this.props.dispatch(getInv(res));
            this.props.dispatch(notLoading());
        })
        .then(()=>{
            if (this.props.items.length>0){
                this.setState({
                    pages:Math.ceil(this.props.items[0].count/20)
                })
            }
            else{
                this.setState({
                    pages:1
                })
            }
        })
        .catch(err=>{
            console.log(err)
            if (err.status ===500){
                document.getElementById('feedback').style.display = "inline";
            }
            else{
                this.props.history.push('/');
            }
        })
    }

    render(){
        let newItemContainer;
        if (this.props.newItem===true){
            newItemContainer = <NewItem className="new-item-container"/>
        }


        const pageInfo = <h2>{this.state.page+1} of {this.state.pages}</h2>


        return(
            <div className='inventory-container'>
                <NavBar history={this.props.history} />
                <h3 id='feedback' style={{display:"none"}}>Internal Server Error</h3>
                {newItemContainer}
                <button onClick={e=>this.prevPage()}>Prev</button>
                {pageInfo}
                <button onClick={e=>this.nextPage()}>Next</button>
                <ItemContainer />
                <button onClick={e=>this.prevPage()}>Prev</button>
                {pageInfo}
                <button onClick={e=>this.nextPage()}>Next</button>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return{
        items:state.invReducer.items,
        newItem:state.invReducer.newItem
    }
};

export default connect(mapStateToProps)(Inventory);