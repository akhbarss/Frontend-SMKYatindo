import { ActionIcon, Badge, Box, Button, Divider, Group, Image, Paper, ScrollArea, Skeleton, Stack, Text, ThemeIcon, useMantineTheme } from "@mantine/core";
import { modals } from "@mantine/modals";
import { UseQueryResult, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { BsFileEarmarkImage } from "react-icons/bs";
import { MdClose } from "react-icons/md";
import { Payment, getAllPayment } from "../../../apis/student/getAllPayment";
import { ResponseType } from "../../../types/global";
import { DarkTheme } from "../../../utils/darkTheme";
import { useParams } from "react-router-dom";
import { ConfirmPaymentPayload, confirmPayment } from "../../../apis/student/confirmPayment";
import { convertToFileObject } from "../../../utils/imageUtils";

type TPembayaran = {
    // queryPayment: UseQueryResult<ResponseType<Payment[]>, Error>
}

const Pembayaran: React.FC<TPembayaran> = () => {
    const dark = DarkTheme()
    const theme = useMantineTheme()
    const { userId, gelombangId } = useParams()
    const queryClient = useQueryClient()


    const {
        data: payments, isLoading: loadPayments, isFetching
    } = useQuery({
        queryKey: ["get_all_payment"],
        queryFn: () => getAllPayment({ batchId: gelombangId, userId })
    })

    // async function convert() {
    //     // const files = await convertToFileObject(payments?.data[0].image);
    //     // console.log(files)
    // }
    // convert()
    console.log(payments)

    const confirmPaymentMutation = useMutation({
        mutationFn: confirmPayment
    })

    const submitConfirmPayment = (payload: ConfirmPaymentPayload) => {
        confirmPaymentMutation.mutate(payload, {
            onSuccess: (res) => {
                console.log("Succes : ", res)
                queryClient.invalidateQueries({
                    queryKey: ["get_all_payment"]
                })
                queryClient.invalidateQueries({
                    queryKey: ["get_student"]
                })
            },
            onError: (err) => {
                console.log("Failed : ", err)
            }
        })

    }

    const openModalBuktiPembayaran = () => modals.open({
        children: (
            <>
                <Box component={ScrollArea.Autosize} className='overflow-auto'>
                    <Box className='z-50 fixed top-0 right-0 left-0' p={10}>
                        <ActionIcon variant='light' onClick={() => modals.closeAll()} ml={"auto"}>
                            <MdClose size={30} />
                        </ActionIcon>
                    </Box>
                    <Image src='/contoh-bukti-pembayaran.jpg' />
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
    });

    return (
        <Stack>
            {
                isFetching ? (
                    <>
                        <Skeleton height={130} />
                    </>
                )
                    : (
                        <>
                            {
                                payments?.data.length > 0 ? payments?.data?.map(payment => {
                                    const formatter = new Intl.NumberFormat('id-ID', {
                                        style: 'currency',
                                        currency: 'IDR'
                                    })

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
                                                        {
                                                            transfer && <Text weight={"bold"}>{payment.bank_name} - {payment.bank_account} a/n {payment.bank_user}</Text>
                                                        }
                                                        {
                                                            cash && <Text weight={"bold"}>Tunai</Text>
                                                        }

                                                    </Group>
                                                    <Box >
                                                        <Text weight={"bold"} align="right" c={dark ? "green" : "#2A166F"}>+ {formatter.format(payment?.total).replace(",00", "")}</Text>
                                                    </Box>
                                                </Group>
                                                <Group
                                                    p={"lg"}
                                                    bg={dark ? theme.colors.dark[5] : "#E3E5FC"}
                                                    className="rounded-md cursor-pointer"
                                                    onClick={() => openModalBuktiPembayaran()}
                                                >
                                                    <ThemeIcon radius={"100%"} color="#2A166F" size={50}>
                                                        <BsFileEarmarkImage size={30} />
                                                    </ThemeIcon>
                                                    <Text size={20} weight={"bold"}>File Bukti Pembayaran</Text>
                                                </Group>
                                                <Divider />
                                                <Group grow>
                                                    <Text>Sabtu, 04 November 2023</Text>
                                                    <Group position="right">
                                                        {
                                                            payment.status === "PAYMENT_CONFIRMED" && (
                                                                <Button color="red">Batalkan Konfirmasi</Button>
                                                            )
                                                        }
                                                        {
                                                            payment.status === "WAITING_PAYMENT" && (
                                                                <Button onClick={() => {
                                                                    submitConfirmPayment({
                                                                        payment_id: payment.id,
                                                                        student_id: +userId
                                                                    })
                                                                }} >Konfirmasi</Button>
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

        </Stack>
    )
}

export default Pembayaran