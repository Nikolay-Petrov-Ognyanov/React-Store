import CategoryCard from "../CategoryCard/CategoryCard"
import categories from "../../food/categories"

import style from "./Catalog.module.css"

export default function Catalog() {

    return <section className={style.catalog}>
        {categories.map(c => <CategoryCard
            key={c.name} name={c.name}
        />)}
    </section>
}