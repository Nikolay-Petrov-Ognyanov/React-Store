import style from "./Catalog.module.css"
import { categories } from "../../common/categories"

import Card from "../Card/Card"
import { useEffect, useState } from "react"
import { useAppSelector } from "../../redux/redux hooks"

export default function Catalog() {
    const cart = useAppSelector(state => state.cart.value)

    const [totalCost, setTotalCost] = useState(0)

    useEffect(() => {
        cart && setTotalCost(Object.values(cart as object).reduce((a, b) => a + b))
    }, [cart])

    function handleSubmit(event: React.FormEvent<HTMLElement>) {
        event.preventDefault()

        const formData = Object.fromEntries(
            new FormData(event.target as HTMLFormElement)
        )

        console.log(Object.fromEntries(
            Object.entries(formData).filter(value => value[1])
        ))
    }

    return <section >
        <header className={style.header}>
            <span>Name</span> <span>Price</span> <span>Amount(kg)</span>
        </header>

        <form onSubmit={handleSubmit} className={style.catalog}>
            {categories.map(category => <Card
                key={category.name} category={category}
            />)}

            <p>Total cost: {totalCost}</p>

            <button className={`${style.buy} button`}>Buy</button>
        </form>
    </section>
}