import { createSlice } from "@reduxjs/toolkit"

const actionSlice = createSlice({
    name: "action",
    initialState: [],
    reducers: {
        getActions() {},
        setActions(state, action) {
            return action.payload
        },
    },
})

export const { getActions, setActions } = actionSlice.actions
export default actionSlice
