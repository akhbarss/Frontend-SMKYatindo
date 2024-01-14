import {
    ActionIcon,
    Badge,
    Box,
    Button,
    Divider,
    Group,
    Image,
    Modal,
    Paper,
    ScrollArea,
    Skeleton,
    Stack,
    Text,
    ThemeIcon,
    useMantineTheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { modals } from "@mantine/modals";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { BsFileEarmarkImage } from "react-icons/bs";
import { MdClose, MdOpenInNew } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import { ConfirmPaymentPayload, confirmPayment } from "../../../../apis/student/confirmPayment";
import { getAllPayment } from "../../../../apis/student/getAllPayment";
import { DarkTheme } from "../../../../utils/darkTheme";
import { convertToFileObject } from "../../../../utils/imageUtils";

const Pembayaran = () => {
    const dark = DarkTheme()
    const theme = useMantineTheme()
    const { userId, gelombangId } = useParams()
    const queryClient = useQueryClient()
    const [opened, { open, close }] = useDisclosure()

    const {
        data: payments, isFetching
    } = useQuery({
        queryKey: ["get_all_payment"],
        queryFn: () => getAllPayment({ batchId: gelombangId, userId })
    })

    const confirmPaymentMutation = useMutation({
        mutationFn: confirmPayment
    })

    const submitConfirmPayment = (payload: ConfirmPaymentPayload) => {
        confirmPaymentMutation.mutate(payload, {
            onSuccess: (res) => {
                queryClient.invalidateQueries({
                    queryKey: ["get_all_payment"]
                })
                queryClient.invalidateQueries({
                    queryKey: ["get_student"]
                })
                toast.success("Success")
            },
            onError: (err) => {
                toast.error("Gagal mengkonfirmasi data")
            }
        })
    }

    const openModalBuktiPembayaran = async (imageName: string) => {
        const img = imageName && await convertToFileObject(
            imageName
        )
        modals.open({
            children: (
                <>
                    <Box component={ScrollArea.Autosize} className='overflow-auto'>
                        <Box className='z-50 fixed top-0 right-0 left-0' p={10}>
                            <ActionIcon
                                ml={"auto"}
                                variant='light'
                                onClick={() => {
                                    modals.closeAll()
                                }}
                            >
                                <MdClose size={30} />
                            </ActionIcon>
                        </Box>
                        {
                            img?.length > 0 ? img.map((file, index) => {
                                const imageUrl = URL.createObjectURL(file);
                                return (
                                    <Image
                                        key={index}
                                        src={imageUrl}
                                        imageProps={{
                                            onLoad: () => URL.revokeObjectURL(imageUrl),
                                        }}
                                    />
                                );
                            }) : (
                                <Box
                                    mt={20}
                                    p={100}
                                    sx={{
                                        justifyContent: "center",
                                        alignItems: "center"
                                    }}
                                >
                                    <Text align="center" fw={"bolder"} fz={24}>Data kosong</Text>
                                </Box>
                            )
                        }
                        {/* <Image src={`http://localhost:8080/uploads/${imageName}`} /> */}
                    </Box>
                </>
            ),
            size: "100rem",
            styles: {
                body: {
                    padding: 0
                },
                header: { display: "none" }
            },
            centered: true
        })
    }

    return (
        <Stack>
            {
                isFetching ? (<Skeleton height={130} />)
                    : (
                        <>
                            {
                                payments?.data.length > 0 ? payments?.data?.map(payment => {
                                    const formatter = new Intl.NumberFormat('id-ID', {
                                        style: 'currency',
                                        currency: 'IDR'
                                    })
                                    const nameImage = payment?.image
                                    const transfer = payment.method === "TRANSFER"
                                    const cash = payment.method === "CASH"
                                    const confirmed = payment?.status === "PAYMENT_CONFIRMED"
                                    const notConfirmed = payment?.status === "WAITING_PAYMENT"

                                    return (
                                        <Paper
                                            key={payment.id}
                                            shadow="lg"
                                            w={"100%"}
                                            withBorder
                                            p={"lg"}
                                            sx={theme => ({ backgroundColor: dark ? theme.colors.dark[8] : theme.white, flex: 1 })}
                                        >
                                            <Stack>
                                                <Group grow>
                                                    <Group>
                                                        <Badge
                                                            size="md"
                                                            color={(confirmed && "green") || (notConfirmed && "red")}
                                                            styles={{
                                                                root: {
                                                                    backgroundColor: `${((confirmed && !dark) && "#dcfce2") || (notConfirmed ? dark ? "#3D1B1C" : "#ffd1d1" : "")}`
                                                                }
                                                            }}
                                                        >
                                                            {payment?.status == "PAYMENT_CONFIRMED" && <p>Terkonfirmasi</p>}
                                                            {payment?.status == "WAITING_PAYMENT" && <p>Belum Terkonfirmasi</p>}
                                                        </Badge>
                                                        {transfer && <Text weight={"bold"}>{payment.bank_name} - {payment.bank_account} a/n {payment.bank_user}</Text>}
                                                        {cash && <Text weight={"bold"}>Tunai</Text>}
                                                    </Group>
                                                    <Box >
                                                        <Text weight={"bold"} align="right" c={dark ? "green" : "#2A166F"}>+ {formatter.format(payment?.total).replace(",00", "")}</Text>
                                                    </Box>
                                                </Group>
                                                <Group p={"lg"} bg={dark ? theme.colors.dark[5] : "#E3E5FC"}>
                                                    {/* OPEN MODAL IMAGE */}
                                                    <Group
                                                        className="rounded-md cursor-pointer flex-[2]"
                                                        onClick={() => {
                                                            openModalBuktiPembayaran(nameImage)
                                                        }}
                                                    >
                                                        <ThemeIcon radius={"100%"} color="#2A166F" size={50}>
                                                            <BsFileEarmarkImage size={30} />
                                                        </ThemeIcon>
                                                        <Text size={20} weight={"bold"}>File Bukti Pembayaran</Text>
                                                    </Group>

                                                    {/* OPEN IMAGE IN NEW TAB */}
                                                    <ActionIcon
                                                        component={Link}
                                                        to={`${import.meta.env.VITE_DOMAIN}/uploads/${nameImage}`}
                                                        variant="filled"
                                                        color="#2A166F"
                                                        size={50}
                                                        radius={"50%"}
                                                        target="_blank"
                                                    >
                                                        <MdOpenInNew size={30} />
                                                    </ActionIcon>
                                                </Group>
                                                <Divider />
                                                <Group grow>
                                                    <Text>Sabtu, 04 November 2023</Text>
                                                    <Group position="right">
                                                        {/* {payment.status === "PAYMENT_CONFIRMED" && <Button color="red">Batalkan Konfirmasi</Button>} */}
                                                        {
                                                            payment.status === "WAITING_PAYMENT" && (
                                                                <Button
                                                                    onClick={() => {
                                                                        modals.openConfirmModal({
                                                                            title: "Konfirmasi Pembayaran",
                                                                            children: "Anda yakin ingin mengkonfirmasi pembayaran ini?",
                                                                            onConfirm: () => {
                                                                                submitConfirmPayment({
                                                                                    payment_id: payment.id,
                                                                                    student_id: +userId
                                                                                })
                                                                            },
                                                                            onCancel: () => console.log("cancel"),
                                                                            labels: { cancel: "Batal", confirm: "Konfirmasi" }
                                                                        })
                                                                    }}
                                                                >
                                                                    Konfirmasi
                                                                </Button>
                                                            )
                                                        }
                                                    </Group>
                                                </Group>
                                            </Stack>
                                        </Paper>
                                    )
                                }) : (
                                    <>
                                        <Paper shadow="lg" p="lg" withBorder>
                                            <Text size={24} weight={"bold"}>Belum ada Pembayaran</Text>
                                        </Paper>
                                    </>
                                )
                            }
                        </>
                    )
            }


            <Modal
                opened={opened}
                onClose={() => close()}

            >


            </Modal>

        </Stack>
    )
}

export default Pembayaran