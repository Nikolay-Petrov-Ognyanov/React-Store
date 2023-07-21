import { createSlice } from "@reduxjs/toolkit"

import * as i from "../../utility/interfaces"

export const userSlice = createSlice({
    name: "user",
    initialState: {
        value: null
    } as i.User,
    reducers: {
        setUser: (state, { payload }) => {
            state.value = payload
        }
    }
})

export const { setUser } = userSlice.actions

export default userSlice.reducer