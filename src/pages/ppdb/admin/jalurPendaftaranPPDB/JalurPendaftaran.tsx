import { useState } from "react"
import {
  ActionIcon,
  Box,
  useMantineTheme,
  TextInput,
  Input,
  Radio
} from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { AiFillEdit } from "react-icons/ai"
import { BsFillTrashFill } from "react-icons/bs"
import { Link } from "react-router-dom"
import CustomModal from "../../../../components/ppdb/modalCreate"
import { dataJalurPendaftaran } from "../../../../components/ppdb/dataJalurPendaftaran"
import { useBreakPoints } from "../../../../utils/UseBreakpoints"
import TiptapEditor from "../../../../components/ppdb/tiptapInput"

const AlurPPPDB = () => {

  const [value, setValue] = useState('react');
  const [opened, { open, close }] = useDisclosure(false);
  const { xs, md } = useBreakPoints()
  const theme = useMantineTheme()
  const dark = theme.colorScheme === 'dark'
  const focus = true

  const data = dataJalurPendaftaran

  return (
    <Box
      //  className={`style-box relative flex-1  ${xs ? "" : "flex-1  "}`} 
      className="style-box"
      sx={{
        position: "relative",
        flex: 1
      }}
    >

      <div
        // className="w-fit  mx-auto"
        style={{
          width: "fit-content",
          marginInline: "auto"
        }}
      >
        <h1
          //  className="text-center [font-size:_clamp(1.8rem,3vw,3rem)]  font-bold mt-10 leading-8"
          style={{
            textAlign: "center",
            fontWeight: "bold",
            marginTop: "40px",
            // fontSize: clamp(1.8, 3)
          }}
        >
          Jalur Pendaftaran PPDB
        </h1>
        {/* <Divider size={"lg"} color="" w={"70%"} className="mx-auto" /> */}
      </div>

      <Box
        mt={50}
        // className="flex flex-col gap-4 px-4 pb-10 lg:w-[50rem] mx-auto"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          paddingInline: "16px",
          paddingBottom: "40px",
          width: `${md ? "50rem" : ""}`,
          marginInline: "auto"
        }}
      >
        {
          data.map(item => {

            const pendaftarPerJalur = item.gelombang.map(item => item.jumlah_penerimaan)
            // console.log(pendaftarPerJalur)
            const jumlahPendaftarPerJalur = pendaftarPerJalur.reduce((total, current) => total + current, 0)
            // console.log(jumlahPendaftarPerJalur)


            return (
              <Box
                key={item.id}
                // className={`p-4   rounded-sm shadow-lg flex items-center ${dark ? "bg-zinc-800" : "bg-white"}`}
                style={{
                  padding: "16px",
                  borderRadius: "10px",
                  boxShadow: "0 5px 10px -5px black",
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: `${dark ? "black" : "white"}`,
                  // flexDirection: "column"
                }}
              >

                <Link
                  //  className="flex-1"
                  style={{ flex: 1 }}
                  to={`${item.id}/informasi-umum`}
                >
                  <h2
                    // className="font-bold text-2xl"
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    {item.nama_jalur_pendaftaran}
                  </h2>

                  <span
                    style={{
                      display: "flex",
                      gap: "8px"
                    }}
                  >
                    <p>{item.waktu_dibuka} &ndash; {item.waktu_ditutup}  </p>
                    <p>{jumlahPendaftarPerJalur} Pendaftar </p>
                  </span>
                </Link>

                <div className="px-4 flex gap-2 ">
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

              </Box>
            )
          })
        }
      </Box>

      <CustomModal
        body={
          <>
            <p style={{ fontWeight: "bold" }}>Nama</p>
            <Input />
            <Radio.Group
              value={value}
              onChange={setValue}
              name="favoriteFramework"
              // label="Select your favorite framework/library"
              // description="This is anonymous"
              withAsterisk
            >
              <Radio value="react" label="React" />
              <Radio value="svelte" label="Svelte" />
              <Radio value="ng" label="Angular" />
              <Radio value="vue" label="Vue" />
            </Radio.Group>
            {/* <TextInput
              autoFocus={focus}
            /> */}
            <p style={{ fontWeight: "bold", marginTop: "15px" }}>Deskripsi Keterangan</p>
            {/* <TiptapEditor
              desc={"descAlurPPDB"}
              setDesc={setDescAlurPPDB}
              style={{
                // marginTop: "10px"
              }}
            /> */}

          </>
        }
        close={close}
        opened={opened}
        title="Ubah Alur PPDB"
      />

    </Box>
  )
}

export default AlurPPPDB