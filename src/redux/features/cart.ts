import { createSlice } from "@reduxjs/toolkit"

import * as i from "../../common/interfaces"

export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        value: null
    } as i.Cart,
    reducers: {
        setCart: (state, { payload }) => {
            const { name, amount } = payload

            state.value = { ...state.value, [name]: amount }
        }
    }
})

export const { setCart} = cartSlice.actions

export default cartSlice.reducer