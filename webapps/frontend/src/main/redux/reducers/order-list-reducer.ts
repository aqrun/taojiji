import { fromJS, Map } from 'immutable';
import { createReducer } from 'deox';
import * as actions from '../actions/order-list-actions';

export type Pagination = Map<string, string|number|boolean>;
export type State = Map<string, any>;

export const initPager = {
    current: 1,
    pageSize: 10,
    pageSizeOptions: ['10', '20', '50', '100', '1000'],
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: (total:number) => `Total:${total}`,
};

const table = {
    data: [{key: '1', name: '胡彦斌', age: 32, address: '西湖区湖底公园1号',},
        {key: '2', name: '胡彦祖', age: 42, address: '西湖区湖底公园1号',},],
    loading: false,
    pager: initPager,
    search_filter: {},
    table_filter: {},
};

export const initialState = fromJS({
    table,
});

export const orderListReducer = createReducer(initialState, handleAction => [
    handleAction(actions.setTableList, (state, {payload}) => {
        //console.log('===========', payload)
        return state.setIn(['table', 'data'], fromJS(payload.table_list));
    }),
    handleAction(actions.setUserData, (state, {payload}) => {
        let newvalue = {...state.toJS(), ...payload};
        //console.log(newvalue)
        return fromJS(newvalue);
    })
]);

