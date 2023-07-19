import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "../utility/store"
import User from "../interfaces/User"

const initialState: User = {
    value: null
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, { payload }: PayloadAction<User>) => {
            state.value = payload
        }
    }
})

export const { setUser } = userSlice.actions

export const selectUser = (state: RootState) => state.user.value

export default userSlice.reducer