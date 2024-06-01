import { createSlice } from "@reduxjs/toolkit"
import * as i from "../../common/interfaces"

// Define a Redux slice for managing the user state
export const userSlice = createSlice({
    name: "user",
    initialState: {
        value: null
    } as i.User,
    reducers: {
        // Reducer function to update the user state
        setUser: (state, { payload }) => {
            // Update the user state with the new value
            state.value = payload
        }
    }
})

// Export the action creator
export const { setUser } = userSlice.actions

// Export the user reducer
export default userSlice.reducer