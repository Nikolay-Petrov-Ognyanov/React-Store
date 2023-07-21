import { createSlice } from "@reduxjs/toolkit"

import * as i from "../../utility/interfaces"

export const usersSlice = createSlice({
    name: "users",
    initialState: [] as i.User[],
    reducers: {
        setUsers: (state, { payload }) => {
            return state = payload
        },
        addUser: (state, { payload }) => {
            state.push(payload)
        },
        updateUser: (state, { payload }) => {
            return state = state.map(u => u._id === payload._id ? payload : u)
        }
    }
})

export const { setUsers, addUser, updateUser } = usersSlice.actions

export default usersSlice.reducer