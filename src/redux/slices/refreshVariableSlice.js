import { createSlice } from "@reduxjs/toolkit"

const refreshVariableSlice = createSlice({
    name: "refreshVariable",
    initialState: {
        createStepSucceed: false,
    },
    reducers: {
        toggleCreateStepSucceed(state) {
            state.createStepSucceed = !state.createStepSucceed
        }
    },
})

export const { toggleCreateStepSucceed } = refreshVariableSlice.actions

export default refreshVariableSlice
