import { call, put, takeLatest, fork } from "redux-saga/effects"
import {
    setTemplates,
    getTemplates,
    getTemplatesForUser,
    setTemplatesForUser,
    setTemplateById,
    getTemplateById,
    createTemplate,
    toggleCreateTemplateSucceed,
    updateTemplate,
    deleteTemplate,
} from "../../slices/templateSlice"
import {
    requestDeleteTemplate,
    requestGetTemplate,
    requestGetTemplateById,
    requestGetTemplateForUser,
    requestPostTemplate,
    requestPutTemplate,
} from "../requests/template"
import { message } from "antd"

function* handleGetTemplateList(action) {
    try {
        const response = yield call(requestGetTemplate)
        const { data } = response
        yield put(setTemplates(data.data))
    } catch (error) {
        console.log(error)
    }
}

function* onHandleGetTemplateList() {
    yield takeLatest(getTemplates.type, handleGetTemplateList)
}

function* handleGetTemplateListForUser(action) {
    try {
        const response = yield call(requestGetTemplateForUser)
        const { data } = response
        yield put(setTemplatesForUser(data.data))
    } catch (error) {
        console.log(error)
    }
}
function* onHandleGetTemplateListForUser() {
    yield takeLatest(getTemplatesForUser.type, handleGetTemplateListForUser)
}

function* handleGetTemplateById(action) {
    try {
        const response = yield call(requestGetTemplateById, action.payload)
        const { data } = response
        yield put(setTemplateById(...data.data))
    } catch (error) {
        console.log(error)
    }
}

function* onHandleGetTemplateById() {
    yield takeLatest(getTemplateById.type, handleGetTemplateById)
}

function* handleCreateTemplate(action) {
    try {
        const response = yield call(requestPostTemplate, action.payload.data)
        if (response.status === 200) {
            action.payload.navigate("/workflow-service/quanly_template")
            yield put(toggleCreateTemplateSucceed())
            message.success("Tạo thành công")
        }
    } catch (error) {
        console.log(error)
        message.success("Có lỗi xảy ra, vui lòng thử lại sau !")
    }
}

function* onHandleCreateTemplate() {
    yield takeLatest(createTemplate.type, handleCreateTemplate)
}

function* handleUpdateTemplate(action) {
    try {
        const response = yield call(requestPutTemplate, action.payload.data)
        if (response.status === 200) {
            if (action.payload.navigate) {
                message.success("Cập nhật thành công")
                action.payload.navigate("/workflow-service/quanly_template")
            } else {
                console.log(error)
                message.success("Có lỗi xảy ra, vui lòng thử lại sau !")
            }

            // yield put(toggleCreateTemplateSucceed())
        }
    } catch (error) {
        console.log(error)
        message.success("Có lỗi xảy ra, vui lòng thử lại sau !")
    }
}
function* onHandleUpdateTemplate() {
    yield takeLatest(updateTemplate.type, handleUpdateTemplate)
}

function* handleDeleteTemplate(action) {
    try {
        const response = yield call(requestDeleteTemplate, action.payload.data)
        if (response.data.result) {
            message.success("Xóa thành công")
            action.payload.setOpen(false)
            action.payload.setConfirmLoading(false)
            // yield put(toggleCreateTemplateSucceed())
        }
    } catch (error) {
        console.log(error)
        message.success("Có lỗi xảy ra, vui lòng thử lại sau !")
    }
}
function* onHandleDeleteTemplate() {
    yield takeLatest(deleteTemplate.type, handleDeleteTemplate)
}

export const templateSaga = [
    fork(onHandleGetTemplateList),
    fork(onHandleGetTemplateById),
    fork(onHandleCreateTemplate),
    fork(onHandleUpdateTemplate),
    fork(onHandleGetTemplateListForUser),
    fork(onHandleDeleteTemplate),
]
