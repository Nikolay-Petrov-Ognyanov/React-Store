import { configureStore } from "@reduxjs/toolkit"

import user from "./features/user"
import users from "./features/users"
import cart from "./features/cart"

const store = configureStore({
    reducer: {
        user,
        users,
        cart
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store