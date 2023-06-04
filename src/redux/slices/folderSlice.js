import { createSlice } from "@reduxjs/toolkit"

const folderSlice = createSlice({
    name: "folder",
    initialState: [],
    reducers: {
        getFolder() {},
        setFolder(state, action) {
            if (action.payload.length === 0) {
                return
            } else {
                return action.payload
            }
        },
        createFolder() {},
    },
})

export const { getFolder, setFolder, createFolder } = folderSlice.actions
export default folderSlice
