import style from "./Auth.module.css"
import { useState } from "react"
import { useAppDispatch } from "../../redux/redux hooks"
import { useNavigate } from "react-router-dom"
import * as service from "../../common/service"
import * as localUser from "../../common/localUser"
import * as userActions from "../../redux/features/user"
import * as usersActions from "../../redux/features/users"
import * as i from "../../common/interfaces"

export default function Auth() {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const initialState = { username: "", password: "" }

    const [inputs, setInputs] = useState(initialState)
    const [errors, setErrors] = useState({ ...initialState, server: "" })

    const [isRegistering, setIsRegistering] = useState(true)

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target

        setInputs({ ...inputs, [name]: value })
        setErrors({ ...errors, server: "" })

        validateInput(event)
    }

    function validateInput(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target

        setErrors(state => {
            const stateObject = { ...state, [name]: "" }

            if (name === "username") {
                if (value.length < 2 || value.length > 20) {
                    stateObject[name] = "Username must be between 2 and 20 characters long."
                }
            } else if (name === "password") {
                if (value.length < 5) {
                    stateObject[name] = "Password must be at least 5 characters long."
                }
            }

            return stateObject
        })
    }

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
                ) response = await service.login(formData)
            } else response = await service.login(formData)

            localUser.set(response as i.User)

            dispatch(userActions.setUser(response))

            const { users } = await service.readUsers()

            dispatch(usersActions.setUsers(users))

            if (users.length > 0 && !users.find((user: i.User) => {
                return response && user._id === response._id
            })) dispatch(usersActions.addUser(response as i.User))

            navigate("/catalog")
        }
    }

    return <section>
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="username"
                className={style.input}
                value={inputs.username}
                onChange={handleInputChange}
                onBlur={validateInput}
            />

            <input
                type="password"
                name="password"
                className={style.input}
                value={inputs.password}
                onChange={handleInputChange}
                onBlur={validateInput}
            />

            <div className="buttonsWrapper">
                <button
                    className={style.button}

                    onClick={() => setIsRegistering(true)}
                >Register</button>

                <button
                    className={style.button}
                    onClick={() => setIsRegistering(false)}
                >Login</button>
            </div>
        </form>

        <div className="errorsWrapper">
            {errors.username && <p className="error">{errors.username}</p>}
            {errors.password && <p className="error">{errors.password}</p>}
            {errors.server && <p className="error">{errors.server}</p>}
        </div>
    </section>
}