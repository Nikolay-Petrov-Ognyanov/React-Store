// Import CSS file and required dependencies
import "./App.css"
import { useEffect } from "react"
import { Routes, Route } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "./redux/redux hooks"
import * as localUser from "./common/localUser"
import * as userActions from "./redux/features/user"
import Auth from "./components/Auth/Auth"
import Nav from "./components/Nav/Nav"
import Catalog from "./components/Catalog/Catalog"
import Guard from "./components/Guard"
import Profile from "./components/Profile/Profile"

// Define the App component
export default function App() {
    // Redux hooks for dispatching actions and accessing state
    const dispatch = useAppDispatch()
    const user = useAppSelector(state => state.user.value)

    // Effect hook to check for user data on component mount
    useEffect(() => {
        // Check if user data is not available and retrieve from local storage
        if (!user && localUser.get()) {
            // Dispatch action to set user data from local storage
            dispatch(userActions.setUser(localUser.get()))
        }
    }, [dispatch, user])

    // JSX structure of the App component with routing and conditional rendering
    return (
        <div className="App">
            {/* Render navigation component */}
            <Nav />

            {/* Define routes for authentication, catalog, profile, and fallback */}
            <Routes>
                <Route path="/auth" element={<Auth />} />

                {/* Use Guard component to protect routes */}
                <Route element={<Guard />}>
                    <Route path="/catalog" element={<Catalog />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="*" element={<Catalog />} />
                </Route>
            </Routes>
        </div>
    )
}