import { useParams } from "react-router-dom"

const Gelombang = () => {
  const { idJalurPendaftaran } = useParams()

  return (
    <div>Gelombang {idJalurPendaftaran}</div>
  )
}

export default Gelombang