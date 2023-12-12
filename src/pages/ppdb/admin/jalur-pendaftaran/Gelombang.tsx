/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FaUser } from "react-icons/fa6";
import {
  Accordion,
  AccordionControlProps,
  ActionIcon,
  Badge,
  Box,
  Button,
  Center,
  Group,
  Modal,
  Paper,
  Skeleton,
  Stack,
  Text,
  ThemeIcon,
  Title,
  useMantineTheme
} from "@mantine/core";
import { useForm as useFormMantine } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { AiFillEdit } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
import { LuCalendarClock } from "react-icons/lu";
import { useParams } from "react-router-dom";
import { CreateGelombangPayload, createGelombang } from "../../../../apis/gelombang/createGelombang";
import { DeleteGelombangPayload, deleteGelombang } from "../../../../apis/gelombang/deleteGelombang";
import { EditGelombangPayload, editGelombang } from "../../../../apis/gelombang/editGelombang";
import { getGelombangByIdJalur } from "../../../../apis/gelombang/getGelombangByIdJalur";
import { TGelombang } from "../../../../apis/jalur/getJalur";
import Page from "../../../../components/Page";
import TestUjianAdmin from "../../../../components/TestUjianAdmin";
import ModalGelombang from "../../../../components/modal/modalGelombang";
import { DarkTheme } from "../../../../utils/darkTheme";

export type FormValuesGelombang = {
  id: number | null
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
  const theme = useMantineTheme()
  const [openedCreate, { open: openCreate, close: closeCreate }] = useDisclosure(false);
  const [openedEdit, { open: openEdit, close: closeEdit }] = useDisclosure(false);
  const [openedDelete, { open: openDelete, close: closeDelete }] = useDisclosure(false);

  const formGelombang = useFormMantine<FormValuesGelombang>({
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

  const {
    data: gelombang,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["get_gelombang_by_id_jalur"],
    queryFn: () => getGelombangByIdJalur(idJalurPendaftaran)
  })

  const createGelombangMutation = useMutation({ mutationFn: createGelombang })
  const editGelombangMutation = useMutation({ mutationFn: editGelombang })
  const deleteGelombangMutation = useMutation({ mutationFn: deleteGelombang })

  // CREATE
  function submitCreateGelombang(payload: CreateGelombangPayload) {
    createGelombangMutation.mutate(payload, {
      onSuccess: () => {
        refetch()
        closeCreate()
        formGelombang.reset()
        toast.success("Data berhasil ditambahkan")
      },
      onError: (error) => {
        const errMsg = error?.response?.data?.messages
        if (errMsg) {
          toast.error(errMsg)
          return
        }
        toast.error("Data gagal ditambahkan")
      },
    })
  }

  // EDIT
  function submitEditGelombang(payload: EditGelombangPayload) {
    editGelombangMutation.mutate(payload, {
      onSuccess: () => {
        closeEdit()
        refetch()
        formGelombang.reset()
        toast.success("Data berhasil diubah")
      },
      onError: (error) => {
        const errMsg = error?.response?.data?.messages
        if (errMsg) {
          toast.error(errMsg)
          return
        }
        toast.error("Data gagal diubah")
      },
    })
  }

  // DELETE
  function submitDeleteGelombang(payload: DeleteGelombangPayload) {
    deleteGelombangMutation.mutate(payload, {
      onSuccess: () => {
        closeDelete()
        refetch()
        toast.success("Data berhasil dihapus")
      },
      onError: (error) => {
        const errMsg = error?.response?.data?.messages
        if (errMsg) {
          toast.error(errMsg)
          return
        }
        toast.error("Data gagal dihapus")
      },
    })
  }

  function tambahGelombangHandler(datas: FormValuesGelombang) {
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
      idJalur: +idJalurPendaftaran,
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

  function editGelombangHandler(datas: FormValuesGelombang) {
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
            color="brand-smp"
            size={40}
            radius={100}
            onClick={() => {
              const {
                bank_account,
                bank_name,
                bank_user,
                end_date,
                max_quota,
                name,
                price,
                start_date,
                id,
                batchCode
              } = data
              const startDate = new Date(start_date)
              const endDate = new Date(end_date)

              formGelombang.setValues({
                id: id,
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
            color="brand-smp"
            size={40}
            radius={100}
            onClick={() => {
              openDelete()
              formGelombang.setValues({
                id: data.id
              })
            }}
          >
            <BsFillTrashFill size={20} />
          </ActionIcon>
        </div>
      </Center>
    );
  }

  const contentGelombang = (
    <>
      {gelombang?.data && gelombang?.data?.length < 1 ? (
        ""
      ) : (
        <Accordion
          multiple
          variant="separated"
          chevronPosition="left"
          mt={30}
        >
          {gelombang?.data?.sort((a, b) => a.id - b.id).map(gelombang => {
            const startDate = gelombang?.start_date ? new Date(gelombang.start_date) : null
            const formatStartDate = startDate ? startDate.toLocaleDateString("id-ID", {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
            }).replace(".", ":").split(" pukul") : "Invalid Date"
            const endDate = gelombang?.end_date ? new Date(gelombang.end_date) : null
            const formatEndDate = endDate ? endDate.toLocaleDateString("id-ID", {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
            }).replace(".", ":").split(" pukul") : "Invalid Date"
            const dateNow = new Date()
            const isGelombangDibuka = dateNow >= startDate && startDate <= endDate

            return (
              <Accordion.Item
                key={gelombang.id}
                value={gelombang.id.toString()}
                sx={{
                  boxShadow: "0 4px 10px -6px black",
                  padding: "0 0.5rem",
                  border: "0.0625rem solid #dee2e6",
                  backgroundColor: `${dark ? theme.colors.dark[9] : "white"}`,
                  '&[data-active]': {
                    backgroundColor: dark ? theme.colors.dark[8] : "white",
                    border: "0.0625rem solid #dee2e6",
                  },
                }}
              >
                <AccordionControl
                  propss={{
                    id: gelombang.id.toString(),
                    children: (
                      <>
                        <Text fw={600} size={26}>{gelombang.name}</Text>
                        <Group mt={5}>
                          <ThemeIcon variant="light" size={30} radius={"50%"}>
                            <FaUser size={15} />
                          </ThemeIcon>
                          <Text size={16}> {gelombang.countStudent} Pendaftar</Text>
                        </Group>
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
                  <Stack p={"1rem"}>
                    <Paper
                      withBorder
                      p={"1rem"}
                      sx={theme => ({
                        backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[9] : theme.colors["brand-smp"][0],
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                      })}
                    >

                      <Group>
                        <ThemeIcon radius={"100%"} size={50} mx={"sm"}>
                          <LuCalendarClock size={30} />
                        </ThemeIcon>
                        <Box>
                          <Text size={16} weight={"bolder"}>Pendaftaran Gelombang</Text>
                          <Text>{formatStartDate} &ndash; {formatEndDate}</Text>
                        </Box>
                      </Group>
                      <Badge
                        variant="light"
                        color={`${isGelombangDibuka ? "green" : "red"}`}
                        size="lg"
                      >
                        {isGelombangDibuka ? "Dibuka" : "Ditutup"}
                      </Badge>
                    </Paper>

                    <TestUjianAdmin idGelombang={gelombang.id} />

                  </Stack>
                </Accordion.Panel>
              </Accordion.Item>
            )
          })}
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
        bg={dark ? theme.colors.dark[8] : "white"}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "1rem 2rem",
        }}
      >
        <Text weight={"bold"} size={"xl"}>Daftar Gelombang</Text>
        <Button onClick={() => openCreate()} >
          Tambah
        </Button>
      </Paper>

      {isLoading ? <Skeleton height={80} /> : contentGelombang}

      {/* MODAL CREATE GELOMBANG */}
      <ModalGelombang
        title="Tambah Gelombang PPDB"
        opened={openedCreate}
        close={closeCreate}
        formMantine={formGelombang}
        action={{
          actionFn: tambahGelombangHandler,
          label: "Tambah"
        }}
        loading={createGelombangMutation.status === "pending"}
      />

      {/* MODAL EDIT GELOMBANG */}
      <ModalGelombang
        title="Ubah Gelombang PPDB"
        opened={openedEdit}
        formMantine={formGelombang}
        action={{
          actionFn: editGelombangHandler,
          label: "Ubah"
        }}
        close={() => {
          closeEdit()
          formGelombang.reset()
        }}
        loading={editGelombangMutation.status === "pending"}
      />

      {/* MODAL DELETE GELOMBANG */}
      <Modal
        centered
        closeOnEscape={false}
        closeOnClickOutside={false}
        withCloseButton={false}
        opened={openedDelete}
        onClose={() => {
          closeDelete()
          formGelombang.reset()
        }}
      >
        <Title order={3}>
          Hapus Gelombang
        </Title>
        <Text mt={20}>
          Anda yakin ingin menghapus gelombang {formGelombang.values.nama}?
        </Text>
        <Group mt={20} position="right">
          <Button
            disabled={deleteGelombangMutation.status === "pending"}
            variant="outline"
            onClick={() => {
              closeDelete()
              formGelombang.reset()
            }}
          >
            Batal
          </Button>
          <Button
            variant="danger"
            onClick={() => deleteGelombangHandler(formGelombang.values.id)}
            loading={deleteGelombangMutation.status === "pending"}
          >
            Hapus
          </Button>
        </Group>
      </Modal>
    </Page>
  )
}

export default Gelombang