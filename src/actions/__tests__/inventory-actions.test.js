
import {getInv, GET_INV, deleteItemSuccess, DELETE_ITEM_SUCCESS} from '../inventory-actions';

describe('getInv', () => {
    it('Should return the action', () => {
        const items = 'TEST ITEMS';
        const action = getInv(items);
        expect(action.type).toEqual(GET_INV);
        expect(action.items).toEqual(items);
    });
});

describe('deleteItemSuccess', ()=>{
    it('Should return the action', ()=>{
        const info = 'testInfo';
        const action = deleteItemSuccess(info);
        expect(action.type).toEqual(DELETE_ITEM_SUCCESS);
        expect(action.info).toEqual(info)
    })
})