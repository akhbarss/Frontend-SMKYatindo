import {
  Box,
  Tabs
} from "@mantine/core"
import { useEffect, useMemo, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { dataJalurPendaftaran } from "../../../components/ppdb/dataJalurPendaftaran"
import { useBreakPoints } from "../../../utils/UseBreakpoints"

const UjianPPDB = () => {

  const [active, setActive] = useState("")

  const { xs } = useBreakPoints()
  const { pathname: pathUrl } = useLocation()

  const menuUjianPenerimaan = useMemo(() => [
    { label: "Jadwal Ujian", path: "/ppdb/admin/ujian-ppdb" },
    { label: "Bank Soal", path: "/ppdb/admin/ujian-ppdb/soal" },
  ], [])

  useEffect(() => {
    const activeLink = menuUjianPenerimaan.find(menu => pathUrl === menu.path)

    if (activeLink) {
      setActive(activeLink.label)
    }

  }, [menuUjianPenerimaan, pathUrl])

  const pendaftar = dataJalurPendaftaran

  return (
    <Box className={`style-box relative flex-1 ${xs ? "" : "flex-1  "}`} >

      <div className="w-fit  mx-auto">
        <h1 className="text-center [font-size:_clamp(1.8rem,3vw,3rem)]  font-bold mt-10 leading-8">Ujian Penerimaan</h1>
      </div>

      <div className="w-fit mx-auto flex gap-4 mt-10 font-bold">
        {
          menuUjianPenerimaan.map((menu, i) => (
            <Link
              key={i}
              to={menu.path}
              className="font-bold"
              style={{
                color: `${active === menu.label ? "#3B82F6" : ""}`
              }}
            >
              {menu.label}
            </Link>
          ))
        }
      </div>

      <Box mt={50} className="flex flex-col gap-4 px-4 pb-10 lg:w-[50rem] mx-auto p-5 rounded-md">

        <Tabs defaultValue={"berlangsung"}>
          <Tabs.List>
            <Tabs.Tab value="berlangsung"
            // icon={<IconPhoto size="0.8rem" />}
            >
              <h1 className="text-xl">Berlangsung</h1>
            </Tabs.Tab>
            <Tabs.Tab value="akan-datang"
            // icon={<IconMessageCircle size="0.8rem" />}
            >
              <h1 className="text-xl">Akan Datang</h1>
            </Tabs.Tab>
            <Tabs.Tab value="sudah-selesai"
            // icon={<IconSettings size="0.8rem" />}
            >
              <h1 className="text-xl">Sudah Selesai</h1>
            </Tabs.Tab>
          </Tabs.List>
        </Tabs>

      </Box>

    </Box>
  )
}

export default UjianPPDB