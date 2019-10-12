import { createSelector } from 'reselect';
import { State, Pagination } from '../reducers/order-list-reducer';
import { Map } from 'immutable';
import { RootReducer } from '../reducers';

export const tableDataSelector = (state: RootReducer) => state.orderList.getIn(['table', 'data']);
export const pagerSelector = (state: RootReducer) => state.orderList.getIn(['table', 'pager']);
export const searchFilterSelector = (state: RootReducer) => state.orderList.getIn(['table', 'search_filter']);
export const tableFilterSelector = (state: RootReducer) => state.orderList.getIn(['table', 'table_filter']);
export const tableLoadingSelector = (state:RootReducer) => state.orderList.getIn(['table', 'loading']);

export const filterSelector = createSelector(
    [searchFilterSelector, tableFilterSelector],
    (sf,tf) => ({...sf.toJS(), ...tf.toJS()})
);

export const tableDataFetchParamsSelector = createSelector(
    [pagerSelector, filterSelector],
    (pager:Pagination, filter: Map<string, any>) => ({
        current: pager.get('current'),
        pageSize: pager.get('pageSize'),
        filter: filter,
    })
);