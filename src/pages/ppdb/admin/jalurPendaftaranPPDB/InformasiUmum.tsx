import { useParams } from "react-router-dom"


const InformasiUmum = () => {
    const { idJalurPendaftaran } = useParams()

    return (
        <div>InformasiUmum {idJalurPendaftaran}</div>
    )
}

export default InformasiUmum