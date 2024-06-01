import { configureStore } from "@reduxjs/toolkit" // Importing configureStore function from Redux Toolkit

import user from "./features/user" // Importing user reducer
import users from "./features/users" // Importing users reducer
import cart from "./features/cart" // Importing cart reducer

// Creating the Redux store with combined reducers
const store = configureStore({
    reducer: {
        user, // Assigning user reducer to 'user' key in store
        users, // Assigning users reducer to 'users' key in store
        cart, // Assigning cart reducer to 'cart' key in store
    }
})

export type RootState = ReturnType<typeof store.getState> // Defining RootState type using ReturnType to infer the state type from store
export type AppDispatch = typeof store.dispatch // Defining AppDispatch type to use for dispatching actions

export default store // Exporting the Redux store