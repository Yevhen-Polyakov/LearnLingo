import { Navigate, Outlet, useOutletContext } from "react-router-dom"
import { useAuthStore } from "../../lib/store/authStore"
import type { OutletContext } from "../Layout/Layout"

const PrivateRouter = () => {
    const isInitialized = useAuthStore((state) => state.isInitialized)
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn)
    const outletContext = useOutletContext<OutletContext>()

    if(!isInitialized){
        return null
    }

    if(!isLoggedIn){
        return<Navigate to="/Home" replace/>
    }
    return (
        <Outlet context={outletContext}/>
    )
}

export default PrivateRouter