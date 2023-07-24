import style from "./Card.module.css"

import { useState } from "react"

import * as i from "../../common/interfaces"

export default function Card({ category }: i.CardProps) {
    const [amount, setAmount] = useState("")

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const regex = /^[0-9]*\.?[0-9]*$/
        const input = event.target.value

        if (regex.test(input)) setAmount(input)
    }

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