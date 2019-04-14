import React from 'react';
import {connect} from "react-redux";
import {required, nonEmpty} from '../validators';

import './stylesheets/new-item-container.css';

import sizes from '../shapeSize.json'
import grades from '../grades.json'

import {addNewItem, newItemHide} from '../actions/inventory-actions';
import { API_URL } from '../config';

export class NewItem extends React.Component{
    constructor(props){
        super(props);
        this.state={
            newItem:{
                shape:"ATR"
            }
        };
    }
    
    handleSubmit(e){
        e.preventDefault();
        const objArr = Object.keys(e.target).map(key=>{
            const target = e.target[key];
            return {key:target.id,
                    value: target.value}
            });

        const newItem = Object.assign({}, ...(objArr.map(item => ({ [item.key]: item.value }) )));

        
        const token = localStorage.getItem('token');

        e.preventDefault();
        fetch(`${API_URL}/api/item/`,{
            method:'POST',
            body:JSON.stringify(newItem),
            headers:{
                'Content-Type':'application/json',
                'Authorization': 'Bearer ' + token,
            }
        })
        .then(res=>{
            //console.log(res.status);
            if(!res.status === 200){

                Promise.reject({
                });
            }
            return res.json()
        })
        .then(resJson=>{
            //console.log(resJson);
            this.props.dispatch(addNewItem(resJson));
            this.setState({
                added:true
            });
            this.fadeFeedback();
        })
        .catch(err=>{
            console.log(err);
            this.setState({
                added:false
            })
        
        });
    };

    changeShape(e){
        document.getElementById('size').value="";
        this.setState({
            newItem:{
                shape:e.target.value
            }
        });
    };

    shapeGrade(){
        if (!(this.state.newItem.shape === "")){
            const gradesArr = grades[this.state.newItem.shape];
            const gradeOptions = gradesArr.map((key,i)=>{
                return <option key={key}>{key}</option>
            });
            return gradeOptions;
        }
        else{
            return;
        };
    };

    shapeSize(e){
        const sizesArr = sizes[this.state.newItem.shape.toLowerCase()];
        //console.log(sizesArr);
        const sizeOptions = sizesArr.map((key,i)=>{
            return <option value={key} key={key}>{key}</option>
        });
        return sizeOptions;
    };
    
    hideNewItem(e){
        this.props.dispatch(newItemHide());
    }

    fadeFeedback(){
        this.timer = setTimeout(_ => {
            this.setState({
                added:false
            });
          }, 500); // animation timing offset
    }

    render(){


        const shapes = Object.keys(grades).map(key=>{
            return <option value={key} key={key}>{key}</option>
        });

        return(

            <div className='new-item-container'>
            
                <div className={this.state.added?'pos show':'pos hide'}></div>

                <button onClick={e=>this.hideNewItem(e)}>X</button>
                    <form
                        onSubmit={e=>this.handleSubmit(e)}>
                        <label htmlFor="location">Area:</label>
                        <select 
                            id="location"
                            name="location" 
                            defaultValue=""
                            validate={[required, nonEmpty]}
                            required
                            >
                            <option></option>
                            <option>Yard A</option>
                            <option>Yard B</option>
                        </select>
                        <label htmlFor="area">Area:</label>
                        <input 
                            name="area" 
                            id="area" 
                            required
                            validate={[required, nonEmpty]}
                            >
                        </input>
                        <label htmlFor="quantity">Quantity:</label>
                        <input 
                            type='number'
                            name="quantity" 
                            id="quantity" 
                            min='0'
                            required
                            validate={[required, nonEmpty]}>
                        </input>
                        <label htmlFor="shape">Shape:</label>
                        <select 
                            name="shape" 
                            id="shape" 
                            required
                            validate={[required, nonEmpty]}
                            onChange={e=>{
                                return this.changeShape(e);
                                }}>
                            {shapes}
                        </select>
                        <label htmlFor="size">Size:</label>

                        <input 
                            name="size" 
                            id="size" 
                            required
                            validate={[required, nonEmpty]} 
                            list='list'
                            autoComplete="off"/>
                            <datalist id='list'>
                                {this.shapeSize()}
                            </datalist>
                        <label htmlFor="size">Grade:</label>
                        <select 
                            name="grade" 
                            id="grade" 
                            validate={[required, nonEmpty]}>
                            {this.shapeGrade()}
                        </select>
                        <label htmlFor="length">Length:
                            <input 
                            name='feet'
                            id='feet'
                            defaultValue = "0"
                            min="0"
                            type='number'></input>'
                            <input 
                            name='inches'
                            id='inches'
                            defaultValue = "0"
                            type='number'></input>"
                            <input 
                            name='fraction'
                            id='fraction'
                            defaultValue = "0"
                            min="0"
                            max="15"
                            type='number'></input>/16
                        </label>
                        <label htmlFor="po">Purchase Order #:</label>
                        <input 
                            name="po" 
                            id="po" >
                        </input>
                        <label htmlFor="reserve">Job Reserve:</label>
                        <input 
                            name="reserve" 
                            id="reserve" 
                            >
                        </input>
                        <label htmlFor="remarks">Remarks:</label>
                        <input 
                            name="remarks" 
                            id="remarks" 
                            >
                        </input>

                        <button type="submit">Submit</button>
                    </form>
            </div>
        )
    }
}


export default connect()(NewItem)
