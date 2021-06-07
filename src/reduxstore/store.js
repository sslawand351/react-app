import { createStore } from "redux";
import AuthReducer from "./AuthReducer";

let store = createStore(AuthReducer)

export default store
