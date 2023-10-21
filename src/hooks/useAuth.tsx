import { useContext } from "react"
import AuthContext from "../context/authProvider"
import type { AuthContextType } from "../context/authProvider"

const useAuth = (): AuthContextType  => {
   
    return useContext(AuthContext)
}

export default useAuth