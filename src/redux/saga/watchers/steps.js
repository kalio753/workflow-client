import { call, put, takeLatest, fork } from "redux-saga/effects"
import { getStepsById, setStepsById } from "../../slices/stepsSlice"
import { requestGetStepsById } from "../requests/steps"

function* handleGetStepsById(action) {
    try {
        if (action.payload) {
            const response = yield call(requestGetStepsById, action.payload)
            const { data } = response
            if (data.result) {
                yield put(setStepsById(data.data))
            } else {
                yield put(setStepsById([]))
            }
        }
    } catch (error) {
        console.log(error)
    }
}

function* onHandleGetStepsById() {
    yield takeLatest(getStepsById.type, handleGetStepsById)
}

export const stepsSaga = [fork(onHandleGetStepsById)]
