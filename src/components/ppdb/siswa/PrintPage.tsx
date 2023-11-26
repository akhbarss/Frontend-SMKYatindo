import { Box, Button, Divider, Group } from "@mantine/core";
import React, { useRef } from 'react';
import { FaFilePdf } from "react-icons/fa6";
import { useReactToPrint } from "react-to-print";
import classes from "../../style/CetakKartuSMK.module.css";
import html2pdf from "html2pdf.js"

class PrintContent extends React.Component {
    render() {
        return (
            <div
                className='print-page'
                style={{
                    backgroundColor: "white",
                    marginTop: "50px",
                    marginInline: "auto",
                    maxWidth: "800px",
                    padding: "10px"
                }}
            >
                <div className={classes["card-student"]} >
                    <div className={classes["inner-card"]}>
                        <header className={classes["header"]}>
                            <img className={classes["logo-yatindo"]} src="/logo-yatindo-hd.png" alt="" />
                            <h3 className={classes["title"]}>
                                Kartu Pendaftaran Siswa <br /> Tahun Ajaran 2024 - 2025
                            </h3>
                        </header>

                        <Divider mt={20} orientation='horizontal' size={"lg"} color='orange' />

                        <div className={classes["biodata"]}>
                            <img className={classes["profile"]} src="/smp.jpg" alt="" />
                            <div
                                className={classes["biodata-detail"]}
                            >
                                <table>
                                    <tr>
                                        <td>
                                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                <p>Nomor Peserta</p>
                                                <p>:</p>
                                            </div>
                                        </td>
                                        <td>2023 - 01 - 001</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                <p>Nama Peserta</p>
                                                <p>:</p>
                                            </div>
                                        </td>
                                        <td>Adi Hidayat</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                <p>Nomor Telepon</p>
                                                <p>:</p>
                                            </div>
                                        </td>
                                        <td>082110987765</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                <p>Alamat</p>
                                                <p>:</p>
                                            </div>
                                        </td>
                                        <td>Perumahan Mutiara Gading Perumahan Mutiara Gading Perumahan Mutiara Gading Perumahan Mutiara Gading Perumahan Mutiara Gading Perumahan Mutiara Gading</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                <p>Asal Sekolah</p>
                                                <p>:</p>
                                            </div>
                                        </td>
                                        <td>Smp Yatindo</td>
                                    </tr>
                                </table>
                            </div>
                        </div>

                        <Divider orientation='horizontal' size={"lg"} color='orange' />

                        <div className={classes["detail-pendaftaran"]}>
                            <table className="table">
                                <tr>
                                    <td>
                                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                                            <p>Jalur</p>
                                            <p>:</p>
                                        </div>
                                    </td>
                                    <td>PEMBELIAN FORMULIR</td>
                                </tr>
                                <tr>
                                    <td>
                                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                                            <p>Pilihan Jurusan 1</p>
                                            <p>:</p>
                                        </div>
                                    </td>
                                    <td>Teknik Jaringan Komputer dan Telekomunikasi</td>
                                </tr>
                                <tr>
                                    <td>
                                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                                            <p>Pilihan Jurusan 2</p>
                                            <p>:</p>
                                        </div>
                                    </td>
                                    <td>Teknik Kendaraan Ringan</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

type PrintPageProps = {
    dummy: string
}

const PrintPage = (props: PrintPageProps) => {

    // console.log(props)

    const componentRef = useRef()
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
                const exporter = new html2pdf(html, { filename: "Nota Simple.pdf" });
                await exporter.getPdf(true);
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
                >Download
                </Button>
            </Group>
            <div style={{ display: "none" }}>
                <PrintContent ref={componentRef} />
            </div>

            <PrintPage />
        </Box>
    )
}

export default PrintPage