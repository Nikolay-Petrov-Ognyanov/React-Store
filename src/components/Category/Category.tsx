import style from "./Category.module.css"

import { useParams } from "react-router-dom"

export default function Category() {
    const params = useParams()
    const category = params.category as string

    return <section className={style.Category}>
        {category[0].toLocaleUpperCase() + category.slice(1).split("_").join(" ")}
    </section>
}