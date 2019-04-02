import {GET_INV, LOADING, NOT_LOADING, NEW_ITEM_HIDE, NEW_ITEM_SHOW, ADD_NEW_ITEM} from '../actions/inventory-actions';

const initialState = {
    items:{},
    loading:false,
    newItem: false
}

export default(state=initialState, action)=>{
    if (action.type ===GET_INV) {
        const obj = Object.assign({},state,{
            items:action.items
    
        });
        return obj;
    }

    else if(action.type ===LOADING){
        const obj = Object.assign({},state,{
            loading:action.loading
    
        });
        return obj;
    }
    else if(action.type ===NOT_LOADING){
        const obj = Object.assign({},state,{
            loading:action.loading
    
        });
        return obj;
    }
    else if (action.type === NEW_ITEM_HIDE){
        const obj = Object.assign({}, state,{
            newItem:false
        })
        return obj;
    }
    else if (action.type === NEW_ITEM_SHOW){
        const obj = Object.assign({}, state,{
            newItem:true
        })
        return obj;
    }
    else if (action.type === ADD_NEW_ITEM){
        const obj = Object.assign({}, state,{
            items:[action.item, ...state.items]
        })
        return obj;
    }

    return state;
}
