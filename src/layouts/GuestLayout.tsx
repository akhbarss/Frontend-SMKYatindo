import { Suspense } from 'react'
import PageLoading from '../components/PageLoading'

const GuestLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <Suspense fallback={<PageLoading />}>
            {children}
        </Suspense>
    )
}

export default GuestLayout