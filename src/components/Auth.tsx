import { useState } from "react"
import { useAppDispatch } from "../utility/redux hooks"
import { useNavigate } from "react-router-dom"
import * as service from "../utility/service"
import * as localUser from "../utility/localUser"
import * as userActions from "../features/user"
import * as usersActions from "../features/users"
import * as i from "../utility/interfaces"

export default function Auth() {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const [isRegistering, setIsRegistering] = useState(true)

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const formData = Object.fromEntries(new FormData(event.target as HTMLFormElement))

        if (!Object.values(formData).some(value => !value)) {
            let response: i.User | null = null

            if (isRegistering) {
                response = await service.register(formData)

                if (
                    response && "message" in response
                    && response.message === "Username is taken."
                ) {
                    response = await service.login(formData) as i.User
                } response = await service.login(formData)
            } else {
                response = await service.login(formData)
            }

            localUser.set(response as i.User)

            dispatch(userActions.setUser(response))

            const { users } = await service.readUsers()

            dispatch(usersActions.setUsers(users))

            if (users.length > 0 && !users.find((user: i.User) => {
                if (response === null) return

                return user._id === response._id
            })) {
                dispatch(usersActions.addUser(response as i.User))
            }

            navigate("/")
        }
    }


    return <section>
        <form onSubmit={handleSubmit}>
            <input type="text" name="username" />
            <input type="password" name="password" />

            <div className="buttonsWrapper">
                <button onClick={() => setIsRegistering(true)} >Register</button>
                <button onClick={() => setIsRegistering(false)} >Login</button>
            </div>
        </form>
    </section>
}