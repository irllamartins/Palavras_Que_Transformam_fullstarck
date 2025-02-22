import { useContext } from "react"
import { AuthContext } from "../auth/AuthContext"
import Register from "../../pages/home"

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
    const auth = useContext(AuthContext)
    if (!auth.user) {
        return <Register />
    }
    return children
}