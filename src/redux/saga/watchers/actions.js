import { call, fork, put, takeLatest } from "redux-saga/effects"
import { getActions, setActions } from "../../slices/actionsSlice"
import { requestGetActions } from "../requests/actions"

function* handleGetActionList(action) {
    try {
        const response = yield call(requestGetActions, action.payload)
        const { data } = response
        yield put(setActions(data.data))
    } catch (error) {
        console.log(error)
    }
}

function* onHandleGetActionList() {
    yield takeLatest(getActions.type, handleGetActionList)
}

export const actionSaga = [fork(onHandleGetActionList)]
