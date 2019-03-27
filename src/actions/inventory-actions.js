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
