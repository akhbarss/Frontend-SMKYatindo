import { useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import Loading from './loading'

const RoleRequire: React.FC<{ allowedRole: string }> = ({ allowedRole }) => {
    const { authUser } = useAuth()
    const [loading, setLoading] = useState(true)

    setTimeout(() => {
        setLoading(false)
    }, 1000);

    return (
        loading ? <Loading /> : authUser.role?.find(role => role == allowedRole) ?
            <Outlet /> : <Navigate to={"/ppdb/unauthorized"} replace />
    )
}

export default RoleRequire