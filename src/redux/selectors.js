import { createSelector } from "@reduxjs/toolkit"

export const getTemplateSelector = (state) => state.template?.list
export const getTemplateForUserSelector = (state) => state.template?.listForUser
export const getTemplateSelectorById = (state) => state.template?.single
export const getFolderSelector = (state) => state.folder
export const getActionSelector = (state) => state.action
export const getModalCreateStepVisibleSelector = (state) =>
    state.modalVisible?.isModalCreateStepVisible
export const getPartListSelector = (state) => state.fakeData?.listParts
export const getPositionListSelector = (state) => state.fakeData?.listPositions
export const getUserListSelector = (state) => state.fakeData?.listUsers
export const getStepsByIdSelector = (state) => state.steps
export const getCreateTemplateSucceedSelector = (state) =>
    state?.template?.createTemplateSucceed
export const getRefreshCreateStepSucceedSelector = (state) =>
    state.refreshVariable?.createStepSucceed
export const getTokenSelector = (state) => state.globalVariable?.token
export const getNewDocJsonDataSelector = (state) =>
    state.globalVariable?.newDocJsonData
export const getDocsSentByMeSelector = (state) => state.documents?.docsSentByMe
export const getDocsSentToMeSelector = (state) => state.documents?.docsSentToMe
export const getDocDetailSelector = (state) => state.documents?.docDetail
export const getEditingTemplateSelector = (state) =>
    state.globalVariable.editingTemplate
export const getFilePath = (state) => state.globalVariable?.filePath
export const getJsonData = (state) => state.globalVariable?.jsonData
