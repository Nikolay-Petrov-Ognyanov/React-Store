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

    // Initial state for form inputs and errors
    const initialState = { username: "", password: "" }
    const [inputs, setInputs] = useState(initialState)
    const [errors, setErrors] = useState({ ...initialState, server: "" })

    // State to manage whether the user is registering or logging in
    const [isRegistering, setIsRegistering] = useState(true)

    // Function to handle input change event
    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target
        setInputs({ ...inputs, [name]: value })
        setErrors({ ...errors, server: "" }) // Clear server error
        validateInput(event) // Validate input
    }

    // Function to validate input based on input name
    function validateInput(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target
        setErrors(prevState => {
            const newState = { ...prevState, [name]: "" } // Clear previous error message
            if (name === "username" && (value.length < 2 || value.length > 20)) {
                newState[name] = "Username must be between 2 and 20 characters long."
            } else if (name === "password" && value.length < 5) {
                newState[name] = "Password must be at least 5 characters long."
            }
            return newState
        })
    }

    // Function to handle form submission
    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const formData = Object.fromEntries(new FormData(event.target as HTMLFormElement))
        if (!Object.values(formData).some(value => !value)) {
            let response: i.User | null = null
            // Register or login based on the form state
            if (isRegistering) {
                response = await service.register(formData)
                // If username is taken, try to login instead
                if (response && "message" in response && response.message === "Username is taken.") {
                    response = await service.login(formData)
                }
            } else {
                response = await service.login(formData)
            }
            // Save user data to local storage and dispatch actions
            localUser.set(response as i.User)
            dispatch(userActions.setUser(response))
            const { users } = await service.readUsers()
            dispatch(usersActions.setUsers(users))
            // Add user to the store if not already present
            if (users.length > 0 && !users.find((user: i.User) => user._id === response?._id)) {
                dispatch(usersActions.addUser(response as i.User))
            }
            // Redirect to catalog page
            navigate("/catalog")
        }
    }

    return (
        <section>
            <form onSubmit={handleSubmit}>
                {/* Username input field */}
                <input
                    type="text"
                    name="username"
                    className={style.input}
                    value={inputs.username}
                    onChange={handleInputChange}
                    onBlur={validateInput}
                />
                {/* Password input field */}
                <input
                    type="password"
                    name="password"
                    className={style.input}
                    value={inputs.password}
                    onChange={handleInputChange}
                    onBlur={validateInput}
                />
                {/* Buttons to switch between registration and login */}
                <div className="buttonsWrapper">
                    <button
                        className={style.button}
                        onClick={() => setIsRegistering(true)}
                    >
                        Register
                    </button>
                    <button
                        className={style.button}
                        onClick={() => setIsRegistering(false)}
                    >
                        Login
                    </button>
                </div>
            </form>
            {/* Display input errors */}
            <div className="errorsWrapper">
                {errors.username && <p className="error">{errors.username}</p>}
                {errors.password && <p className="error">{errors.password}</p>}
                {errors.server && <p className="error">{errors.server}</p>}
            </div>
        </section>
    )
}