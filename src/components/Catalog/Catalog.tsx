import style from "./Catalog.module.css"
import { categories } from "../../common/categories"
import * as i from "../../common/interfaces"

import Card from "../Card/Card"


export default function Catalog() {

    return <section >
        <div className={style.catalog}>
            {categories.map(category => <Card
                key={category.title} category={category}
            />)}
        </div>
    </section>
}