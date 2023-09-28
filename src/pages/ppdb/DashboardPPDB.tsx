
import AlurPendaftaran from "../../components/ppdb/alurPendaftaran"
import Ppdb from "../../components/ppdb/ppdb"
import JalurPendaftaran from '../../components/ppdb/jalurPendaftaran'

const DashboardPPDB = () => {
  

  return (
    <main id="dashboard-ppdb" className="style-box ">
      
      <Ppdb />

      <AlurPendaftaran />
      
      <JalurPendaftaran />
      
    </main>
  )
}

export default DashboardPPDB