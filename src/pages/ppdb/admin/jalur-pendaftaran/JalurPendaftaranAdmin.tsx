/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Suspense, useEffect } from "react"
import { DateTimePicker } from "@mantine/dates"
import {
  ActionIcon,
  Title,
  Box,
  Button,
  Group,
  Modal,
  Paper,
  Tabs,
  Skeleton,
  Stack,
  Text,
  useMantineTheme
} from "@mantine/core";
import { useForm as useFormMantine } from "@mantine/form";
import { useDisclosure, useLocalStorage } from "@mantine/hooks";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { AiFillEdit } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CreateJalurPayload, TipeJalur, createJalur } from "../../../../apis/jalur/createJalur";
import { DeleteJalurPayload, deleteJalur } from "../../../../apis/jalur/deleteJalur";
import { EditJalurPayload, editJalur } from "../../../../apis/jalur/editJalur";
import { GetAllJalurPendaftaran } from "../../../../apis/jalur/getJalur";
import Page from "../../../../components/Page";
import PageLabel from "../../../../components/PageLabel";
import ModalJalurAdmin from "../../../../components/modal/modalJalurAdmin";
import DataKosong from "../../../../components/ppdb/dataKosong";
import { useBreakPoints } from "../../../../utils/UseBreakpoints";

export type FormValuesCreateJalur = {
  id: number | null
  tipeJalur: string
  namaJalur: string
  waktuDibuka: string
  waktuDitutup: string
  biayaPendaftaran: number
}

const JalurPendaftarahAdmin = ({ children }: { children: React.ReactNode }) => {
  const theme = useMantineTheme();
  const dark = theme.colorScheme === "dark";
  const location = useLocation()
  const { lg, md, sm, xl, xs } = useBreakPoints()
  const navigate = useNavigate()

  useEffect(() => {
    if (location.pathname === "/ppdb/main/jalur-pendaftaran") {
      navigate("/ppdb/main/jalur-pendaftaran/smp")
    }
  }, [navigate, location.pathname])

  // const [openedCreate, { open: openCreate, close: closeCreate }] = useDisclosure(false);
  // const [openedEdit, { open: openEdit, close: closeEdit }] = useDisclosure(false);
  // const [openedDelete, { open: openDelete, close: closeDelete }] = useDisclosure(false);

  // const formCreateMantine = useFormMantine<FormValuesCreateJalur>({
  //   initialValues: {
  //     id: null,
  //     namaJalur: "",
  //     waktuDibuka: null,
  //     waktuDitutup: null,
  //     tipeJalur: "",
  //     biayaPendaftaran: null
  //   },
  //   transformValues: (values) => ({
  //     ...values,
  //     biayaPendaftaran: +(values.biayaPendaftaran as unknown as string).substring(4).replace(/\./g, ""),
  //     waktuDibuka: (values.waktuDibuka as unknown as Date).toISOString(),
  //     waktuDitutup: (values.waktuDitutup as unknown as Date).toISOString(),
  //   }),
  //   validate: {
  //     waktuDibuka: (val) => (val === null ? 'Tolong masukkan waktu dibuka' : null),
  //     waktuDitutup: (val) => (val === null ? 'Tolong masukkan waktu ditutup' : null),
  //   },
  // })

  // const {
  //   data: dataJalur,
  //   isErr,
  //   load,
  //   refetch
  // } = GetAllJalurPendaftaran()

  // const createJalurMutation = useMutation({
  //   mutationFn: createJalur
  // })

  // const deleteJalurMutation = useMutation({
  //   mutationFn: deleteJalur
  // })

  // const editJalurMutation = useMutation({
  //   mutationFn: editJalur
  // })

  // if (isErr) return <h1>Terjadi Kesalahan</h1>

  // function submitCreateJalur(payload: CreateJalurPayload) {
  //   createJalurMutation.mutate(payload, {
  //     onSuccess: (response) => {
  //       refetch()
  //       console.log(response)
  //       closeCreate()
  //       toast.success("Data berhasil ditambahkan")
  //       formCreateMantine.reset()
  //     },
  //     onError: (error) => {
  //       toast.error("Data gagal ditambahkan")
  //       console.log(error)
  //     },
  //   })
  // }

  // function submitEditJalur(payload: EditJalurPayload) {
  //   editJalurMutation.mutate(payload, {
  //     onSuccess: (response) => {
  //       console.log(response)
  //       formCreateMantine.reset()
  //       closeEdit()
  //       refetch()
  //       toast.success("Data berhasil diubah")
  //     },
  //     onError: (error) => {
  //       toast.error("Data gagal diubah")
  //       console.log(error)
  //     },
  //   })
  // }

  // function submitDeleteJalur(payload: DeleteJalurPayload) {
  //   deleteJalurMutation.mutate(payload, {
  //     onSuccess: () => {
  //       closeDelete()
  //       toast.success("Data berhasil dihapus")
  //       formCreateMantine.reset()
  //       refetch()
  //     },
  //     onError: (error) => {
  //       toast.error("Data gagal dihapus")
  //       console.log(error)
  //     },
  //   })
  // }

  // function tambahJalurHandler(datas: FormValuesCreateJalur) {
  //   const data: CreateJalurPayload = {
  //     name: datas.namaJalur,
  //     type: datas.tipeJalur as TipeJalur,
  //     end_date: datas.waktuDitutup,
  //     price: datas.biayaPendaftaran,
  //     start_date: datas.waktuDibuka
  //   }
  //   submitCreateJalur(data)
  // }

  // function deleteJalurHandler(id: number) {
  //   submitDeleteJalur({ id })
  // }

  // function editJalurHandler(datas: FormValuesCreateJalur) {
  //   submitEditJalur({
  //     id: datas.id,
  //     end_date: datas.waktuDitutup,
  //     name: datas.namaJalur,
  //     price: datas.biayaPendaftaran,
  //     start_date: datas.waktuDibuka,
  //     type: datas.tipeJalur as TipeJalur
  //   })
  // }

  // const contentJalurBackend = dataJalur && dataJalur.length > 0 ? dataJalur.map(item => {
  //   const {
  //     end_date,
  //     id,
  //     name,
  //     price,
  //     start_date,
  //     type,
  //   } = item
  //   const starDate = new Date(start_date)
  //   const endDate = new Date(end_date)
  //   return (
  //     <Box
  //       key={item.id}
  //       sx={theme => ({
  //         borderRadius: "6px",
  //         boxShadow: "0 5px 10px -5px black",
  //         display: "flex",
  //         alignItems: "center",
  //         backgroundColor: `${dark ? theme.colors.dark[9] : "white"}`,
  //         border: "0.0625rem solid #dee2e6"
  //       })}
  //     >
  //       <Link
  //         className="flex-[1] no-underline p-[16px] "
  //         to={`${item.id}/informasi-umum`}
  //       >
  //         <Text size={"xl"} weight={"bold"} sx={{
  //           color: `${dark ? "white" : "black"}`
  //         }}>
  //           {item.name}
  //         </Text>
  //         <Group>

  //           <Text c={dark ? "#9E9EFF" : "#2A166F"}>
  //             {starDate !== null && starDate.toLocaleDateString("id-ID", {
  //               year: 'numeric',
  //               month: 'short',
  //               day: 'numeric',
  //               hour: 'numeric',
  //               minute: 'numeric',
  //             })} &ndash; {endDate !== null && endDate.toLocaleDateString("id-ID", {
  //               year: 'numeric',
  //               month: 'short',
  //               day: 'numeric',
  //               hour: 'numeric',
  //               minute: 'numeric'
  //             })}
  //           </Text>
  //           <Text color="white">
  //             {item?.countStudent ? item.countStudent : 0} Pendaftar
  //           </Text>
  //         </Group>
  //       </Link>
  //       <div className="px-4 flex gap-2 ">
  //         {/* EDIT BUTTON */}
  //         <ActionIcon
  //           variant="filled"
  //           color="brand-yatindo"
  //           size={40}
  //           radius={100}
  //           onClick={() => {
  //             console.log(item)
  //             openEdit()
  //             formCreateMantine.setValues({
  //               id,
  //               // @ts-ignore
  //               biayaPendaftaran: "Rp. " + price,
  //               namaJalur: name,
  //               tipeJalur: type,
  //               // @ts-ignore
  //               waktuDibuka: starDate,
  //               // @ts-ignore
  //               waktuDitutup: endDate
  //             })
  //           }}
  //         >
  //           <AiFillEdit size={20} />
  //         </ActionIcon>
  //         {/* DELETE BUTTON */}
  //         <ActionIcon
  //           variant="filled"
  //           color="brand-yatindo"
  //           size={40}
  //           radius={100}
  //           onClick={() => {
  //             openDelete()
  //             formCreateMantine.setValues({
  //               id,
  //               namaJalur: name
  //             })
  //           }}
  //         >
  //           <BsFillTrashFill size={20} />
  //         </ActionIcon>
  //       </div>
  //     </Box>
  //   )
  // }) : (
  //   <DataKosong />
  // )

  return (
    <Page title={"Jalur Pendaftaran"}>
      <PageLabel label={"Jalur Pendaftaran"} />

      <Box mt={40} className={`style-box relative flex-1 max-w-[70rem] mx-auto  ${xs ? "" : "flex-1  "}`}>

        <Tabs
          value={location.pathname.split("/")[4]}
          onTabChange={(value) => navigate(`${value}`)}
          color="blue"
          styles={{
            tabLabel: {
              fontSize: "20px",
              color: "white"
            },
            tab: {
              backgroundColor: "tranparent",
              ":hover": {
                backgroundColor: "transparent",
                opacity: 0.9
              }
            }
          }}
        >
          <Paper
            withBorder
            shadow="md"
            radius={"xl"}
            bg={"linear-gradient(to left bottom, #6952ba, #160942)"}
            sx={theme => ({
              backgroundColor: dark ? theme.colors.dark[6] : theme.white,
              padding: "2rem",
              marginTop: "1rem"
            })}
          >
            <Title color="white" order={2} >Jalur Pendaftaran dengan Tipe Jenjang :</Title>
            <Tabs.List mt={20}>
              <Tabs.Tab  value="smp">SMP</Tabs.Tab>
              <Tabs.Tab value="smk">SMK</Tabs.Tab>
            </Tabs.List>
          </Paper>
          <Suspense fallback={<Skeleton h={80} mt={40} />}>
            {children}
          </Suspense>
        </Tabs>
      </Box>
    </Page>
  );
};

export default JalurPendaftarahAdmin;
