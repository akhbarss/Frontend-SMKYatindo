import React from 'react'
import { useParams } from 'react-router-dom'

const DetailSiswa = () => {
    const { userId } = useParams()

    return (
        <div>
            <h1>DetailSiswa</h1>
            Id User {userId}
        </div>
    )
}

export default DetailSiswa