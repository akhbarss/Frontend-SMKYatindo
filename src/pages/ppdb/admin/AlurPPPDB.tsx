import {
  Accordion,
  AccordionControlProps,
  ActionIcon,
  Box,
  Center
} from "@mantine/core"
import { AiFillEdit } from "react-icons/ai"
import { BsFillTrashFill } from "react-icons/bs"
import { useBreakPoints } from "../../../utils/UseBreakpoints"

const AlurPPPDB = () => {

  const { xs } = useBreakPoints()

  const map = [1, 2, 3, 4]

  function AccordionControl(props: AccordionControlProps) {
    return (
      <Center>
        <Accordion.Control {...props} className="font-bold" />
        <div className="px-4 flex gap-2">
          <ActionIcon variant="filled" color="blue" size={40} radius={100} className="bg-blue-500">
            <AiFillEdit size={20} />
          </ActionIcon>
          <ActionIcon variant="filled" color="blue" size={40} radius={100} className="bg-blue-500">
            <BsFillTrashFill size={20} />
          </ActionIcon>
        </div>
      </Center>
    );
  }

  return (
    <Box className={`style-box relative flex-1  ${xs ? "" : "flex-1  "}`} >

      <div className="w-fit  mx-auto">
        <h1 className="text-center [font-size:_clamp(1.8rem,3vw,3rem)]  font-bold mt-10 leading-8">Alur PPDB</h1>
      </div>

      <Box mt={50} className="flex flex-col gap-4 px-4 pb-10 lg:w-[50rem] mx-auto">
        <Accordion variant="separated" multiple chevronPosition="left" >
          {map.map((item, i) => (
            <Accordion.Item value={i.toString()} className="shadow-lg ">
              <AccordionControl id={item.toString()}>
                <h1 className="font-bold text-2xl ">1. PEMBELIAN FORMULIR</h1>
              </AccordionControl>
              <Accordion.Panel className="border-t">
                <div className="h-[50vh] ">
                  <div className="mt-6 flex flex-col gap-5 leading-5 px-8">

                    <p >1. calon siswa baru mengakses laman PPDB online</p>
                    <p >2. Klik daftar / masuk</p>
                    <p >3. Pilih gelombang PPDB</p>
                    <p >4. Lakukan pembelian formulir pendaftaran dan unggah bukti pembayaran</p>
                    <p >5. Pilih jurusan</p>
                    <p >6. Cetak kartu peserta</p>
                    <p >7. WA ADMIN 081380908008</p>
                  </div>
                </div>
              </Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>

      </Box>

    </Box>
  )
}

export default AlurPPPDB