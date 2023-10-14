import {
  ActionIcon,
  Box,
  useMantineTheme
} from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { AiFillEdit } from "react-icons/ai"
import { BsFillTrashFill } from "react-icons/bs"
import { Link } from "react-router-dom"
import CustomModal from "../../../components/ppdb/customModal"
import { dataJalurPendaftaran } from "../../../components/ppdb/dataJalurPendaftaran"
import { useBreakPoints } from "../../../utils/UseBreakpoints"

const AlurPPPDB = () => {

  const [opened, { open, close }] = useDisclosure(false);
  const { xs } = useBreakPoints()
  const theme = useMantineTheme()
  const dark = theme.colorScheme === 'dark'

  const data = dataJalurPendaftaran

  return (
    <Box className={`style-box relative flex-1  ${xs ? "" : "flex-1  "}`} >


      <div className="w-fit  mx-auto">
        <h1 className="text-center [font-size:_clamp(1.8rem,3vw,3rem)]  font-bold mt-10 leading-8">Jalur Pendaftaran PPDB</h1>
        {/* <Divider size={"lg"} color="" w={"70%"} className="mx-auto" /> */}
      </div>

      <Box mt={50} className="flex flex-col gap-4 px-4 pb-10 lg:w-[50rem] mx-auto">
        {
          data.map(item => {

            const pendaftarPerJalur = item.gelombang.map(item => item.jumlah_penerimaan)
            console.log(pendaftarPerJalur)
            const jumlahPendaftarPerJalur = pendaftarPerJalur.reduce((total, current) => total + current, 0)
            console.log(jumlahPendaftarPerJalur)


            return (
              <Link to={"#"} key={item.id} className={`p-4   rounded-sm shadow-lg flex items-center ${dark ? "bg-zinc-800" : "bg-white"}`}>

                <div className="flex-1">
                  <h1 className="font-bold text-2xl">{item.nama_jalur_pendaftaran}</h1>
                  <div className="flex gap-2 ">
                    <h1 className="text-sm">{item.waktu_dibuka}</h1>
                    <h1 className="leading-tight text-sm"> - </h1>
                    <h1 className="text-sm">{item.waktu_ditutup}</h1>
                    <h1 className="ml-6 ">{jumlahPendaftarPerJalur} Pendaftar</h1>
                  </div>
                </div>

                <div className="px-4 flex gap-2">
                  <ActionIcon
                    variant="filled"
                    color="blue"
                    size={40}
                    radius={100}
                    className="bg-blue-500"
                    onClick={() =>
                      open()
                      // modals.openContextModal({
                      //   modal: 'createData',
                      //   title: 'Test modal from context',
                      //   innerProps: {
                      //     modalBody:
                      //       <div className="">

                      //       </div>,
                      //   },
                      //   size: "md"
                      // })
                    }
                  >
                    <AiFillEdit size={20} />
                  </ActionIcon>
                  <ActionIcon
                    variant="filled"

                    color="blue"
                    size={40}
                    radius={100}
                    className="bg-blue-500"
                  >
                    <BsFillTrashFill size={20} />
                  </ActionIcon>
                </div>

              </Link>
            )
          })
        }
      </Box>

      <CustomModal close={close} opened={opened} />

    </Box>
  )
}

export default AlurPPPDB