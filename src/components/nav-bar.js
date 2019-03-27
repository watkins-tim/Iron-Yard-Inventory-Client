import React from 'react';
import {connect} from "react-redux";

import {newItemShow} from '../actions/inventory-actions'



class NavBar extends React.Component{

    showNewItem(e){
        this.props.dispatch(newItemShow());
    }



    render(){
        return(
            <button onClick={e=>this.showNewItem(e)}>New Item</button>
            
        )
    }

}
const mapStateToProps = state => {
    return{
        newItem:state.newItem
    }
};

export default connect(mapStateToProps)(NavBar);