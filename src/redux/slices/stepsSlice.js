import { createSlice } from "@reduxjs/toolkit"

const stepsSlice = createSlice({
    name: "steps",
    initialState: [],
    reducers: {
        getStepsById() {},
        setStepsById(state, action) {
            return action.payload
        },
    },
})

export const { getStepsById, setStepsById } = stepsSlice.actions
export default stepsSlice
