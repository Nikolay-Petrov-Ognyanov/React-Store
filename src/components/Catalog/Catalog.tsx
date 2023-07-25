import { useEffect, useState } from "react"
import { useAppSelector } from "../../redux/redux hooks"

import { categories } from "../../common/categories"

import * as i from "../../common/interfaces"

import Card from "../Card/Card"

import style from "./Catalog.module.css"

export default function Catalog() {
    const cart = useAppSelector(state => state.cart.value)

    const [totalCost, setTotalCost] = useState(0)

    useEffect(() => {
        cart && setTotalCost(Object.values(cart as object).reduce((a, b) => a + b))
    }, [cart])

    function handleSubmit() {
        console.log(cart)
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