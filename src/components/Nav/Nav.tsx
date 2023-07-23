import { NavLink, useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../redux/redux hooks"

import * as i from "../../common/interfaces"
import * as service from "../../common/service"
import * as localUser from "../../common/localUser"
import * as userActions from "../../redux/features/user"
import * as usersActions from "../../redux/features/users"

import style from "./Nav.module.css"

export default function Nav() {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const user: i.User | null | undefined = useAppSelector(state => state.user.value)

    async function handleLogout() {
        if (user) {
            await service.logout({ accessToken: user.accessToken })

            dispatch(userActions.setUser(null))
            dispatch(usersActions.setUsers([]))

            localStorage.clear()

            navigate("/auth")
        }
    }

    return <> {localUser.get() ? <nav className={style.nav}>
        <NavLink to={"/catalog"} className="button">Catalog</NavLink>
        <NavLink to={"/profile"} className="button">Profile</NavLink>

        <button className="button" onClick={handleLogout}>Logout</button>
    </nav> : <h1>Sign in</h1>} </>
}