import {
  Accordion,
  AccordionControlProps,
  ActionIcon,
  Box,
  Button,
  Center,
  LoadingOverlay,
  Skeleton,
  Stack
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import { AiFillEdit } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
import { CreateAlurPayload, createAlur } from "../../../apis/alur/createAlur";
import { DeleteAlurPayload, deleteAlur } from "../../../apis/alur/deleteAlur";
import { EditAlurPayload, editAlur } from "../../../apis/alur/editAlur";
import {
  AlurPendaftaran,
  GetAllAlurPendaftaran,
} from "../../../apis/alur/getAlur";
import Page from "../../../components/Page";
import PageLabel from "../../../components/PageLabel";
import ModalAlurCreate from "../../../components/modal/modalAlurCreate";
import ModalAlurEdit from "../../../components/modal/modalAlurEdit";
import DataKosong from "../../../components/ppdb/dataKosong";
import TiptapOutput from "../../../components/ppdb/tiptapOutput";
import { DarkTheme } from "../../../utils/darkTheme";

const AlurPPPDB = () => {
  const dark = DarkTheme();

  const [openedCreate, { open: openCreate, close: closeCreate }] =
    useDisclosure(false);
  const [openedEdit, { open: openEdit, close: closeEdit }] =
    useDisclosure(false);
  const queryClient = useQueryClient();

  const [idAlur, setIdAlur] = useState(null);
  const [title, setTitle] = useState("");
  const [descAlurPPDB, setDescAlurPPDB] = useState("");

  const {
    data: alurPendaftaran,
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
      onSuccess: (response) => {
        console.log("Success");
        console.log(response);
        toast.success("Data berhasil ditambahkan");
        setTitle("");
        setDescAlurPPDB("");
        closeCreate();
        queryClient.invalidateQueries({ queryKey: ["get_all_alur"] });
      },
      onError: (err) => {
        // @ts-ignore
        const status = err?.response?.status;

        if (status === 400) {
          console.log("DATA TIDAK BOLEH KOSONG");
          toast.error("Data tidak boleh kosong");
        }
      },
    });
  };

  const submitEditAlur = (payload: EditAlurPayload) => {
    editAlurMutation.mutate(payload, {
      onSuccess: (response) => {
        console.log(response);
        console.log("Success");
        toast.success("Data berhasil diubah");
        setIdAlur("");
        setTitle("");
        setDescAlurPPDB("");
        closeEdit();
        refetch();
        queryClient.invalidateQueries({ queryKey: ["get_all_alur"] });
      },
      onError: (err) => {
        // @ts-ignore
        const status = err?.response?.status;

        if (status === 400) {
          console.log("DATA TIDAK BOLEH KOSONG");
          toast.error("Data tidak boleh kosong");
        }
      },
    });
  };

  const submitDeleteAlur = (payload: DeleteAlurPayload) => {
    deleteAlurMutation.mutate(payload, {
      onSuccess: (response) => {
        console.log(response);
        console.log("Success");
        toast.success("Data berhasil dihapus");
        close();
        refetch();
      },
      onError: (err) => {
        console.log("FAILED");
        console.log(err);
      },
    });
  };

  // if (load) return <PageLoading />;
  if (isErr) return <h1>Terjadi Kesalahan</h1>;

  const tambahALurHandler = () => {
    const data = {
      content: descAlurPPDB,
      title,
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
            className="bg-[#2A166F] hover:bg-[#2A166F]"
            variant="filled"
            size={40}
            radius={100}
            onClick={() => {
              setIdAlur(data.id);
              setTitle(data.title);
              setDescAlurPPDB(data.content);
              openEdit();
            }}
          >
            <AiFillEdit size={20} />
          </ActionIcon>

          <ActionIcon
            className="bg-[#2A166F] hover:bg-[#2A166F]"
            variant="filled"
            color="blue"
            size={40}
            radius={100}
            onClick={() => deleteAlurHandler(data.id)}
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

      <Stack className={"style-box max-w-[70rem] mx-auto"} >

        <Box
          mt={50}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            paddingBottom: "40px",
          }}
        >
          <Accordion multiple variant="separated" chevronPosition="left">
            {load ? <>
              <Skeleton height={80} />
            </> : alurPendaftaran && alurPendaftaran?.data?.length > 0 ? (
              alurPendaftaran.data.map((item) => (
                <Accordion.Item
                  key={item.id}
                  value={item.id.toString()}
                  sx={{
                    boxShadow: "0 4px 10px -6px black",
                    backgroundColor: `${dark ? "#25262B" : "white"}`,
                    padding: "0.5rem 0.5rem",
                    border: "0.0625rem solid #dee2e6"
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
              ))
            ) : (
              <DataKosong />
            )}
          </Accordion>

          <Button mt={40} onClick={openCreate}>
            Tambah
          </Button>
        </Box>

        <ModalAlurCreate
          close={closeCreate}
          createAlurMutation={createAlurMutation}
          descAlurPPDB={descAlurPPDB}
          opened={openedCreate}
          setDescAlurPPDB={setDescAlurPPDB}
          setTitle={setTitle}
          tambahALurHandler={tambahALurHandler}
          title={title}
        />

        <ModalAlurEdit
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

        <LoadingOverlay visible={deleteAlurMutation.status === "pending"} overlayBlur={1} />
      </Stack>
    </Page>
  );
};

export default AlurPPPDB;
