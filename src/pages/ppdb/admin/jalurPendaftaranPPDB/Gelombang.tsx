import { yupResolver } from "@hookform/resolvers/yup";
import {
  Accordion,
  AccordionControlProps,
  ActionIcon,
  Button,
  Center,
  Paper,
  Text
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { AiFillEdit } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
import { useParams } from "react-router-dom";
import * as yup from "yup";
import { CreateGelombangPayload, createGelombang } from "../../../../apis/gelombang/createGelombang";
import { TGelombang } from "../../../../apis/jalur/getJalur";
import Page from "../../../../components/Page";
import ModalGelombangCreate from "../../../../components/modal/modalGelombangCreate";
import { DarkTheme } from "../../../../utils/darkTheme";
import ModalGelombangEdit from "../../../../components/modal/modalGelombangEdit";
import { useState } from "react";
import { EditGelombangPayload, editGelombang } from "../../../../apis/gelombang/editGelombang";
import { DeleteGelombangPayload, deleteGelombang } from "../../../../apis/gelombang/deleteGelombang";
import toast, { Toaster } from "react-hot-toast";
import { GetGelombangByIdJalur } from "../../../../apis/gelombang/getGelombangByIdJalur";

export type FormValuesCreateGelombang = {
  nama: string;
  jumlahPenerimaan: string;
  waktuDibuka: string;
  waktuDiitutup: string;
  namaBank: string;
  nomorRekening: string;
  namaPemilikRekening: string;
  biayaPendaftaran: string;
}

const schema = yup.object({
  nama: yup.string().required("Tolong masukkan nama gelombang"),
  jumlahPenerimaan: yup.string().required("Tolong masukkan jumlah penerimaan"),
  waktuDibuka: yup.string().required("Tolong masukkan waktu dibuka"),
  waktuDiitutup: yup.string().required("Tolong masukkan waktu ditutup"),
  namaBank: yup.string().required("Tolong masukkan nama bank"),
  nomorRekening: yup.string().required("Tolong masukkan nomor rekening"),
  namaPemilikRekening: yup.string().required("Tolong masukkan nama pemilik rekening"),
  biayaPendaftaran: yup.string().required("Tolong masukkan biaya pendaftaran"),
})

const Gelombang = () => {
  const dark = DarkTheme()

  const { idJalurPendaftaran } = useParams()
  const [openedCreate, { open: openCreate, close: closeCreate }] = useDisclosure(false);
  const [openedEdit, { open: openEdit, close: closeEdit }] = useDisclosure(false);
  const [dataGelombang, setDataGelombang] = useState<TGelombang | null>(null)

  const form = useForm({
    resolver: yupResolver(schema)
  })
  const {
    control,
    register,
    handleSubmit,
    setError,
    setValue,
    reset,
    resetField,
    formState: { errors },
  } = form

  // const jalur = dataJalurPendaftaran.find(jalur => jalur.id + "" === idJalurPendaftaran)
  // const {
  //   data: dataJalur,
  //   isErr,
  //   load,
  //   refetch
  // } = GetAllJalurPendaftaran()

  const {
    data,
    err,
    isErr,
    load,
    refetch
  } = GetGelombangByIdJalur(idJalurPendaftaran)

  console.log("========GELOMBANG========")
  console.log(err)

  const createGelombangMutation = useMutation({
    mutationFn: createGelombang
  })

  const editGelombangMutation = useMutation({
    mutationFn: editGelombang
  })

  const deleteGelombangMutation = useMutation({
    mutationFn: deleteGelombang
  })


  function submitCreateGelombang(payload: CreateGelombangPayload) {
    createGelombangMutation.mutate(payload, {
      onSuccess: (response) => {
        console.log("SUCCESS")
        console.log(response)
        closeCreate()
        refetch()
        reset()
      },
      onError: (error) => {
        console.log("FAILED")
        console.log(error)
      },
      onSettled: () => {
        console.log("SUBMITTED!!!")
      }
    })
  }

  function submitEditGelombang(payload: EditGelombangPayload) {
    editGelombangMutation.mutate(payload, {
      onSuccess: (response) => {
        console.log("SUCCESS")
        console.log(response)
        closeEdit()
        refetch()
        reset()

      },
      onError: (error) => {
        console.log("FAILED")
        console.log(error)
      },
    })
  }

  function submitDeleteGelombang(payload: DeleteGelombangPayload) {
    deleteGelombangMutation.mutate(payload, {
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

  function tambahGelombangHandler(datas: FormValuesCreateGelombang) {

    const {
      biayaPendaftaran,
      jumlahPenerimaan,
      nama,
      namaBank,
      namaPemilikRekening,
      nomorRekening,
      waktuDibuka,
      waktuDiitutup
    } = datas

    const data: CreateGelombangPayload = {
      idJalur: idJalurPendaftaran,
      payloadCreate: {
        bank_account: nomorRekening,
        bank_name: namaBank,
        bank_user: namaPemilikRekening,
        end_date: waktuDiitutup,
        index: 1,
        max_quota: +jumlahPenerimaan,
        name: nama,
        price: biayaPendaftaran,
        start_date: waktuDibuka
      }
    }
    submitCreateGelombang(data)
  }

  function editGelombangHandler(datas: FormValuesCreateGelombang) {
    const {
      biayaPendaftaran,
      jumlahPenerimaan,
      nama,
      namaBank,
      namaPemilikRekening,
      nomorRekening,
      waktuDibuka,
      waktuDiitutup
    } = datas

    const data: EditGelombangPayload = {
      id: dataGelombang.id,
      bank_account: nomorRekening,
      bank_name: namaBank,
      bank_user: namaPemilikRekening,
      end_date: waktuDiitutup,
      index: 1,
      max_quota: +jumlahPenerimaan,
      name: nama,
      price: biayaPendaftaran,
      start_date: waktuDibuka
    }

    // console.log(data)
    submitEditGelombang(data)
  }

  function deleteGelombangHandler(id: number) {
    console.log(id)
    submitDeleteGelombang({ id })
  }

  function AccordionControl({ propss, data }: { propss: AccordionControlProps, data: TGelombang }): JSX.Element {

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
              console.log(data.id)
              setDataGelombang(data)
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
            onClick={() => deleteGelombangHandler(data.id)}
          >
            <BsFillTrashFill size={20} />
          </ActionIcon>

        </div>
      </Center>
    );
  }

  // const jalur = dataJalur?.find(jalur => jalur.id + "" === idJalurPendaftaran)

  const contentGelombang =  data?.map(gelombang => (
    <Accordion.Item
      key={gelombang.id}
      value={gelombang.id.toString()}
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
          id: gelombang.id.toString(),
          children: (
            <>
              <h2>{gelombang.name}</h2>
              <p>{gelombang.name}</p>
            </>
          )
        }}
        data={gelombang}
      />
      <Accordion.Panel
        sx={{
          borderTop: `1px solid ${dark ? "gray" : "#d9d9d9"}`,
        }}
      >
        {/* <TiptapOutput desc={item.content} /> */}
      </Accordion.Panel>
    </Accordion.Item>

  )) 

  return (
    <Page title="Gelombang">

      <Paper
        withBorder
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "1rem 2rem"
        }}
      >
        <Text weight={"bold"} size={"xl"}>Daftar Gelombang</Text>
        <Button onClick={() => openCreate()}>
          Tambah Gelombang
        </Button>
      </Paper>

      <Accordion
        multiple
        variant="separated"
        chevronPosition="left"
      >
        {contentGelombang}
      </Accordion>

      <ModalGelombangCreate
        close={() => {
          closeCreate()
          reset()
          // resetField("waktuDibuka")
          // resetField("waktuDiitutup")
          // resetField("biayaPendaftaran")
        }}
        opened={openedCreate}
        errors={errors}
        handleSubmit={handleSubmit}
        register={register}
        setValue={setValue}
        tambahGelombangHandler={tambahGelombangHandler}
        />

      <ModalGelombangEdit
        close={() => {
          closeEdit()
          reset()
          // resetField("waktuDibuka")
          // resetField("waktuDiitutup")
          // resetField("biayaPendaftaran")
        }}
        opened={openedEdit}
        errors={errors}
        handleSubmit={handleSubmit}
        register={register}
        setValue={setValue}
        editGelombangHandler={editGelombangHandler}
        gelombang={dataGelombang}
      />



      <Toaster
        position="top-center"
      />
    </Page>
  )
}

export default Gelombang