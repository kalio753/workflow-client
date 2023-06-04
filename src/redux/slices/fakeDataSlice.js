import { createSlice } from "@reduxjs/toolkit"

const fakeDataSlice = createSlice({
    name: "fakeData",
    initialState: {
        listUsers: [],
        listParts: [],
        listPositions: [],
    },
    reducers: {
        getUsers() {},
        getParts() {},
        getPositions() {},

        setUsers(state, action) {
            state.listUsers = action.payload
        },
        setParts(state, action) {
            state.listParts = action.payload
        },
        setPositions(state, action) {
            state.listPositions = action.payload
        },
    },
})

export const { 
    getUsers, getParts, getPositions, setUsers, setPositions, setParts
} = fakeDataSlice.actions
export default fakeDataSlice
