import style from "./Nav.module.css"
import { NavLink, useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../redux/redux hooks"
import * as i from "../../common/interfaces"
import * as service from "../../common/service"
import * as localUser from "../../common/localUser"
import * as userActions from "../../redux/features/user"
import * as usersActions from "../../redux/features/users"

export default function Nav() {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    // Get user data from Redux store
    const user: i.User | null | undefined = useAppSelector(state => state.user.value)

    // Handle logout action
    async function handleLogout() {
        if (user) {
            // Call logout service to revoke access token
            await service.logout({ accessToken: user.accessToken })

            // Clear user data from Redux store
            dispatch(userActions.setUser(null))
            dispatch(usersActions.setUsers([]))

            // Clear local storage
            localStorage.clear()

            // Navigate to authentication page
            navigate("/auth")
        }
    }

    return (
        <>
            {localUser.get() ? ( // Check if user is authenticated
                <nav className={style.nav}>
                    {/* Navigation links */}
                    <NavLink to={"/catalog"} className="button">Catalog</NavLink>
                    <NavLink to={"/profile"} className="button">Profile</NavLink>
                    
                    {/* Logout button */}
                    <button className="button" onClick={handleLogout}>Logout</button>
                </nav>
            ) : ( // Render sign-in message if user is not authenticated
                <h1>Sign in</h1>
            )}
        </>
    )
}