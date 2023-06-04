import { call, put, takeLatest, fork } from "redux-saga/effects"
import {
    getParts,
    getPositions,
    getUsers,
    setParts,
    setPositions,
    setUsers,
} from "../../slices/fakeDataSlice"
import {
    requestGetParts,
    requestGetPositions,
    requestGetUsers,
} from "../requests/fakeData"

function* handleGetParts(action) {
    try {
        const response = yield call(requestGetParts(action.payload))
        console.log("data from get parts api")
        yield put(setParts(response.data.data))
    } catch (error) {
        console.log(error)
    }
}

function* handleGetPositions(action) {
    try {
        const response = yield call(requestGetPositions)
        console.log("data from get position api")
        yield put(setPositions(response.data.data))
    } catch (error) {
        console.log(error)
    }
}

function* handleGetUsers(action) {
    try {
        const response = yield call(requestGetUsers)
        console.log("data from get user api")
        yield put(setUsers(response.data.data))
    } catch (error) {
        console.log(error)
    }
}

function* fakeDataSagaWatcher() {
    yield takeLatest(getParts.type, handleGetParts)
    yield takeLatest(getPositions.type, handleGetPositions)
    yield takeLatest(getUsers.type, handleGetUsers)
}

export const fakeDataSaga = [fork(fakeDataSagaWatcher)]
