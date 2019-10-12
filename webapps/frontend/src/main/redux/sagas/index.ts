import { all, fork } from 'redux-saga/effects';

import { orderListSaga } from '../sagas/order-list-sagas';

export function* rootSaga() {
    yield all([
        ...orderListSaga
    ]);
}