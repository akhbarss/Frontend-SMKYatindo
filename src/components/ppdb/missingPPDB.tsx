import { useNavigate } from 'react-router-dom'

const MissingPPDB = () => {
    const navigate = useNavigate()

    return (
        <div className="h-[100vh]">
            <h1>Not Found</h1>
            {/* <Link to={"/ppdb"} >back to ppdb</Link> */}
            <button onClick={() => navigate("/ppdb")}>Back</button>
        </div>
    )
}

export default MissingPPDB