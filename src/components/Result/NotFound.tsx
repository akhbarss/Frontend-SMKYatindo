import { useNavigate } from 'react-router-dom'

const MissingPPDB = () => {
    const navigate = useNavigate()

    return (
        <div className="h-[100vh]">
            <h1>Not Found</h1>
            <button onClick={() => navigate(-1)}>Back</button>
        </div>
    )
}

export default MissingPPDB