import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import AuthReducer from "./AuthReducer";
import CartReducer from "./CartReducer";
import createSaga from "redux-saga"
import MainSaga from "../sagas/sagas";

let middleware = store => next => action => {
    // console.log('Action type', action.type)
    // console.log('Action payload', action.payload)
    next(action)
}
let sagaMiddleware = createSaga()

let store = createStore(combineReducers({AuthReducer, CartReducer}), applyMiddleware(middleware, thunk, sagaMiddleware))

sagaMiddleware.run(MainSaga)
// alert(JSON.stringify(store.getState()))
export default store
