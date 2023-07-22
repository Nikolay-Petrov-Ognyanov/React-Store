import style from "./CategoryCard.module.css"

import * as i from "../../utility/interfaces"
import { useNavigate } from "react-router-dom"

export default function CategoryCard({ name }: i.CategoryCard) {
    const navigate = useNavigate()

    function viewCategory() {
        navigate(`/catalog/${name.toLowerCase().split(" ").join("_")}`)
    }

    return <div className={style.CategoryCard} onClick={viewCategory}>
        {name}
    </div>
}