import { Navigate, useLocation, Outlet } from "react-router-dom"
import * as localUser from "../common/localUser"

export default function Guard() {
    const location = useLocation()

    if (!localUser.get()) {
        return <Navigate to={"/auth"} replace state={{ from: location }} />
    }

    return <Outlet />
}