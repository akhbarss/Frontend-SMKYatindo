/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  Divider,
  Accordion,
  AccordionControlProps,
  ActionIcon,
  Box,
  Button,
  Center,
  Group,
  Modal,
  Skeleton,
  Stack,
  Text,
  Title
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import { AiFillEdit } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
import { CreateAlurPayload, createAlur } from "../../../../apis/alur/createAlur";
import { DeleteAlurPayload, deleteAlur } from "../../../../apis/alur/deleteAlur";
import { EditAlurPayload, editAlur } from "../../../../apis/alur/editAlur";
import {
  AlurPendaftaran,
  GetAllAlurPendaftaran,
} from "../../../../apis/alur/getAlur";
import Page from "../../../../components/Page";
import PageLabel from "../../../../components/PageLabel";
import ModalAlurCreate from "../../../../components/modal/modalAlurCreate";
import ModalAlurEdit from "../../../../components/modal/modalAlurEdit";
import DataKosong from "../../../../components/ppdb/dataKosong";
import TiptapOutput from "../../../../components/ppdb/tiptapOutput";
import { DarkTheme } from "../../../../utils/darkTheme";

const AlurPPPDB = () => {
  const dark = DarkTheme();
  const queryClient = useQueryClient();
  const [openedCreate, { open: openCreate, close: closeCreate }] = useDisclosure(false);
  const [openedEdit, { open: openEdit, close: closeEdit }] = useDisclosure(false);
  const [openedDelete, { open: openDelete, close: closeDelete }] = useDisclosure(false);

  const [idAlur, setIdAlur] = useState(null);
  const [title, setTitle] = useState("");
  const [descAlurPPDB, setDescAlurPPDB] = useState("");
  const [grade, setGrade] = useState<"SMP" | "SMP" | string>("");

  const {
    data,
    isError: isErr,
    isLoading: load,
    refetch,
  } = useQuery({
    queryKey: ["get_all_alur"],
    queryFn: GetAllAlurPendaftaran,
  });

  const createAlurMutation = useMutation({
    mutationFn: createAlur,
  });

  const deleteAlurMutation = useMutation({
    mutationFn: deleteAlur,
  });

  const editAlurMutation = useMutation({
    mutationFn: editAlur,
  });

  const submitCreateAlur = (payload: CreateAlurPayload) => {
    createAlurMutation.mutate(payload, {
      onSuccess: () => {
        toast.success("Data berhasil ditambahkan");
        setTitle("");
        setGrade("")
        setDescAlurPPDB("");
        closeCreate();
        queryClient.invalidateQueries({ queryKey: ["get_all_alur"] });
      },
      onError: (err) => {
        // @ts-ignore
        const status = err?.response?.status;
        if (status === 400) {
          toast.error("Data tidak boleh kosong");
        } else {
          toast.error("Gagal membuat alur")
        }
      },
    });
  };

  const submitEditAlur = (payload: EditAlurPayload) => {
    editAlurMutation.mutate(payload, {
      onSuccess: () => {
        toast.success("Data berhasil diubah");
        setIdAlur("");
        setTitle("");
        setGrade("")
        setDescAlurPPDB("");
        closeEdit();
        refetch();
        queryClient.invalidateQueries({ queryKey: ["get_all_alur"] });
      },
      onError: (err) => {
        // @ts-ignore
        const status = err?.response?.status;
        if (status === 400) {
          toast.error("Data tidak boleh kosong");
        } else {
          toast.error("Gagal mengubah alur");
        }
      },
    });
  };

  const submitDeleteAlur = (payload: DeleteAlurPayload) => {
    deleteAlurMutation.mutate(payload, {
      onSuccess: () => {
        toast.success("Data berhasil dihapus");
        closeDelete()
        refetch();
        setIdAlur(null)
        setTitle("")
      },
      onError: () => {
        toast.error("Gagal menghapus alur pendaftaran")
      },
    });
  };

  if (isErr) return <h1>Terjadi Kesalahan</h1>;

  const tambahALurHandler = () => {
    const data = {
      content: descAlurPPDB,
      title,
      grade: grade as "SMK" | "SMP"
    };
    submitCreateAlur(data);
  };

  function deleteAlurHandler(id: number) {
    submitDeleteAlur({ id });
  }

  function editAlurHandler() {
    submitEditAlur({
      content: descAlurPPDB,
      id: idAlur,
      title: title,
      grade: grade as "SMK" | "SMP"
    });
  }

  function AccordionControl({
    propss,
    data,
  }: {
    propss: AccordionControlProps;
    data: AlurPendaftaran;
  }): JSX.Element {
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
            color="brand-yatindo"
            variant="filled"
            size={40}
            radius={100}
            onClick={() => {
              setIdAlur(data.id);
              setTitle(data.title);
              setDescAlurPPDB(data.content);
              setGrade(data.grade)
              openEdit();
            }}
            >
            <AiFillEdit size={20} />
          </ActionIcon>

          <ActionIcon
            color="brand-yatindo"
            variant="filled"
            size={40}
            radius={100}
            onClick={() => {
              openDelete()
              setGrade(data.grade)
              setTitle(data.title)
              setIdAlur(data.id)
            }}
          >
            <BsFillTrashFill size={20} />
          </ActionIcon>
        </div>
      </Center>
    );
  }

  const filterAlurBySMP = data?.data?.filter(alur => alur.grade === "SMP").sort((a, b) => a.id - b.id)
  const filterAlurBySMK = data?.data?.filter(alur => alur.grade === "SMK").sort((a, b) => a.id - b.id)

  return (
    <Page title={"Alur Pendaftaran"}>
      <PageLabel label={"Alur Pendaftaran"} />

      <Stack mt={40} spacing={"2rem"} className={"style-box max-w-[70rem] mx-auto"} >

        <Button onClick={openCreate}>
          Tambah
        </Button>

        <Box>
          <Text
            weight={600}
            sx={(theme) => ({
              fontSize: 20,
              [theme.fn.largerThan("sm")]: {
                fontSize: 24,
              },
            })}
          >
            SMP
          </Text>
          <Divider />
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            paddingBottom: "40px",
          }}
        >
          <Accordion multiple variant="separated" chevronPosition="left">
            {
              load
                ? <Skeleton height={80} />
                : filterAlurBySMP?.length > 0
                  ? (
                    filterAlurBySMP?.map((item) => {
                      return (
                        <Accordion.Item
                          key={item.id}
                          value={item.id.toString()}
                          mb={20}
                          sx={theme => ({
                            boxShadow: "0 4px 10px -6px black",
                            backgroundColor: `${dark ? theme.colors.dark[9] : "white"}`,
                            padding: "0.5rem 0.5rem",
                            border: "0.0625rem solid #dee2e6",
                            '&[data-active]': {
                              backgroundColor: dark ? theme.colors.dark[9] : "white",
                              border: "0.0625rem solid #dee2e6",
                            },
                          })}
                        >
                          <AccordionControl
                            propss={{
                              id: item.id.toString(),
                              children: <h2>{item.title}</h2>,
                            }}
                            data={item}
                          />
                          <Accordion.Panel
                            sx={{
                              borderTop: `1px solid ${dark ? "gray" : "#d9d9d9"}`,
                            }}
                          >
                            <TiptapOutput desc={item.content} />
                          </Accordion.Panel>
                        </Accordion.Item>
                      )
                    })
                  )
                  :
                  (
                    <DataKosong message="Data kosong" />
                  )}
          </Accordion>
        </Box>

        <Box>
          <Text
            weight={600}
            sx={(theme) => ({
              fontSize: 20,
              [theme.fn.largerThan("sm")]: {
                fontSize: 24,
              },
            })}
          >
            SMK
          </Text>
          <Divider />
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            paddingBottom: "40px",
          }}
        >
          <Accordion multiple variant="separated" chevronPosition="left">
            {
              load
                ? <Skeleton height={80} />
                : filterAlurBySMK?.length > 0
                  ? (
                    filterAlurBySMK?.map((item) => {
                      return (
                        <Accordion.Item
                          key={item.id}
                          value={item.id.toString()}
                          mb={20}
                          sx={theme => ({
                            boxShadow: "0 4px 10px -6px black",
                            backgroundColor: `${dark ? theme.colors.dark[9] : "white"}`,
                            padding: "0.5rem 0.5rem",
                            border: "0.0625rem solid #dee2e6",
                            '&[data-active]': {
                              backgroundColor: dark ? theme.colors.dark[9] : "white",
                              border: "0.0625rem solid #dee2e6",
                            },
                          })}
                        >
                          <AccordionControl
                            propss={{
                              id: item.id.toString(),
                              children: <h2>{item.title}</h2>,
                            }}
                            data={item}
                          />
                          <Accordion.Panel
                            sx={{
                              borderTop: `1px solid ${dark ? "gray" : "#d9d9d9"}`,
                            }}
                          >
                            <TiptapOutput desc={item.content} />
                          </Accordion.Panel>
                        </Accordion.Item>
                      )
                    })
                  )
                  :
                  (
                    <DataKosong message="Data kosong" />
                  )}
          </Accordion>
        </Box>

        {/* MODAL CREATE ALUR PENDAFTARAN */}
        <ModalAlurCreate
          close={closeCreate}
          createAlurMutation={createAlurMutation}
          descAlurPPDB={descAlurPPDB}
          opened={openedCreate}
          setDescAlurPPDB={setDescAlurPPDB}
          setTitle={setTitle}
          grade={grade}
          setGrade={setGrade}
          tambahALurHandler={tambahALurHandler}
          title={title}
        />

        {/* MODAL CREATE EDIT PENDAFTARAN */}
        <ModalAlurEdit
          grade={grade}
          setGrade={setGrade}
          opened={openedEdit}
          close={closeEdit}
          title={title}
          setTitle={setTitle}
          descAlurPPDB={descAlurPPDB}
          setDescAlurPPDB={setDescAlurPPDB}
          setIdAlur={setIdAlur}
          editAlurHandler={editAlurHandler}
          editAlurMutation={editAlurMutation}
        />
      </Stack>

      {/* MODAL DELETE ALUR */}
      <Modal
        centered
        closeOnEscape={false}
        closeOnClickOutside={false}
        withCloseButton={false}
        opened={openedDelete}
        onClose={() => {
          closeDelete()
          setTitle("")
          setIdAlur(null)
          setGrade("")
        }}
      >
        <Stack>

          <Title order={3}>
            Hapus Alur Pendaftaran
          </Title>
          <Text>
            Anda yakin ingin menghapus alur pendaftaran {title}?
          </Text>
        </Stack>
        <Group mt={20} position="right">
          <Button
            disabled={deleteAlurMutation.status === "pending"}
            variant="outline"
            onClick={() => {
              closeDelete()
              setTitle("")
              setIdAlur(null)
              setGrade("")
            }}
          >
            Batal
          </Button>
          <Button
            variant="danger"
            onClick={() => deleteAlurHandler(idAlur)}
            loading={deleteAlurMutation.status === "pending"}
          >
            Hapus
          </Button>
        </Group>
      </Modal>

    </Page>
  );
};

export default AlurPPPDB;
