import { createSlice } from "@reduxjs/toolkit"
import * as i from "../../common/interfaces"

// Define a Redux slice for managing the cart state
export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        value: null
    } as i.Cart,
    reducers: {
        // Reducer function to update the cart state
        setCart: (state, { payload }) => {
            // Destructure payload object
            const { name, amount, price } = payload

            // Update the cart state with the new item
            state.value = { ...state.value, [name]: { amount, price } }
        }
    }
})

// Export the action creator
export const { setCart } = cartSlice.actions

// Export the cart reducer
export default cartSlice.reducer