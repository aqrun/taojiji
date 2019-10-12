import { fromJS, Map as iMap } from 'immutable';
import { createReducer } from 'deox';
import * as actions from '../actions/order-list-actions';

export type Pagination = iMap<string, string|number|boolean>;
export type State = iMap<string, any>;

export const initPager = {
    current: 1,
    pageSize: 10,
    pageSizeOptions: ['10', '20', '50', '100', '1000'],
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: (total:number) => `Total:${total}`,
};


export const initialSort = {
    created_at: {name: 'created_at', dir: 'desc'}
};

let table = {
    data: [],
    loading: false,
    pager: initPager,
    search_filter: {},
    table_filter: {},
    sort: initialSort,
};

export const initialState = fromJS({
    table,
});

export const orderListReducer = createReducer(initialState, handleAction => [
    handleAction(actions.setTableList, (state, {payload}) => {
        //console.log('===========', payload)
        return state.setIn(['table', 'data'], fromJS(payload.table_list));
    }),
    handleAction(actions.setPager, (state, {payload}) => {
        let s = state.setIn(['table', 'pager'], fromJS(payload.pager));
        console.log('handle pager reducer', s.getIn(['table','pager']).toJS())
        return s;
    }),
    handleAction(actions.setSort, (state, {payload}) => {
        console.log('===sort', payload.sort);
        return state.setIn(['table', 'sort'], fromJS(payload.sort));
    }),
    handleAction(actions.setSearchFilter, (state, {payload}) => {
        return state.setIn(['table','search_filter'], fromJS(payload.filter));
    }),
    handleAction(actions.setTableFilter, (state, {payload}) => {
        return state.setIn(['table', 'table_filter'], fromJS(payload.filter));
    }),
    handleAction(actions.setTableListLoading, (state, {payload}) => {
        return state.setIn(['table', 'loading'], payload.loading);
    }),
    handleAction(actions.setUserData, (state, {payload}) => {
        let newvalue = {...state.toJS(), ...payload};
        //console.log(newvalue)
        return fromJS(newvalue);
    })
]);

