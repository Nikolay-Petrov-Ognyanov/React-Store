import { configureStore } from "@reduxjs/toolkit"

import user from "./features/user"
import users from "./features/users"

const store = configureStore({
    reducer: {
        user,
        users,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store