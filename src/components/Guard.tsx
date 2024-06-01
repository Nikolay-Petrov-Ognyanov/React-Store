import { Navigate, useLocation, Outlet } from "react-router-dom"
import * as localUser from "../common/localUser"

export default function Guard() {
    const location = useLocation()

    // Check if user is authenticated
    if (!localUser.get()) {
        // If not authenticated, redirect to the authentication page
        return <Navigate to={"/auth"} replace state={{ from: location }} />
    }

    // If authenticated, render the child routes
    return <Outlet />
}