import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';
import { Link } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import {
  Accordion,
  AccordionControlProps,
  ActionIcon,
  Box,
  Center,
  TextInput
} from "@mantine/core"
import { AiFillEdit } from "react-icons/ai"
import { BsFillTrashFill } from "react-icons/bs"
import { useBreakPoints } from "../../../utils/UseBreakpoints"
import CustomModal from "../../../components/ppdb/modalCreate"
import { useDisclosure } from "@mantine/hooks"
import TiptapEditor from "../../../components/ppdb/tiptapInput"
import { useState } from "react"
import { DarkTheme } from "../../../utils/darkTheme"
import { dataAlurPPDB } from "../../../components/ppdb/dataAlurPPDB"
import parser from "html-react-parser"
import TiptapOutput from '../../../components/ppdb/tiptapOutput';

const AlurPPPDB = () => {

  const { md } = useBreakPoints()
  const [opened, { open, close }] = useDisclosure(false);
  const dark = DarkTheme()


  const [descAlurPPDB, setDescAlurPPDB] = useState(`<ol><li><p>calon siswa baru mengakses laman PPDB online</p><p></p></li><li><p>Klik daftar / masuk</p><p></p></li><li><p>Pilih gelombang PPDB</p><p></p></li><li><p>Lakukan pembelian formulir pendaftaran dan unggah bukti pembayaran</p><p></p></li><li><p>Pilih jurusan</p><p></p></li><li><p>Cetak kartu peserta</p><p></p></li><li><p>Wa admin 081380908008</p></li></ol>`)
  const [data, setData] = useState(dataAlurPPDB)

  const outputEditor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content: descAlurPPDB,
    editable: false
  })

  // const map = [1, 2, 3, 4]

  function AccordionControl(props: AccordionControlProps) {
    return (
      <Center>
        <Accordion.Control {...props} className="font-bold" />
        <div
          // className="px-4 flex gap-2"
          style={{
            paddingInline: "16px",
            display: "flex",
            gap: "8px"
          }}
        >
          <ActionIcon
            variant="filled"
            color="blue"
            size={40}
            radius={100}
            onClick={open}
          // className="bg-blue-500"
          >
            <AiFillEdit size={20} />
          </ActionIcon>
          <ActionIcon
            variant="filled"
            color="blue"
            size={40}
            radius={100}
          // className="bg-blue-500"
          >
            <BsFillTrashFill size={20} />
          </ActionIcon>
        </div>
      </Center>
    );
  }

  return (
    <Box
      // className={`style-box relative flex-1  ${xs ? "" : "flex-1  "}`}
      className="style-box"
      sx={{
        position: "relative",
        flex: 1,
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
          // className="text-center [font-size:_clamp(1.8rem,3vw,3rem)]  font-bold mt-10 leading-8"
          style={{
            textAlign: "center",
            fontWeight: "bold",
            marginTop: "40px",
            // fontSize: clamp(1.8, 3)
          }}
        >
          Alur PPDB
        </h1>
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
        <Accordion
          multiple
          variant="separated"
          styles={{
            panel: {
              // backgroundColor: ""
            },
            content: {
              // backgroundColor: "black"
            },
            item: {
              // backgroundColor: "black"

            }

          }}
          chevronPosition="left"
        >
          {data.map((item, i) => (
            <Accordion.Item
              key={i}
              value={i.toString()}
              // className="shadow-lg "
              sx={{
                boxShadow: "0 4px 10px -6px black",
                backgroundColor: `${dark ? "#25262B" : "white"}`,
                padding: "0.5rem 0.5rem"
              }}
              styles={{
                item: {
                  backgroundColor: "blue"
                }
              }}
            >
              <AccordionControl id={item.id.toString()} >
                <h2>{item.nama}</h2>
              </AccordionControl>
              <Accordion.Panel
                sx={{
                  borderTop: `1px solid ${dark ? "gray" : "#d9d9d9"}`,
                  // backgroundColor: "gray"
                }}
              >

                <TiptapOutput desc={item.deskripsi} />
                
              </Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>

      </Box>

      <CustomModal
        body={
          <>
            <p style={{ fontWeight: "bold" }}>Nama</p>
            <TextInput
            />
            <p style={{ fontWeight: "bold", marginTop: "15px" }}>Deskripsi Keterangan</p>
            <TiptapEditor
              desc={descAlurPPDB}
              setDesc={setDescAlurPPDB}
              style={{
                // marginTop: "10px"
              }}
            />

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