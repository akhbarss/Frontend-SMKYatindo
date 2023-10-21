import jwtDecode from "jwt-decode"
import { useEffect } from "react"
import {
    Navigate,
    Outlet,
    useLocation
} from "react-router-dom"
import useAuth from "../../hooks/useAuth"
import { JWT } from "../../types/global"

const RequireAuth = () => {
    const { setAuthUser } = useAuth()
    const location = useLocation()

    const accessToken = localStorage.getItem("accessToken")

    useEffect(() => {

        if (accessToken) {
            const tokenData = JSON.parse(atob(accessToken.split(".")[1])); // Decode payload
            const expirationTime = tokenData.exp * 1000; // Convert expiration time to milliseconds

            console.log(tokenData)
            console.log(expirationTime)
            console.log(expirationTime > Date.now())


            if (expirationTime < Date.now()) {
                // Token has expired, remove it from localStorage
                localStorage.removeItem("accessToken");
            } else {
                // Token is still valid, use it as needed
            }
        }

    }, [accessToken])

    useEffect(() => {

        async function a() {
            if (accessToken) {
                const jwt: JWT = jwtDecode(accessToken)

                const username = jwt.sub

                if (username === "admin") {
                    setAuthUser({
                        accessToken: accessToken,
                        role: ["ADMIN"]
                    })
                } else {
                    setAuthUser({
                        accessToken: accessToken,
                        role: ["SISWA"]
                    })

                }
            }
        }

        a()

    }, [accessToken, setAuthUser])

    return (
        accessToken ? <Outlet /> : <Navigate to={"/ppdb/login"} state={{ from: location }} replace />
    )
}

export default RequireAuth