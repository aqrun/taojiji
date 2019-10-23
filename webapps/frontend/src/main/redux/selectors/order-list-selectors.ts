import { createSelector } from 'reselect';
import { State, Pagination } from '../reducers/order-list-reducer';
import { Map as iMap } from 'immutable';
import { RootReducer } from '../reducers';

export const tableDataSelector = (state: RootReducer) => state.orderList.getIn(['table', 'data']);
export const pagerSelector = (state: RootReducer) => state.orderList.getIn(['table', 'pager']);
export const searchFilterSelector = (state: RootReducer) => state.orderList.getIn(['table', 'search_filter']);
export const tableFilterSelector = (state: RootReducer) => state.orderList.getIn(['table', 'table_filter']);
export const tableLoadingSelector = (state:RootReducer) => state.orderList.getIn(['table', 'loading']);
export const sortSelector = (state:RootReducer) => state.orderList.getIn(['table', 'sort']);
export const modalSelector = (state:RootReducer) => state.orderList.getIn(['modal']);

export const filterSelector = createSelector(
    [searchFilterSelector, tableFilterSelector],
    (sf,tf) => ({...sf.toJS(), ...tf.toJS()})
);

export const tableDataFetchParamsSelector = createSelector(
    [pagerSelector, filterSelector, sortSelector],
    (pager:Pagination, filter: Map<string, any>, sort:iMap<string, any>) => ({
        current: pager.get('current'),
        pageSize: pager.get('pageSize'),
        sort: sort.toJS(),
        filter: filter,
    })
);