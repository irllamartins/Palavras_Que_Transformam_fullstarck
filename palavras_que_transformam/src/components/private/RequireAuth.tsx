import { useContext } from "react"
import { AuthContext } from "../auth/AuthContext"
import Register from "../../pages/home"
import MenuAppBar from "../menu/menu.app.bar"

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
    const auth = useContext(AuthContext)
    if (!auth.user) {
        return <Register />
    }
    return <MenuAppBar>
            {children}
        </MenuAppBar>
    
}