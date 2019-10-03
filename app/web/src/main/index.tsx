import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware  from 'redux-saga';

import { App } from './app';
import { rootSaga } from './sagas';
import { rootReducer } from "./reducers";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
    rootReducer,
    applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

export function mainModule(){
    render(
        <Provider store={store}>
            <App />
        </Provider>,
        document.getElementById('page_container')
    );
}

export function init(){
    mainModule()
}
