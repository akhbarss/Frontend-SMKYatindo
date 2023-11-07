import {
  Accordion,
  AccordionControlProps,
  ActionIcon,
  Button,
  Center,
  LoadingOverlay,
  Paper,
  Skeleton,
  Text
} from "@mantine/core";
import { useForm as useFormMantine } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";
import { AiFillEdit } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { CreateGelombangPayload, createGelombang } from "../../../../apis/gelombang/createGelombang";
import { DeleteGelombangPayload, deleteGelombang } from "../../../../apis/gelombang/deleteGelombang";
import { EditGelombangPayload, editGelombang } from "../../../../apis/gelombang/editGelombang";
import { getGelombangByIdJalur } from "../../../../apis/gelombang/getGelombangByIdJalur";
import { TGelombang } from "../../../../apis/jalur/getJalur";
import Page from "../../../../components/Page";
import ModalGelombang from "../../../../components/modal/modalGelombang";
import { DarkTheme } from "../../../../utils/darkTheme";

export type FormValuesCreateGelombang = {
  id: string | null
  nama: string;
  jumlahPenerimaan: string;
  waktuDibuka: string;
  waktuDitutup: string;
  namaBank: string;
  nomorRekening: string;
  namaPemilikRekening: string;
  biayaPendaftaran: number;
  kodeGelombang: string;
}

const Gelombang = () => {
  const dark = DarkTheme()
  const { idJalurPendaftaran } = useParams()
  const [openedCreate, { open: openCreate, close: closeCreate }] = useDisclosure(false);
  const [openedEdit, { open: openEdit, close: closeEdit }] = useDisclosure(false);

  const formCreateM = useFormMantine<FormValuesCreateGelombang>({
    initialValues: {
      id: null,
      nama: "",
      jumlahPenerimaan: "",
      waktuDibuka: null,
      waktuDitutup: null,
      namaBank: "",
      nomorRekening: "",
      namaPemilikRekening: "",
      biayaPendaftaran: null,
      kodeGelombang: "",
    },
    transformValues: (values) => ({
      ...values,
      biayaPendaftaran: +(values.biayaPendaftaran as unknown as string).substring(4).replace(/\./g, ""),
      waktuDibuka: (values.waktuDibuka as unknown as Date).toISOString(),
      waktuDitutup: (values.waktuDitutup as unknown as Date).toISOString(),
    }),
    validate: {
      waktuDibuka: (val) => (val === null ? 'Tolong masukkan waktu dibuka' : null),
      waktuDitutup: (val) => (val === null ? 'Tolong masukkan waktu ditutup' : null),
    },
  })

  // const {
  //   data,
  //   err,
  //   isErr,
  //   load,
  //   refetch
  // } = GetGelombangByIdJalur(idJalurPendaftaran)

  const {
    data: gelombang,
    isLoading,
    isError,
    refetch,
    error
  } = useQuery({
    queryKey: ["get_gelombang_by_id_jalur"],
    queryFn: () => getGelombangByIdJalur(idJalurPendaftaran)
  })

  const createGelombangMutation = useMutation({
    mutationFn: createGelombang
  })

  const editGelombangMutation = useMutation({
    mutationFn: editGelombang
  })

  const deleteGelombangMutation = useMutation({
    mutationFn: deleteGelombang
  })

  // CREATE
  function submitCreateGelombang(payload: CreateGelombangPayload) {
    createGelombangMutation.mutate(payload, {
      onSuccess: (res) => {
        console.log("SUCCESS : ", res)
        refetch()
        closeCreate()
        formCreateM.reset()
        toast.success("Data berhasil ditambahkan")
      },
      onError: (error) => {
        console.log("FAILED : ", error)
      },
    })
  }

  // EDIT
  function submitEditGelombang(payload: EditGelombangPayload) {
    editGelombangMutation.mutate(payload, {
      onSuccess: (res) => {
        console.log("SUCCESS : ", res)
        closeEdit()
        refetch()
        formCreateM.reset()
        toast.success("Data berhasil diubah")
      },
      onError: (error) => {
        console.log("FAILED : ", error)
      },
    })
  }

  // DELETE
  function submitDeleteGelombang(payload: DeleteGelombangPayload) {
    deleteGelombangMutation.mutate(payload, {
      onSuccess: (res) => {
        console.log("SUCCESS : ", res)
        closeCreate()
        refetch()
        toast.success("Data berhasil dihapus")
      },
      onError: (error) => {
        console.log("FAILED : ", error)
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
      waktuDitutup,
      kodeGelombang
    } = datas

    submitCreateGelombang({
      idJalur: idJalurPendaftaran,
      payloadCreate: {
        bank_account: nomorRekening,
        bank_name: namaBank,
        bank_user: namaPemilikRekening,
        end_date: waktuDitutup,
        index: 1,
        max_quota: +jumlahPenerimaan,
        name: nama,
        price: biayaPendaftaran,
        start_date: waktuDibuka,
        batchCode: kodeGelombang
      }
    })
  }

  function editGelombangHandler(datas: FormValuesCreateGelombang) {
    const {
      id,
      biayaPendaftaran,
      jumlahPenerimaan,
      nama,
      namaBank,
      namaPemilikRekening,
      nomorRekening,
      waktuDibuka,
      waktuDitutup,
      kodeGelombang,
    } = datas

    submitEditGelombang({
      id: +id,
      bank_account: nomorRekening,
      bank_name: namaBank,
      bank_user: namaPemilikRekening,
      end_date: waktuDitutup,
      index: 1,
      max_quota: +jumlahPenerimaan,
      name: nama,
      // @ts-ignore
      price: biayaPendaftaran,
      start_date: waktuDibuka,
      batchCode: kodeGelombang
    })
  }

  function deleteGelombangHandler(id: number) {
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
              const {
                bank_account,
                bank_name,
                bank_user,
                batchCode,
                end_date,
                max_quota,
                name,
                price,
                start_date,
                id
              } = data

              const startDate = new Date(start_date)
              const endDate = new Date(end_date)

              console.log(price)

              formCreateM.setValues({
                id: id + "",
                // @ts-ignore
                biayaPendaftaran: "Rp. " + price,
                jumlahPenerimaan: max_quota + "",
                kodeGelombang: batchCode,
                nama: name,
                namaBank: bank_name,
                namaPemilikRekening: bank_user,
                nomorRekening: bank_account,
                // @ts-ignore
                waktuDibuka: startDate,
                // @ts-ignore
                waktuDitutup: endDate
              })
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

  const contentGelombang = (
    <>
      {gelombang?.data.length < 1 ? (
        ""
      ) : (

        <Accordion
          multiple
          variant="separated"
          chevronPosition="left"
        >
          {gelombang?.data?.map(gelombang => (
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
                      <p>{gelombang.countStudent} Pendaftar</p>
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
          ))}
        </Accordion>
      )}
    </>
  )

  return (
    <Page title="Gelombang">

      <Paper
        withBorder
        shadow="sm"
        radius={"4rem"}
        px={"2.5rem"}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "1rem 2rem"
        }}
      >
        <Text weight={"bold"} size={"xl"}>Daftar Gelombang</Text>
        <Button onClick={() => openCreate()} >
          Tambah Gelombang
        </Button>
      </Paper>

      {
        isLoading ? (
          <Skeleton height={80} />
        )
          : (
            contentGelombang
          )
      }


      <ModalGelombang
        opened={openedCreate}
        close={closeCreate}
        formMantine={formCreateM}
        action={{
          actionFn: tambahGelombangHandler,
          label: "Tambah"
        }}
        loading={createGelombangMutation.status === "pending"}
      />

      <ModalGelombang
        opened={openedEdit}
        formMantine={formCreateM}
        action={{
          actionFn: editGelombangHandler,
          label: "Ubah"
        }}
        close={() => {
          closeEdit()
          formCreateM.reset()
        }}
        loading={editGelombangMutation.status === "pending"}
      />

      <LoadingOverlay visible={deleteGelombangMutation.status === "pending"} overlayBlur={1} />
      <Toaster position="top-center" reverseOrder={false} />
    </Page>
  )
}

export default Gelombang