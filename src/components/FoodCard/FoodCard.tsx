import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import { faCircleMinus } from '@fortawesome/free-solid-svg-icons'

import style from "./FoodCard.module.css"


export default function Card() {


    return <div className={style.card}>
        <span>Food</span> <span>Price</span>

        <div className={style.icons_container}>
            <FontAwesomeIcon
                className={style.icon}
                style={{ color: "black" }}
                icon={faCirclePlus}
            />

            <FontAwesomeIcon
                className={style.icon}
                style={{ color: "black" }}
                icon={faCircleMinus}
            />
        </div>
    </div>
}