import { useState } from "react"

export default function Auth() {
    const [isRegistering, setIsRegistering] = useState(true)

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const formData = Object.fromEntries(new FormData(event.target as HTMLFormElement))

        if (!Object.values(formData).some(value => !value)) {
            if (isRegistering) {
                
            } else {
                
            }
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