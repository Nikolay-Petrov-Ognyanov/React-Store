import style from "./Card.module.css"
import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../redux/redux hooks"
import * as i from "../../common/interfaces"
import * as cartActions from "../../redux/features/cart"
import { RootState } from "../../redux/store"

export default function Card({ category }: i.CardProps) {
    const dispatch = useAppDispatch()

    // Get user data from Redux store
    const user = useAppSelector((state: RootState) => state.user.value)

    // Local state to manage the amount of items
    const [amount, setAmount] = useState(0)

    // Reset amount when user changes
    useEffect(() => setAmount(0), [user])

    // Handle input change for amount
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const regex = /^[0-9]*\.?[0-9]*$/
        const input = event.target.value
        // Check if input matches the allowed format
        if (regex.test(input)) setAmount(Number(input))
    }

    // Update cart when amount changes
    useEffect(() => {
        // Dispatch action to update cart
        dispatch(cartActions.setCart({
            name: (category.name as string).toLowerCase(),
            amount: Number(amount),
            price: Number(amount) * Number(category.price)
        }))
    }, [amount, category.name, category.price, dispatch])

    return (
        <div className={style.card}>
            {/* Display category name */}
            <span className={style.name}>{category.name}</span>
            {/* Display price */}
            <span className={style.price}>
                {amount ? amount * category.price : `${category.price} / kg`}
            </span>
            {/* Input field for amount */}
            <input
                className={style.amount}
                name={category.name}
                value={amount}
                onChange={handleInputChange}
                placeholder={`Amount(kg)`}
            />
        </div>
    )
}