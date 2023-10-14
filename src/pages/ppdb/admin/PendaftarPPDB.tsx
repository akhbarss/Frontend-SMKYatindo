import {
  Box,
  Divider
} from "@mantine/core"
import { Link } from "react-router-dom"
import { dataJalurPendaftaran } from "../../../components/ppdb/dataJalurPendaftaran"
import { useBreakPoints } from "../../../utils/UseBreakpoints"

const PendaftarPPDB = () => {

  const { xs } = useBreakPoints()
  const pendaftar = dataJalurPendaftaran

  return (
    <Box className={`style-box relative flex-1  ${xs ? "" : "flex-1  "}`} >

      <div className="w-fit  mx-auto">
        <h1 className="text-center [font-size:_clamp(1.8rem,3vw,3rem)]  font-bold mt-10 leading-8">Pendaftar PPDB</h1>
      </div>

      <Box mt={50} className="flex flex-col gap-4 px-4 pb-10 lg:w-[50rem] mx-auto">

        {
          pendaftar.map(item => {
            const tipeFormulir =
              (item.tipe === "pembelian" && <h1 className="text-xl font-bold">Pembelian Formulir</h1>)
              || (item.tipe === "pengembalian" && <h1 className="text-xl font-bold">Pengembalian Formulir</h1>)

            return (
              <Link key={item.id} to={"#"} className="mb-5">
                <Divider size={"xs"} label={tipeFormulir} />
                <div className="mt-4 flex gap-4">
                  {item.gelombang.map(gelombang => (
                    <div key={gelombang.id} className=" p-4 w-[20rem] shadow-xl rounded-md">
                      <h1 className="text-xl  font-bold">{gelombang.nama_gelombang}</h1>
                      <h1 className="text-sm">{gelombang.jumlah_penerimaan} Pendaftar</h1>
                    </div>
                  ))}
                </div>
              </Link>
              // </div>
            )
          })
        }

      </Box>

    </Box>
  )
}

export default PendaftarPPDB