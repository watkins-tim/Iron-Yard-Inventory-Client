import React from 'react';
import {connect} from "react-redux";

import {deleteItem} from '../actions/inventory-actions'

import './stylesheets/item.css';

import {API_URL} from '../config'

export class Item extends React.Component{
        constructor(props) {
            super(props);
            this.state = { 
                disabled: true,
                edited:false,
                body:{},
                token:localStorage.getItem('token')

             }
          }



          //only adds changed values to this.state.body to be sent to server
          handleChange(e){
            const obj = {...this.state.body,
                [e.target.id]: e.target.value};
            this.setState({
                body:obj
            })
          }

          handleEdit(e) {
            e.preventDefault();
            if (this.state.disabled){
                this.setState( {disabled: false, edited:true} );
                e.target.innerHTML="Save"
            }
            else{
                this.handleSave(e);
                this.setState({
                    disabled:true
                });
                e.target.innerHTML="Edit"
            }
          } 

          handleSave(e){
            e.stopPropagation();
            e.preventDefault();

            fetch(`${API_URL}/api/item/${this.props.info._id}`,{
                method:'PUT',
                body:JSON.stringify(this.state.body),
                headers:{
                    'Content-Type':'application/json',
                    'Authorization': 'Bearer ' + this.state.token
                }
            })
            .then(res=>{
                if(!res.status === 200){
                    return Promise.reject({
                    });
                }
                return res.json()
            })
            .catch(err=>console.log(err));
          };

        handleDelete(e){
            console.log(this.props.info._id);
            this.props.dispatch(deleteItem({_id:this.props.info._id, token:this.state.token}));
          }

        

    render(){
        return(
            <div key={this.props.info._id} className='item' >
                <button className="delete-item" 
                id='deleteItem'
                onClick={e=>this.handleDelete(e)}
                >X</button>
                <form>
                    <label htmlFor="location" className="item-attribute">Location:
                        <input 
                        onChange={e => this.handleChange(e)}
                        name='location'
                        id='location'
                        disabled = {(this.state.disabled)? "disabled" : ""}
                        style={{width:"100px"}}
                        defaultValue={this.props.info.location}
                        ></input>
                    </label>
                    <label htmlFor="area" className="item-attribute">Area:
                        <input 
                        onChange={e => this.handleChange(e)}
                        name='area'
                        id='area'
                        defaultValue={this.props.info.area}
                        disabled = {(this.state.disabled)? "disabled" : ""}
                        style={{width:"100px"}}
                        ></input>
                    </label>
                    <label htmlFor="shape" className="item-attribute">Shape: 
                        <input
                        onChange={e => this.handleChange(e)}
                        name='shape'
                        id='shape' 
                        defaultValue={this.props.info.shape}
                        disabled = {(this.state.disabled)? "disabled" : ""}
                        style={{width:"50px"}}
                        ></input>
                    </label>
                    <label htmlFor="size" className="item-attribute">Size:
                        <input 
                        onChange={e => this.handleChange(e)}
                        name='size'
                        id='size'
                        defaultValue={this.props.info.size}
                        disabled = {(this.state.disabled)? "disabled" : ""}
                        style={{width:"100px"}}
                        ></input>
                    </label>
                    <label htmlFor="quantity" className="item-attribute">Quantity:
                        <input 
                        onChange={e => this.handleChange(e)}
                        name='quantity'
                        id='quantity'
                        type="number"
                        min='0'
                        defaultValue={this.props.info.quantity}
                        disabled = {(this.state.disabled)? "disabled" : ""}
                        style={{width:"40px"}}></input>
                    </label>
                    <label htmlFor="length" className="item-attribute">Length:
                        <input 
                        onChange={e => this.handleChange(e)}
                        name='feet'
                        id='feet'
                        type="number"
                        min='0'
                        defaultValue={this.props.info.feet}
                        disabled = {(this.state.disabled)? "disabled" : ""}
                        style={{width:"40px"}}></input>'

                        <input 
                        onChange={e => this.handleChange(e)}
                        name='inches'
                        id='inches'
                        type="number"
                        min='0'
                        max='11'
                        defaultValue={this.props.info.inches}
                        disabled = {(this.state.disabled)? "disabled" : ""}
                        style={{width:"30px"}}></input>"

                        <input 
                        onChange={e => this.handleChange(e)}
                        name='fraction'
                        id='fraction'
                        type="number"
                        min='0'
                        max='15'
                        defaultValue={this.props.info.fraction}
                        disabled = {(this.state.disabled)? "disabled" : ""}
                        style={{width:"30px"}}></input>/16
                    </label>
                    <label htmlFor="grade" className="item-attribute">Grade:
                        <input 
                        onChange={e => this.handleChange(e)}
                        name='grade'
                        id='grade'
                        defaultValue={this.props.info.grade}
                        disabled = {(this.state.disabled)? "disabled" : ""}
                        style={{width:"50px"}}></input>
                    </label>
                    <label htmlFor="po" className="item-attribute">PO:
                        <input 
                        onChange={e => this.handleChange(e)}
                        name='po'
                        id='po'
                        defaultValue={this.props.info.po}
                        disabled = {(this.state.disabled)? "disabled" : ""}></input>
                    </label>
                    <label htmlFor="resrerve" className="item-attribute">Job Reserve:
                        <input 
                        onChange={e => this.handleChange(e)}
                        name='reserve'
                        id='reserve'
                        defaultValue={this.props.info.reserve}
                        disabled = {(this.state.disabled)? "disabled" : ""}></input>
                    </label>
                    <label htmlFor="remarks" className="item-attribute">Remarks:
                        <input 
                        onChange={e => this.handleChange(e)}
                        name='remarks'
                        id='remarks'
                        defaultValue={this.props.info.remarks}
                        disabled = {(this.state.disabled)? "disabled" : ""}></input>
                    </label>
                </form>
                <button onClick={e=>this.handleEdit(e)} id='edit-toggle' className="edit-submit">Edit</button>

    
            </div>
        )
    }
}


export default connect()(Item)
