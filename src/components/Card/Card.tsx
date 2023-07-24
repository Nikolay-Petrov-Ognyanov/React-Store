import style from "./Card.module.css"

import { useEffect, useState } from "react"

import * as i from "../../common/interfaces"

import * as cartActions from "../../redux/features/cart"

import { useAppDispatch } from "../../redux/redux hooks"

export default function Card({ category }: i.CardProps) {
    const dispatch = useAppDispatch()

    const [amount, setAmount] = useState("")

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const regex = /^[0-9]*\.?[0-9]*$/
        const input = event.target.value

        if (regex.test(input)) setAmount(input)
    }

    useEffect(() => {
        dispatch(cartActions.setCart({
            name: (category.name as string).toLowerCase(),
            amount: Number(amount)
        }))
    }, [amount])

    return <div className={style.card}>
        <span>{category.name}</span>

        <input
            name={category.name}
            value={amount}
            onChange={handleInputChange}
            placeholder={`Amount(${category.unit})`}
        />
    </div>
}