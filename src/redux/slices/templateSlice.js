import { createSlice } from "@reduxjs/toolkit"

const templateSlice = createSlice({
    name: "template",
    initialState: {
        list: [],
        listForUser: [],
        single: {},
        createTemplateSucceed: false,
    },
    reducers: {
        getTemplates() {},
        setTemplates(state, action) {
            state.list = action.payload
        },
        getTemplatesForUser() {},
        setTemplatesForUser(state, action) {
            state.listForUser = action.payload
        },
        getTemplateById() {},
        setTemplateById(state, action) {
            state.single = action.payload
        },
        createTemplate() {},
        toggleCreateTemplateSucceed(state) {
            state.createTemplateSucceed = !state.createTemplateSucceed
        },
        updateTemplate() {},
        deleteTemplate() {},
    },
})

export const {
    getTemplates,
    setTemplates,
    getTemplatesForUser,
    setTemplatesForUser,
    getTemplateById,
    setTemplateById,
    createTemplate,
    toggleCreateTemplateSucceed,
    updateTemplate,
    deleteTemplate,
} = templateSlice.actions
export default templateSlice
