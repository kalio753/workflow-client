import { message } from "antd"
import { call, put, takeLatest, fork } from "redux-saga/effects"
import { setFolder, getFolder, createFolder } from "../../slices/folderSlice"
import { requestGetFolder, requestPostFolder } from "../requests/folder"

export function* handleGetFolder(action) {
    try {
        const response = yield call(requestGetFolder)
        const { data } = response
        yield put(setFolder(data.data))
    } catch (error) {
        console.log(error)
    }
}

function* onHandleGetFolder() {
    yield takeLatest(getFolder.type, handleGetFolder)
}

function* handleCreateFolder(action) {
    try {
        const response = yield call(requestPostFolder, action.payload)
        if (response.data.result) {
            message.success("Tạo nhóm thành công")
            action.payload.setFolderSelected(action.payload.name)
            const response = yield call(requestGetFolder)
            const { data } = response
            yield put(setFolder(data.data))
        } else {
            message.error(response.data.data)
        }
    } catch (error) {
        console.log(error)
    }
}

function* onHandleCreateFolder() {
    yield takeLatest(createFolder.type, handleCreateFolder)
}

export const folderSaga = [fork(onHandleGetFolder), fork(onHandleCreateFolder)]
