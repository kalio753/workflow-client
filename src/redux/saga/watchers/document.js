import { message } from "antd"
import { useNavigate } from "react-router-dom"
import { call, put, takeLatest, fork } from "redux-saga/effects"
import {
    getDocsSentByMe,
    getDocsSentToMe,
    setDocsSentByMe,
    setDocsSentToMe,
    submitTemplate,
    setDocDetail,
} from "../../slices/documentSlice"
import {
    requestGetDocsSentByme,
    requestGetDocsSentTome,
    requestPostSubmitDocument,
    requestGetDocDetail,
} from "../requests/document"

function* handleGetDocsSentByme(action) {
    try {
        const response = yield call(requestGetDocsSentByme)
        yield put(setDocsSentByMe(response.data.data))
    } catch (error) {
        // console.log(error)
    }
}

function* handleGetDocsSentTome(action) {
    try {
        const response = yield call(requestGetDocsSentTome)
        yield put(setDocsSentToMe(response.data.data))
    } catch (error) {
        // console.log(error)
    }
}

function* handlePostSubmitDocument(action) {
    try {
        const response = yield call(
            requestPostSubmitDocument,
            action.payload.data
        )
        console.log(response)
        if (response.status === 200) {
            action.payload.navigate("/workflow-service/dagui")
            message.success("Gửi thành công")
        } else {
            action.payload.navigate("/workflow-service/dagui")
            message.error("Có lỗi xảy ra, vui lòng thử lại sau !")
        }
    } catch (error) {
        action.payload.navigate("/workflow-service/dagui")
        message.error(
            "Có lỗi xảy ra, vui lòng thử lại sau hoặc liên hệ Admin !"
        )
    }
}

function* documentSagaWatcher() {
    yield takeLatest(getDocsSentByMe.type, handleGetDocsSentByme)
    yield takeLatest(getDocsSentToMe.type, handleGetDocsSentTome)
    yield takeLatest(submitTemplate.type, handlePostSubmitDocument)
}

export const documentSaga = [fork(documentSagaWatcher)]
