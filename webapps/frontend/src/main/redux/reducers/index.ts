import {combineReducers, Reducer} from "redux";
import { State,orderListReducer } from './order-list-reducer';

export type RootReducer = {
    orderList: State,
};

export const rootReducer: Reducer = combineReducers({
    orderList: orderListReducer
});