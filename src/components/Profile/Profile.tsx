import { useAppSelector } from "../../redux/redux hooks"
import { RootState } from "../../redux/store"
import * as i from "../../common/interfaces"

export default function Profile() {
    // Get user data from Redux store
    const user = useAppSelector((state: RootState) => state.user.value)

    // Extract username and purchases from user data
    const username = user && (user as i.User).username
    const purchases = user && (user as i.User).purchases

    return (
        <section>
            {/* Display username */}
            <h1>{username && username[0].toUpperCase() + username.slice(1)}'s purchases</h1>

            {/* Display user's purchases */}
            {purchases && Object.entries(purchases).map(category => {
                // Capitalize category name
                const name = category[0][0].toLocaleUpperCase() + category[0].slice(1)
                
                // Render category name and purchased amount
                return <p key={category[0]}> {name}: {category[1]} kg</p>
            })}
        </section>
    )
}