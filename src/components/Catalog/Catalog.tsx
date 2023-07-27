import style from "./Catalog.module.css"
import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../redux/redux hooks"
import { categories } from "../../common/categories"
import Card from "../Card/Card"
import * as i from "../../common/interfaces"
import * as service from "../../common/service"
import * as userActions from "../../redux/features/user"
import * as usersActions from "../../redux/features/users"
import * as localUser from "../../common/localUser"

export default function Catalog() {
    const dispatch = useAppDispatch()

    const user = useAppSelector(state => state.user.value)
    const cart = useAppSelector(state => state.cart.value)

    const [totalCost, setTotalCost] = useState(0)

    useEffect(() => {
        if (cart) {
            const prices = Object.values(cart as i.Cart).map(item => item.price)

            setTotalCost(prices.reduce((a, b) => a + b))
        }
    }, [cart])

    async function handleSubmit() {
        const purchase: i.Purchase = Object.fromEntries(Object.entries(cart as i.Cart).map(item => {
            return [[item[0]], item[1].amount]
        }))

        const currentUser: i.User = { ...user }

        if (currentUser.purchases) {
            const updatedUser: i.User = {
                ...currentUser,
                purchases: {
                    fruits: currentUser.purchases.fruits + purchase.fruits,
                    vegetables: currentUser.purchases.vegetables + purchase.vegetables,
                    grains: currentUser.purchases.grains + purchase.grains,
                    beans: currentUser.purchases.beans + purchase.beans,
                    mushrooms: currentUser.purchases.mushrooms + purchase.mushrooms,
                }
            }

            await service.updateUser(updatedUser)
            dispatch(userActions.setUser(updatedUser))
            dispatch(usersActions.updateUser(updatedUser))
            localUser.set(updatedUser)
        }
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
                ? `${style.purchase_active}` : `${style.purchase_inactive}`} button`
            }>Purchase</button>
        </div>
    </section>
}