import { createSlice } from "@reduxjs/toolkit"

const globalVariableSlice = createSlice({
    name: "globalVariable",
    initialState: {
        token: "",
        newDocJsonData: {},
        editingTemplate: {},
        filePath: [],
        jsonData: undefined,
    },
    reducers: {
        setToken(state, action) {
            state.token = action.payload
        },
        setNewDocJsonData(state, action) {
            state.newDocJsonData = action.payload
        },
        setEditingTemplate(state, action) {
            state.editingTemplate = action.payload
        },
        setFilePath(state, action) {
            state.filePath.push(action.payload)
        },
        setJsonData(state, action) {
            state.jsonData = action.payload
        },
    },
})

export const {
    setToken,
    setNewDocJsonData,
    setEditingTemplate,
    setFilePath,
    setJsonData,
} = globalVariableSlice.actions

export default globalVariableSlice
