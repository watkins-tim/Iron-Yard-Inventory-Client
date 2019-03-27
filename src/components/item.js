import React from 'react';
import {connect} from "react-redux";

import './stylesheets/item.css';


export class Item extends React.Component{
        constructor(props) {
            super(props);
            this.state = { 
                disabled: true,
                edited:false,
                body:{}
             }
          }


          //only adds changed values to this.state.body to be sent to server
          handleChange(e){
            console.log(e.target.id);
            const obj = {...this.state.body,
                [e.target.id]: e.target.value};
                console.log(obj);
            this.setState({
                body:obj
            })
          }

          handleEdit(e) {
            e.preventDefault();
            this.setState( {disabled: false, edited:true} );
          } 

          handleSave(e){
            e.stopPropagation();
            e.preventDefault();

            this.setState({
                disabled:true
            });

            const token = localStorage.getItem('token');

            fetch(`http://localhost:8080/api/item/${this.props.info.id}`,{
                method:'PUT',
                body:JSON.stringify(this.state.body),
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




          };
        

    render(){
        return(
            <div key={this.props.info.id} className='item' onClick={e=>this.handleEdit(e)}>
                <form>
                    <label htmlFor="location" className="item-attribute">Location:
                        <input 
                        onChange={e => this.handleChange(e)}
                        name='location'
                        id='location'
                        disabled = {(this.state.disabled)? "disabled" : ""}
                        defaultValue={this.props.info.location}
                        ></input>
                    </label>
                    <label htmlFor="area" className="item-attribute">Area:
                        <input 
                        onChange={e => this.handleChange(e)}
                        name='area'
                        id='area'
                        defaultValue={this.props.info.area}
                        disabled = {(this.state.disabled)? "disabled" : ""}></input>
                    </label>
                    <label htmlFor="shape" className="item-attribute">Shape: 
                        <input
                        onChange={e => this.handleChange(e)}
                        name='shape'
                        id='shape' 
                        defaultValue={this.props.info.shape}
                        disabled = {(this.state.disabled)? "disabled" : ""}></input>
                    </label>
                    <label htmlFor="size" className="item-attribute">Size:
                        <input 
                        onChange={e => this.handleChange(e)}
                        name='size'
                        id='size'
                        defaultValue={this.props.info.size}
                        disabled = {(this.state.disabled)? "disabled" : ""}></input>
                    </label>
                    <label htmlFor="quantity" className="item-attribute">Quantity:
                        <input 
                        onChange={e => this.handleChange(e)}
                        name='quantity'
                        id='quantity'
                        defaultValue={this.props.info.quantity}
                        disabled = {(this.state.disabled)? "disabled" : ""}></input>
                    </label>
                    <label htmlFor="length" className="item-attribute">Length:
                        <input 
                        onChange={e => this.handleChange(e)}
                        name='feet'
                        id='feet'
                        defaultValue={this.props.info.feet}
                        disabled = {(this.state.disabled)? "disabled" : ""}></input>'

                        <input 
                        onChange={e => this.handleChange(e)}
                        name='inches'
                        id='inches'
                        defaultValue={this.props.info.inches}
                        disabled = {(this.state.disabled)? "disabled" : ""}></input>"

                        <input 
                        onChange={e => this.handleChange(e)}
                        name='fraction'
                        id='fraction'
                        defaultValue={this.props.info.fraction}
                        disabled = {(this.state.disabled)? "disabled" : ""}></input>/16
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
                    <button hidden={this.state.disabled} type="submit" onClick={e=>this.handleSave(e)}>Save</button>
                </form>
    
            </div>
        )
    }
}


export default connect()(Item)
