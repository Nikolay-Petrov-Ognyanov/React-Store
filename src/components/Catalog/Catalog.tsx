import { useEffect, useState } from "react"
import { useAppSelector } from "../../redux/redux hooks"

import { categories } from "../../common/categories"

// import * as i from "../../common/interfaces"

import Card from "../Card/Card"

import * as i from "../../common/interfaces"

import style from "./Catalog.module.css"

export default function Catalog() {
    const user = useAppSelector(state => state.user.value)
    const cart = useAppSelector(state => state.cart.value)

    const [totalCost, setTotalCost] = useState(0)

    useEffect(() => {
        if (cart) {
            const prices = Object.values(cart as i.Cart).map(item => item.price)

            setTotalCost(prices.reduce((a, b) => a + b))
        }

        console.log(user)
    }, [cart])

    function handleSubmit() {
        const purchase = Object.fromEntries(Object.entries(cart as i.Cart).map(item => {
            return [[item[0]], item[1].amount]
        }))

        console.log(purchase)
    }

    return <section >
        <header className={style.header}>
            <span>Category</span> <span>Price(BGN)</span> <span>Amount(kg)</span>
        </header>

        <div className={style.catalog}>
            {categories.map(category => <Card
                key={category.name} category={category}
            />)}

            <p>Total cost: {totalCost} BGN</p>

            <button onClick={handleSubmit} className={`${totalCost
                ? `${style.buy_active}` : `${style.buy_inactive}`} button`
            }>Buy</button>
        </div>
    </section>
}