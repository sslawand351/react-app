import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import AuthReducer from "./AuthReducer";
import CartReducer from "./CartReducer";

let middleware = store => next => action => {
    // console.log('Action type', action.type)
    // console.log('Action payload', action.payload)
    next(action)
}
let store = createStore(combineReducers({AuthReducer, CartReducer}), applyMiddleware(middleware, thunk))
// alert(JSON.stringify(store.getState()))
export default store
