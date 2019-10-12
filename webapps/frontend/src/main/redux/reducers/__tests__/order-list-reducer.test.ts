import { fromJS } from 'immutable';
import { orderListReducer, initialState } from '../order-list-reducer';
import { setTableList, setUserData } from '../../actions/order-list-actions';

describe('order list reducer', () => {
    it('show return the initial state', () => {
        // @ts-ignore
        expect(orderListReducer(undefined, {})).toEqual(initialState)
    });

    it('should handle set table list', () => {
        let table_list = [{a:1}];
        expect(orderListReducer(initialState,
            setTableList(table_list))).toEqual(
                initialState.setIn(['table', 'data'], fromJS(table_list))
        )
    });

    it('show set user data', () => {
        let state = initialState.set('username', 'alex');
        state = state.set('age', 18);
        expect(orderListReducer(
            initialState,
            setUserData('alex', 18))
        ).toEqual(state);
    })
});