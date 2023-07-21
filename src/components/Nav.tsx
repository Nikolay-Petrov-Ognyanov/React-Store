import { NavLink, useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../utility/redux hooks"

import * as localUser from "../utility/localUser"
import * as service from "../utility/service"
import * as i from "../utility/interfaces"

import * as userActions from "../features/user"

export default function Nav() {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const user: i.User | null | undefined = useAppSelector(state => state.user.value)

    async function handleLogout() {
        if (user) {
            await service.logout({ accessToken: user.accessToken })

            dispatch(userActions.setUser(null))

            localStorage.clear()

            navigate("/auth")
        }
    }

    return <> {localUser.get() ? <nav>
        <NavLink to={"/"} className="button">Catalog</NavLink>
        <NavLink to={"/cart"} className="button">Cart</NavLink>
        <NavLink to={"/profile"} className="button">Profile</NavLink>

        <button onClick={handleLogout}>Logout</button>
    </nav> : <h1>Sign in</h1>} </>
}