import {
  Button,
  Accordion,
  AccordionControlProps,
  ActionIcon,
  Box,
  Center,
  Text,
  TextInput,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Link } from "@mantine/tiptap";
import Highlight from "@tiptap/extension-highlight";
import SubScript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
import Page from "../../../components/Page";
import PageLabel from "../../../components/PageLabel";
import { dataAlurPPDB } from "../../../components/ppdb/dataAlurPPDB";
import CustomModal from "../../../components/ppdb/modalCreate";
import TiptapEditor from "../../../components/ppdb/tiptapInput";
import TiptapOutput from "../../../components/ppdb/tiptapOutput";
import { DarkTheme } from "../../../utils/darkTheme";
import { modals } from "@mantine/modals";

type ModalAlurAdmin = "modal"

const AlurPPPDB = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const dark = DarkTheme();

  const [descAlurPPDB, setDescAlurPPDB] = useState(
    `<ol><li><p>calon siswa baru mengakses laman PPDB online</p><p></p></li><li><p>Klik daftar / masuk</p><p></p></li><li><p>Pilih gelombang PPDB</p><p></p></li><li><p>Lakukan pembelian formulir pendaftaran dan unggah bukti pembayaran</p><p></p></li><li><p>Pilih jurusan</p><p></p></li><li><p>Cetak kartu peserta</p><p></p></li><li><p>Wa admin 081380908008</p></li></ol>`
  );
  const [data, setData] = useState(dataAlurPPDB);

  const outputEditor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: descAlurPPDB,
    editable: false,
  });

  function AccordionControl({ propss, data }: { propss: AccordionControlProps, data: any }): JSX.Element {

    const onAccept = () => {
      console.log(data)
      console.log("simpan")
    }

    return (
      <Center>
        <Accordion.Control {...propss} className="font-bold" />
        <div
          style={{
            paddingInline: "16px",
            display: "flex",
            gap: "8px",
          }}
        >
          <ActionIcon
            variant="filled"
            color="blue"
            size={40}
            radius={100}
            onClick={() => {

              modals.openContextModal({
                modal: "modalAlurAdmin",
                title: "Ubah Alur Pendaftaran",
                innerProps: {
                  onAccept,
                  onCancel: () => console.log("cancel"),
                  modalBody: (
                    <>
                      <Text align="left" weight={"bold"} >Nama</Text>
                      <TextInput
                        value={data?.nama}
                        onChange={(val) => console.log(val)}
                      />
                      <Text align="left" mt={30} weight={"bold"}>Deskripsi Keterangan</Text>
                      <TiptapEditor

                        desc={data.deskripsi}
                        setDesc={setDescAlurPPDB}
                      />
                    </>
                  ),
                },
                styles: {
                  header: {
                    backgroundColor: "#2A166F",
                  },
                  title: {
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "25px"
                  },
                  root: {
                    borderRadius: "100px"
                  },
                  body: {
                    overflow: "hidden",
                    height: "80vh",
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    padding: 0
                  }

                },
                size: "80rem"
              });
            }}
          >
            <AiFillEdit size={20} />
          </ActionIcon>
          <ActionIcon
            variant="filled"
            color="blue"
            size={40}
            radius={100}
          >
            <BsFillTrashFill size={20} />
          </ActionIcon>
        </div>
      </Center>
    );
  }

  return (
    <Page title={"Alur Pendaftaran"}>
      <PageLabel label={"Alur Pendaftaran"} />

      <Box
        mt={50}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          paddingBottom: "40px",
        }}
      >
        <Accordion
          multiple
          variant="separated"
          chevronPosition="left"
        >

          {data.map((item, i) => (
            <Accordion.Item
              key={i}
              value={i.toString()}
              sx={{
                boxShadow: "0 4px 10px -6px black",
                backgroundColor: `${dark ? "#25262B" : "white"}`,
                padding: "0.5rem 0.5rem",
              }}
              styles={{
                item: {
                  backgroundColor: "blue",
                },
              }}
            >
              <AccordionControl
                propss={{
                  id: item.id.toString(),
                  children: (
                    <h2>{item.nama}</h2>

                  )
                }}
                data={item}
              />
              <Accordion.Panel
                sx={{
                  borderTop: `1px solid ${dark ? "gray" : "#d9d9d9"}`,
                }}
              >
                <TiptapOutput desc={item.deskripsi} />
              </Accordion.Panel>
            </Accordion.Item>
          ))}

        </Accordion>

        <Button
          mt={40}
          onClick={() => {

            const onAccept = () => {
              console.log("create ALur")
            }

            modals.openContextModal({
              modal: "modalAlurAdmin",
              title: "Tambah Alur Pendaftaran",
              innerProps: {
                onAccept,
                onCancel: () => console.log("cancel"),
                modalBody: (
                  <>
                    <Text align="left" weight={"bold"} >Nama</Text>
                    <TextInput
                      onChange={(val) => console.log(val)}
                    />
                    <Text align="left" mt={30} weight={"bold"}>Deskripsi Keterangan</Text>
                    <TiptapEditor

                      desc={""}
                      setDesc={setDescAlurPPDB}
                    />
                  </>
                ),
              },
              styles: {
                header: {
                  backgroundColor: "#2A166F",
                },
                title: {
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "25px"
                },
                root: {
                  borderRadius: "100px"
                },
                body: {
                  overflow: "hidden",
                  height: "80vh",
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  padding: 0
                }

              },
              size: "80rem"
            });

          }}
        >
          Tambah
        </Button>

      </Box>
    </Page>
  );
};

export default AlurPPPDB;
