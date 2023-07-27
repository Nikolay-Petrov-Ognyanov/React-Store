import { useAppSelector } from "../../redux/redux hooks"
import { RootState } from "../../redux/store"
import * as i from "../../common/interfaces"

export default function Profile() {
    const user = useAppSelector((state: RootState) => state.user.value)

    const username = user && (user as i.User).username
    const purchases = user && (user as i.User).purchases

    return <section>
        <h1>{username && username[0].toUpperCase() + username.slice(1)}'s purchases</h1>

        {purchases && Object.entries(purchases).map(category => {
            const name = category[0][0].toLocaleUpperCase() + category[0].slice(1)

            return <p key={category[0]}>  {name}: {category[1]} kg</p>
        })}
    </section>
}