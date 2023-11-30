import { Box, Text, Button, Divider, Group } from "@mantine/core";
import html2pdf from "html2pdf.js";
import { Component, useRef } from 'react';
import { FaFilePdf } from "react-icons/fa6";
import { useReactToPrint, } from "react-to-print";
import { useBreakPoints } from "../../../utils/UseBreakpoints";
import { DarkTheme } from "../../../utils/darkTheme";
import classes from "../../style/CetakKartuSMK.module.css";
import { jwtDecode } from "../../../apis/alur/decodeJWT";
import { useQuery } from "@tanstack/react-query";

interface TPrintContent {
    name: string | null;
    awalTahun: string | null;
    akhirTahun: string | null;
    profileImgName: string | null;
    nomorPeserta: string | null;
    noTelepon: string | null;
    alamat: string | null;
    asalSekolah: string | null;
    namaJalur: string | null;
    pilihanJalur1: string | null;
    pilihanJalur2: string | null;

    dummyCard: boolean;
    textColor: "white" | "black"
    // dark: boolean
    bgColor: "white" | "black"
}

class PrintContent extends Component<TPrintContent> {
    render() {
        const {
            alamat,
            asalSekolah,
            namaJalur,
            pilihanJalur1,
            pilihanJalur2,
            name,
            noTelepon,
            nomorPeserta,
            profileImgName,
            akhirTahun,
            awalTahun,
            dummyCard,
            textColor,
            bgColor
        } = this.props

        return (
            <div
                className='print-page'
                style={{
                    backgroundColor: !dummyCard ? "white" : "transparent",
                    marginTop: "50px",
                    marginInline: "auto",
                    maxWidth: "800px",
                    padding: "10px",
                    color: textColor
                }}
            >
                <div className={classes["card-student"]} >
                    <div className={classes["inner-card"]} style={{ backgroundColor: bgColor }}>
                        <header className={classes["header"]}>
                            <img className={classes["logo-yatindo"]} src="/logo-yatindo-hd.png" alt="" />
                            <h3 className={classes["title"]}>
                                SMP - SMK TINTA EMAS INDONESIA <br />Kartu Pendaftaran Siswa <br /> Tahun Ajaran {awalTahun ? awalTahun : " undenfined"} &ndash; {akhirTahun ? akhirTahun : "undefined"}
                            </h3>
                        </header>

                        <Divider mt={20} orientation='horizontal' size={"lg"} color='orange' />

                        <div className={classes["biodata"]}>
                            {
                                profileImgName ? <img className={classes["profile"]} src={`/${profileImgName}`} alt=" " /> : <div className={classes["profile"]} />
                            }
                            <div className={classes["biodata-detail"]}>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                    <p>Nomor Peserta</p>
                                                    <p>: </p>
                                                </div>
                                            </td>
                                            <td>{nomorPeserta ? nomorPeserta : "-"}</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                    <p>Nama Peserta</p>
                                                    <p>: </p>
                                                </div>
                                            </td>
                                            <td>{name ? name : "-"}</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                    <p>Nomor Telepon</p>
                                                    <p>: </p>
                                                </div>
                                            </td>
                                            <td>{noTelepon ? noTelepon : "-"}</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                    <p>Alamat</p>
                                                    <p>: </p>
                                                </div>
                                            </td>
                                            <td>{alamat ? alamat : "-"}</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                    <p>Asal Sekolah</p>
                                                    <p>: </p>
                                                </div>
                                            </td>
                                            <td>{asalSekolah ? asalSekolah : "-"}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <Divider orientation='horizontal' size={"lg"} color='orange' />

                        <div className={classes["detail-pendaftaran"]}>
                            <table className="table">
                                <tbody>
                                    <tr>
                                        <td>
                                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                <p>Jalur</p>
                                                <p>: </p>
                                            </div>
                                        </td>
                                        <td>PEMBELIAN FORMULIR</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                <p>Pilihan Jurusan 1</p>
                                                <p>: </p>
                                            </div>
                                        </td>
                                        <td>Teknik Jaringan Komputer dan Telekomunikasi</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                <p>Pilihan Jurusan 2</p>
                                                <p>: </p>
                                            </div>
                                        </td>
                                        <td>Teknik Kendaraan Ringan</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const PrintPage = () => {
    const dark = DarkTheme()
    const componentRef = useRef()
    const { md, } = useBreakPoints()

    const {
        error,
        isError,
        isSuccess,
        data: user,
    } = useQuery({
        queryFn: jwtDecode,
        queryKey: ["session-print"],
    });

    console.log(user)

    const handlePrint = useReactToPrint({
        onPrintError: (error) => console.log({ error }),
        content: () => componentRef.current,
        removeAfterPrint: true,
        copyStyles: true,
        print: async (printIframe: HTMLIFrameElement) => {
            const document = printIframe.contentDocument;
            if (document) {
                const html = document.getElementsByTagName("html")[0];
                console.log(html);
                try {
                    const exporter = new html2pdf(html, { filename: `PDF_SISWA_.pdf` })
                    console.log(exporter)
                } catch (error) {
                    console.log("error : ", error)
                }
            }
        }
    })

    return (
        <Box >
            <Group position='center' mt={50}>
                <Button
                    size='md'
                    leftIcon={<FaFilePdf size={25} />}
                    onClick={handlePrint}
                >
                    Download
                </Button>
            </Group>
            <div style={{ display: "none" }}>
                <PrintContent
                    dummyCard={false}
                    ref={componentRef}
                    akhirTahun="2025"
                    alamat="bekasi"
                    asalSekolah="Smp Yatindo"
                    awalTahun="2024"
                    namaJalur="PENGEMBALIAN FORMULIR REGULER GEL. 2"
                    name="Muhammad Akhbar Firdaus"
                    noTelepon="082110977214"
                    nomorPeserta="2023-2-001"
                    pilihanJalur1="TKJ"
                    pilihanJalur2="AKL"
                    profileImgName=""
                    textColor="black"
                    bgColor="white"
                />
            </div>
            {
                md ? (
                    <>
                        <PrintContent
                            dummyCard
                            akhirTahun="2025"
                            alamat="bekasi"
                            asalSekolah="Smp Yatindo"
                            awalTahun="2024"
                            namaJalur="PENGEMBALIAN FORMULIR REGULER GEL. 2"
                            name="Muhammad Akhbar Firdaus"
                            noTelepon="082110977214"
                            nomorPeserta="2023-2-001"
                            pilihanJalur1="TKJ"
                            pilihanJalur2="AKL"
                            profileImgName=""
                            textColor={`${dark ? "white" : "black"}`}
                            bgColor={`${dark ? "black" : "white"}`}
                        />
                    </>
                ) : (
                    <>
                        <Box mt={40}>
                            <Text align="center">
                                Buka website ini di Dekstop/Laptop untuk melihat tampilan kartu formulir
                            </Text>
                        </Box>
                    </>
                )
            }
        </Box>
    )
}

export default PrintPage