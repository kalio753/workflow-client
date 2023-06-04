import { createSlice } from "@reduxjs/toolkit"

const modalVisibleSlice = createSlice({
    name: "modalVisible",
    initialState: {
        isModalCreateStepVisible: false,
    },
    reducers: {
        toggleModalCreateStepVisible(state) {
            state.isModalCreateStepVisible = !state.isModalCreateStepVisible
        }
    },
})

export const { toggleModalCreateStepVisible } = modalVisibleSlice.actions

export default modalVisibleSlice
