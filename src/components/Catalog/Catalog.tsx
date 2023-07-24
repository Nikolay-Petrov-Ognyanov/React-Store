import style from "./Catalog.module.css"
import { categories } from "../../common/categories"

import Card from "../Card/Card"

export default function Catalog() {

    function handleSubmit(event: React.FormEvent<HTMLElement>) {
        event.preventDefault()

        const formData = Object.fromEntries(new FormData(event.target as HTMLFormElement))

        console.log(Object.fromEntries(
            Object.entries(formData).filter(value => value[1])
        ))
    }

    return <section >
        <form onSubmit={handleSubmit} className={style.catalog}>
            {categories.map(category => <Card
                key={category.name} category={category}
            />)}

            <button className={`${style.buy} button`}>Buy</button>
        </form>
    </section>
}