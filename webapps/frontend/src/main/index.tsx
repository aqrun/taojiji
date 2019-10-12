import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { rootReducer } from "./redux/reducers";
import { App } from './app';
import { rootSaga } from './redux/sagas';

export function mainModule(){
    //console.log('main module running')
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
    sagaMiddleware.run(rootSaga);

    render(
        <Provider store={store}>
            <App />
        </Provider>,
        document.getElementById('root-container')
    );
}

export function init(){
    mainModule()
}