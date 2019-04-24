import React from 'react';
import {connect} from "react-redux";

import './stylesheets/item-container.css';

import Item from './item'


class ItemContainer extends React.Component{



    render(){
        
        if (this.props.loading){
            return(
            <div >
                <h2>LOADING</h2>
            </div>
            );
        }
        else if (this.props.loading ===false && this.props.items.length>0){
            const Items = this.props.items.map(item=>{
                //console.log(item);
                return <li key={item._id}><Item info={item}/></li> 
            })
            return(
                <div >
                    <ul>
                        {Items}
                    </ul>
                </div>
           
        ); 
        }
        
        else{
            return <h1 className="no-items">No Items in Inventory</h1>

        }

    }
}
const mapStateToProps = state => {
    return{
        items: state.invReducer.items,
        loading: state.invReducer.loading,
        newItem:state.invReducer.newItemInfo
    }
};

export default connect(mapStateToProps)(ItemContainer);