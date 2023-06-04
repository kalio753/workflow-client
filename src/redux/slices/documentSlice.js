import { createSlice } from "@reduxjs/toolkit"

const documentSlice = createSlice({
    name: "document",
    initialState: {
        docsSentByMe: [],
        docsSentToMe: [],
        docDetail: {},
    },
    reducers: {
        getDocsSentByMe() {},
        setDocsSentByMe(state, action) {
            state.docsSentByMe = action.payload
        },
        getDocsSentToMe() {},
        setDocsSentToMe(state, action) {
            state.docsSentToMe = action.payload
        },
        submitTemplate() {},
        setDocDetail(state, action) {
            state.docDetail = action.payload
        },
    },
})

export const {
    getDocsSentByMe,
    getDocsSentToMe,
    setDocsSentToMe,
    setDocsSentByMe,
    submitTemplate,
    setDocDetail,
} = documentSlice.actions

export default documentSlice
