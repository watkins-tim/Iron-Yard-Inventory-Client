import {API_URL} from '../config'


export const GET_INV = 'GET_INV';
export const getInv = items => ({
    type: GET_INV,
    items:items
});

export const TEST = 'TEST';
export const test = () => ({
    type: TEST
});

export const LOADING = 'LOADING';
export const loading = () => ({
    type: LOADING,
    loading:true
});

export const NOT_LOADING = 'NOT_LOADING';
export const notLoading = () => ({
    type: NOT_LOADING,
    loading:false
});

export const NEW_ITEM_SHOW='NEW_ITEM_SHOW';
export const newItemShow = () => ({
    type:NEW_ITEM_SHOW,
    newItem:true
});

export const NEW_ITEM_HIDE='NEW_ITEM_HIDE';
export const newItemHide = () => ({
    type:NEW_ITEM_HIDE,
    newItem:false
});

export const ADD_NEW_ITEM='ADD_NEW_ITEM';
export const addNewItem = (item) => ({
    type:ADD_NEW_ITEM,
    item: item
});

export const DELETE_ITEM='DELETE_ITEM';
export const deleteItem = (info) => dispatch => {
    fetch(`${API_URL}/api/item/${info._id}`,{
        method:'DELETE',
        headers:{
            'Content-Type':'application/json',
            'Authorization': 'Bearer ' + info.token
        }
    })
    .then(res=>{
        if(!res.status === 200){
            Promise.reject({
            });
        }
        dispatch(deleteItemSuccess(info))

    })
    .catch(err=>{
        console.log(err);
        dispatch(deleteItemFail(err))

    })
};

export const DELETE_ITEM_SUCCESS='DELETE_ITEM_SUCCESS';
export const deleteItemSuccess = (info) => ({
    type:DELETE_ITEM_SUCCESS,
    info:info
})

export const DELETE_ITEM_FAIL='DELETE_ITEM_FAIL';
export const deleteItemFail = (err) => ({
    type:DELETE_ITEM_FAIL,
    error: err
})