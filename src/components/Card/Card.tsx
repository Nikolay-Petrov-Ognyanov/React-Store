import style from "./Card.module.css"

import * as i from "../../common/interfaces"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import { faCircleMinus } from '@fortawesome/free-solid-svg-icons'

export default function Card({ category }: i.CardProps) {


    return <div className={style.card}>
        <span>
            {category.title}
        </span>

        <span>
            {category.price}
        </span>

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