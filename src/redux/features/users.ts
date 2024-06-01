import { createSlice } from "@reduxjs/toolkit"
import * as i from "../../common/interfaces"

// Define a Redux slice for managing the users state
export const usersSlice = createSlice({
    name: "users",
    initialState: [] as i.User[],
    reducers: {
        // Reducer function to set the users array
        setUsers: (state, { payload }) => {
            // Update the users state with the new array
            return state = payload
        },
        // Reducer function to add a user to the users array
        addUser: (state, { payload }) => {
            // Push the new user to the users array
            state.push(payload)
        },
        // Reducer function to update a user in the users array
        updateUser: (state, { payload }) => {
            // Update the user in the users array with the matching _id
            return state = state.map(u => u._id === payload._id ? payload : u)
        }
    }
})

// Export the action creators
export const { setUsers, addUser, updateUser } = usersSlice.actions

// Export the users reducer
export default usersSlice.reducer