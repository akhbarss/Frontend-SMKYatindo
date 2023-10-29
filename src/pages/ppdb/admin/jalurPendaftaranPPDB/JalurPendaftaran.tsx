
import { yupResolver } from "@hookform/resolvers/yup";
import {
  ActionIcon,
  Box,
  Button,
  Stack,
  Text,
  useMantineTheme
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm, } from "react-hook-form";
import { AiFillEdit } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { CreateJalurPayload, TipeJalur, createJalur } from "../../../../apis/jalur/createJalur";
import { DeleteJalurPayload, deleteJalur } from "../../../../apis/jalur/deleteJalur";
import { EditJalurPayload, editJalur } from "../../../../apis/jalur/editJalur";
import { GetAllJalurPendaftaran, JalurPendaftaran } from "../../../../apis/jalur/getJalur";
import Page from "../../../../components/Page";
import PageLabel from "../../../../components/PageLabel";
import PageLoading from "../../../../components/PageLoading";
import ModallJalurCreate from "../../../../components/modal/modallJalurCreate";
import ModallJalurEdit from "../../../../components/modal/modallJalurEdit";

export type FormValuesCreateJalur = {
  tipeJalur: TipeJalur
  namaJalur: string
  waktuDibuka: Date
  waktuDiitutup: Date
  biayaPendaftaran: string
}

const schemaCreate = yup.object({
  tipeJalur: yup.string().required("Tolong pilih tipe jalur"),
  namaJalur: yup.string().required("Tolong masukkan nama jalur"),
  waktuDibuka: yup.date().required("Tolong masukkan waktu dibuka"),
  waktuDiitutup: yup.date().required("Tolong masukkan waktu ditutup"),
  biayaPendaftaran: yup.string().required("Tolong masukkan biaya pendaftaran"),
})

const schemaEdit = yup.object({
  tipeJalur: yup.string().required("Tolong pilih tipe jalur"),
  namaJalur: yup.string().required("Tolong masukkan nama jalur"),
  waktuDibuka: yup.date().required("Tolong masukkan waktu dibuka"),
  waktuDiitutup: yup.date().required("Tolong masukkan waktu ditutup"),
  biayaPendaftaran: yup.string().required("Tolong masukkan biaya pendaftaran"),
})

const AlurPPPDB = () => {
  const theme = useMantineTheme();
  const dark = theme.colorScheme === "dark";

  const [openedCreate, { open: openCreate, close: closeCreate }] = useDisclosure(false);
  const [openedEdit, { open: openEdit, close: closeEdit }] = useDisclosure(false);
  const [jalur, setJalur] = useState<JalurPendaftaran | null>(null)

  const formCreate = useForm({
    resolver: yupResolver(schemaCreate)
  })

  const formEdit = useForm({
    resolver: yupResolver(schemaEdit)
  })

  const {
    control: controlCreate,
    register: registerCreate,
    handleSubmit: handleSubmitCreate,
    setError: setErrorCreate,
    setValue: setValueCreate,
    reset: resetCreate,
    resetField: resetFieldCreate,
    formState: { errors: errorsCreate },
  } = formCreate

  const {
    control: controlEdit,
    register: registerEdit,
    handleSubmit: handleSubmitEdit,
    setError: setErrorEdit,
    setValue: setValueEdit,
    reset: resetEdit,
    resetField: resetFieldEdit,
    formState: { errors: errorsEdit },
  } = formEdit

  const {
    data: dataJalur,
    isErr,
    load,
    refetch
  } = GetAllJalurPendaftaran()

  const createJalurMutation = useMutation({
    mutationFn: createJalur
  })

  const deleteJalurMutation = useMutation({
    mutationFn: deleteJalur
  })

  const editJalurMutation = useMutation({
    mutationFn: editJalur
  })

  if (load) return <PageLoading />
  if (isErr) return <h1>Terjadi Kesalahan</h1>

  function submitCreateJalur(payload: CreateJalurPayload) {
    createJalurMutation.mutate(payload, {
      onSuccess: (response) => {
        console.log("SUCCESS")
        console.log(response)
        resetFieldCreate("biayaPendaftaran")
        resetFieldCreate("namaJalur")
        resetFieldCreate("tipeJalur")
        resetFieldCreate("waktuDibuka")
        resetFieldCreate("waktuDiitutup")
        refetch()
        closeCreate()
        resetCreate()

      },
      onError: (error) => {
        console.log("FAILED")
        console.log(error)
      },
    })
  }

  function submitEditJalur(payload: EditJalurPayload) {
    editJalurMutation.mutate(payload, {
      onSuccess: (response) => {
        console.log("SUCCESS")
        console.log(response)
        closeEdit()
        refetch()
        resetFieldEdit("biayaPendaftaran")
        resetFieldEdit("namaJalur")
        resetFieldEdit("tipeJalur")
        resetFieldEdit("waktuDibuka")
        resetFieldEdit("waktuDiitutup")
        // reset()
      },
      onError: (error) => {
        console.log("FAILED")
        console.log(error)
      },
    })
  }

  function submitDeleteJalur(payload: DeleteJalurPayload) {
    deleteJalurMutation.mutate(payload, {
      onSuccess: (response) => {
        console.log("SUCCESS")
        console.log(response)
        closeCreate()
        refetch()

      },
      onError: (error) => {
        console.log("FAILED")
        console.log(error)
      },
    })
  }


  function tambahJalurHandler(datas: FormValuesCreateJalur) {
    const data: CreateJalurPayload = {
      name: datas.namaJalur,
      type: datas.tipeJalur,
      end_date: datas.waktuDiitutup,
      price: datas.biayaPendaftaran.substring(4).replace(/\./g, ""),
      start_date: datas.waktuDibuka
    }
    submitCreateJalur(data)
  }

  function deleteJalurHandler(id: number) {
    console.log(id)
    submitDeleteJalur({ id })
  }

  function editJalurHandler(datas: FormValuesCreateJalur) {
    console.log(jalur.id)
    console.log(datas)
    submitEditJalur({
      id: jalur.id,
      end_date: datas.waktuDiitutup,
      name: datas.namaJalur,
      price: datas.biayaPendaftaran.substring(4).replace(/\./g, ""),
      start_date: datas.waktuDibuka,
      type: datas.tipeJalur
    })
  }

  const contentJalurBackend = dataJalur && dataJalur.length > 0 ? dataJalur.map(item => {


    const starDate = item.start_date && new Date(item.start_date)
    const endDate = item.end_date && new Date(item.end_date)

    return (
      <Box
        key={item.id}
        style={{
          padding: "16px",
          borderRadius: "6px",
          boxShadow: "0 5px 10px -5px black",
          display: "flex",
          alignItems: "center",
          backgroundColor: `${dark ? "#25262B" : "white"}`,
        }}
      >
        <Link
          className="flex-[1] no-underline text-[#2A166F]"
          to={`${item.id}/informasi-umum`}
        >
          <Text size={"xl"} weight={"bold"} sx={{
            color: `${dark ? "white" : "black"}`
          }}>
            {item.name}
          </Text>

          <span className="flex gap-3">
            <p>
              {starDate !== null && starDate.toLocaleDateString("id-ID", {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric'
              })} &ndash; {endDate !== null && endDate.toLocaleDateString("id-ID", {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric'
              })}
            </p>
            {/* <Group spacing={10}>
              <HiMiniUserCircle size={20} />
              <p>   {jumlahPendaftarPerJalur} Pendaftar </p>
            </Group> */}
          </span>
        </Link>

        <div className="px-4 flex gap-2 ">
          <ActionIcon
            variant="filled"
            color="blue"
            size={40}
            radius={100}
            className="bg-[#2A166F] hover:bg-[#2A166F]"
            onClick={() => {
              console.log(item)
              setJalur(item)
              openEdit()
            }}
          >
            <AiFillEdit size={20} />
          </ActionIcon>
          <ActionIcon
            variant="filled"
            color="blue"
            size={40}
            radius={100}
            className="bg-[#2A166F] hover:bg-[#2A166F] "
            onClick={() => deleteJalurHandler(item.id)}
          >
            <BsFillTrashFill size={20} />
          </ActionIcon>
        </div>
      </Box>
    )
  }) : <h2>Data Kosong</h2>

  return (
    <Page title={"Jalur Pendaftaran"}>
      <PageLabel label={"Jalur Pendaftaran"} />

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

          {contentJalurBackend}

          <Button
            mt={40}
            onClick={() => { openCreate() }}
          >
            Tambah
          </Button>

        </Box>


        {/* MODAL CREATE*/}
        <ModallJalurCreate
          close={() => {
            resetFieldCreate("biayaPendaftaran")
            resetFieldCreate("namaJalur")
            resetFieldCreate("tipeJalur")
            resetFieldCreate("waktuDibuka")
            resetFieldCreate("waktuDiitutup")
            closeCreate()
          }}
          opened={openedCreate}
          errors={errorsCreate}
          handleSubmit={handleSubmitCreate}
          register={registerCreate}
          setValue={setValueCreate}
          tambahJalurHandler={tambahJalurHandler}
          control={controlCreate}
        />

        {/* MODAL EDIT */}
        <ModallJalurEdit
          close={() => {
            resetFieldEdit("biayaPendaftaran")
            resetFieldEdit("namaJalur")
            resetFieldEdit("tipeJalur")
            resetFieldEdit("waktuDibuka")
            resetFieldEdit("waktuDiitutup")
            setJalur(null)
            closeEdit()
          }}
          errors={errorsEdit}
          handleSubmit={handleSubmitEdit}
          opened={openedEdit}
          register={registerEdit}
          setValue={setValueEdit}
          control={controlEdit}
          editJalurHandler={editJalurHandler}
          jalur={jalur}
        />
      </Stack>
    </Page>
  );
};

export default AlurPPPDB;
