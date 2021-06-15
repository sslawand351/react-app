import {call, takeEvery, put, all} from "redux-saga/effects"
import { addNewCake } from "../apis/Api";

function *AddCakeGenerator(action, props) {
  let result = yield(call(addNewCake, action))
  if (result.data) {
    yield put({
        type: "ADD_CAKE_SUCCESS",
        payload: result.data
    })
  } else {
    yield put({
        type: "ADD_CAKE_FAILURE"
    })
  }
}

function *AddCakeSaga() {
  yield takeEvery('ADD_CAKE', AddCakeGenerator)
}
export default function *MainSaga() {
  yield all([AddCakeSaga()])
}