import style from "./Card.module.css"
import { useEffect, useState } from "react"
import { useAppDispatch } from "../../redux/redux hooks"
import * as i from "../../common/interfaces"
import * as cartActions from "../../redux/features/cart"

export default function Card({ category }: i.CardProps) {
    const dispatch = useAppDispatch()

    const [amount, setAmount] = useState(0)

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const regex = /^[0-9]*\.?[0-9]*$/
        const input = event.target.value

        if (regex.test(input)) setAmount(Number(input))
    }

    useEffect(() => {
        dispatch(cartActions.setCart({
            name: (category.name as string).toLowerCase(),
            amount: Number(amount),
            price: Number(amount) * Number(category.price)
        }))
    }, [amount])

    return <div className={style.card}>
        <span className={style.name}>{category.name}</span>

        <span className={style.price}>
            {amount ? amount * category.price : `${category.price} / kg`}
        </span>

        <input
            className={style.amount}
            name={category.name}
            value={amount}
            onChange={handleInputChange}
            placeholder={`Amount(kg)`}
        />
    </div>
}