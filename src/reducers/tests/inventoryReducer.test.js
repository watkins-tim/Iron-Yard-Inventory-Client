import inventoryReducer from '../inventoryReducer';
import {getInv, deleteItemSuccess} from '../../actions/inventory-actions'

describe('inventory Reducer', () => {
    it('Should get inventory', () => {
        let state = {
        };
        const item = 'testItem';
        state = inventoryReducer(state, getInv({item}));

        expect(state).toEqual({
            items:{item}
        });
    });
    it('Should process a deleted item in inventory', () => {
        const item1={
            _id:"testId"
        }
        let state = {
            items:[item1]
        };
        state = inventoryReducer(state, deleteItemSuccess(item1));

        expect(state).toEqual({
            items:[]
        });
    });
});
