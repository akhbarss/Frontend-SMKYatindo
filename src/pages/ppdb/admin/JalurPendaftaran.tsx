// import {
//   Accordion,
//   AccordionControlProps,
//   ActionIcon,
//   Center,
//   useMantineTheme
// } from "@mantine/core"
// import { useDisclosure } from "@mantine/hooks"
// import { useState } from "react"
// import { AiFillEdit } from "react-icons/ai"
// import { BsFillTrashFill } from "react-icons/bs"
import { useBreakPoints } from "../../../utils/UseBreakpoints"

const JalurPendaftaranPPDB = () => {

  const { xs } = useBreakPoints()
  // const theme = useMantineTheme()
  // const dark = theme.colorScheme === 'dark'

  // const [opened, { toggle }] = useDisclosure(false);

  // const map = [1, 2, 3, 4]
  // const [data, setData] = useState(map)

  // function AccordionControl(props: AccordionControlProps) {
  //   return (
  //     <Center>
  //       <Accordion.Control {...props} className="font-bold" />
  //       <div className="px-4 flex gap-2">
  //         <ActionIcon variant="filled" color="blue" size={40} radius={100} className="bg-blue-500">
  //           <AiFillEdit size={20} />
  //         </ActionIcon>
  //         <ActionIcon variant="filled" color="blue" size={40} radius={100} className="bg-blue-500">
  //           <BsFillTrashFill size={20} />
  //         </ActionIcon>
  //       </div>
  //     </Center>
  //   );
  // }

  return (
    <div
      className={`style-box  mx-auto flex-1 py-5   ${xs ? "w-[85%] h-full" : "flex-1  "}`}
    >
      <h1 className="text-center text-4xl underline font-black">Jalur Pendaftaran</h1>
      {/* <Box mt={50} className="flex flex-col gap-4">


        <Accordion variant="separated" multiple chevronPosition="left">
          {data.map((item, i) => (
            <Accordion.Item value={i.toString()} >
              <AccordionControl >
                <h1 className="font-bold text-2xl">1. PEMBELIAN FORMULIR</h1>
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

      </Box> */}


    </div>
  )
}

export default JalurPendaftaranPPDB