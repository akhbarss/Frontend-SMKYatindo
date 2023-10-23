import { yupResolver } from "@hookform/resolvers/yup";
import {
  ActionIcon,
  Group,
  Box,
  Button,
  Text,
  useMantineTheme
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { AiFillEdit } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { CreateJalurPayload, TipeJalur, createJalur } from "../../../../apis/jalur/createJalur";
import { GetAllJalurPendaftaran, JalurPendaftaran } from "../../../../apis/jalur/getJalur";
import Page from "../../../../components/Page";
import PageLabel from "../../../../components/PageLabel";
import ModallJalurCreate from "../../../../components/modal/modallJalurCreate";
import { dataJalurPendaftaran } from "../../../../components/ppdb/dataJalurPendaftaran";
import { useBreakPoints } from "../../../../utils/UseBreakpoints";
import { HiMiniUserCircle } from "react-icons/hi2";
import { DeleteJalurPayload, deleteJalur } from "../../../../apis/jalur/deleteJalur";
import { useState } from "react";
import ModallJalurEdit from "../../../../components/modal/modallJalurEdit";

export type FormValuesCreateJalur = {
  tipeJalur: TipeJalur
  namaJalur: string
  waktuDibuka: string
  waktuDiitutup: string
  biayaPendaftaran: string
}

const schema = yup.object({
  tipeJalur: yup.string().required("Tolong pilih tipe jalur"),
  namaJalur: yup.string().required("Tolong masukkan nama jalur"),
  waktuDibuka: yup.string().required("Tolong masukkan waktu dibuka"),
  waktuDiitutup: yup.string().required("Tolong masukkan waktu ditutup"),
  biayaPendaftaran: yup.string().required("Tolong masukkan biaya pendaftaran"),
})

const AlurPPPDB = () => {
  const { xs, md } = useBreakPoints();
  const theme = useMantineTheme();
  const dark = theme.colorScheme === "dark";
  const data = dataJalurPendaftaran;

  // const [metodePembayaran, setMetodePembayaran] = useState<TipeJalur | null>(null)
  // const [nama, setNama] = useState("")
  // const [waktuDibuka, setWaktuDibuka] = useState("")
  // const [waktuDitutup, setWaktuDitutup] = useState("")
  // const [biayaPendaftaran, setBiayaPendaftaran] = useState("")

  const [openedCreate, { open: openCreate, close: closeCreate }] = useDisclosure(false);
  const [openedEdit, { open: openEdit, close: closeEdit }] = useDisclosure(false);
  const [jalur, setJalur] = useState<JalurPendaftaran | null>(null)

  const form = useForm({
    resolver: yupResolver(schema)
  })
  const {
    control,
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = form

  const {
    data: dataJalur,
    isErr,
    load,
    refetch
  } = GetAllJalurPendaftaran()

  console.log(dataJalur)

  const createJalurMutation = useMutation({
    mutationFn: createJalur
  })

  const deleteJalurMutation = useMutation({
    mutationFn: deleteJalur
  })

  function submitCreateJalur(payload: CreateJalurPayload) {
    createJalurMutation.mutate(payload, {
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
    // e.preventDefault()

    const data: CreateJalurPayload = {
      name: datas.namaJalur,
      type: datas.tipeJalur,
      end_date: datas.waktuDiitutup,
      price: datas.biayaPendaftaran,
      start_date: datas.waktuDibuka
    }

    submitCreateJalur(data)
  }

  function deleteJalurHandler(id: number) {

    console.log(id)
    submitDeleteJalur({ id })

  }

  function editJalurHandler(datas: FormValuesCreateJalur) {
    console.log(datas)
  }

  return (
    <Page title={"Jalur Pendaftaran"}>
      <PageLabel label={"Jalur Pendaftaran"} />

      <Box
        mt={50}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          paddingBottom: "40px",
        }}
      >

        {dataJalur && dataJalur.map(item => {
          const pendaftarPerJalur = item.registrationBatches.map(
            (item) => item.max_quota
          );

          const jumlahPendaftarPerJalur = pendaftarPerJalur.reduce(
            (total, current) => total + current,
            0
          );

          const starDate = item.start_date && new Date(Date.parse(item.start_date))
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
                  <Group spacing={10}>
                    <HiMiniUserCircle size={20} />
                    <p>   {jumlahPendaftarPerJalur} Pendaftar </p>
                  </Group>
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
        })}

        <Button
          mt={40}
          onClick={() => { openCreate() }}
        >
          Tambah
        </Button>

      </Box>


      {/* MODAL CREATE*/}

      <ModallJalurCreate
        close={closeCreate}
        errors={errors}
        handleSubmit={handleSubmit}
        opened={openedCreate}
        register={register}
        setValue={setValue}
        tambahJalurHandler={tambahJalurHandler}

      />

      {/* MODAL EDIT */}

      <ModallJalurEdit
        close={closeEdit}
        errors={errors}
        handleSubmit={handleSubmit}
        opened={openedEdit}
        register={register}
        setValue={setValue}
        editJalurHandler={editJalurHandler}
        jalur={jalur}
      />

    </Page>
  );
};

export default AlurPPPDB;
