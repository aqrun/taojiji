import { call, put, fork, takeLatest } from 'redux-saga/effects'
import * as appActions from '../actions/order-list-actions';
import * as appServices from '../services/order-list-services';

function* refreshTableListWorker(action:any){
    try{
        console.log('action',action);
        let pager = action.payload.pager;
        let params = action.payload.params;
        yield put(appActions.setTableListLoading(true));
        const res = yield call(appServices.fetchTableList, params);
        let pagernew = {...pager, total:parseInt(res.records_filtered)};
        yield put(appActions.setPager(pagernew));
        yield put(appActions.setTableList(res.data));

        yield put(appActions.setTableListLoading(false));
    }catch(err){
        yield put(appActions.setTableListLoading(false));
        console.log('table list refresh error', err);
    }
}

export function* watchRefreshTableList(){
    yield takeLatest(appActions.refreshTableList.type, refreshTableListWorker);
}

export const orderListSaga = [
    fork(watchRefreshTableList),
];