import { Box, Button, Divider, Group, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import html2pdf from "html2pdf.js";
import { Component, useCallback, useEffect, useRef, useState } from 'react';
import toast from "react-hot-toast";
import { FaFilePdf } from "react-icons/fa6";
import { useReactToPrint, } from "react-to-print";
import { jwtDecode } from "../../../apis/alur/decodeJWT";
import { useBreakPoints } from "../../../utils/UseBreakpoints";
import { DarkTheme } from "../../../utils/darkTheme";
import { convertToFileObject } from "../../../utils/imageUtils";
import classes from "../../style/CetakKartuSMK.module.css";

interface TPrintContent {
    fotoProfile: File[];
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
    grade: "SMK" | "SMP"
    dummyCard: boolean;
    textColor: "white" | "black"
    // dark: boolean
    bgColor: "white" | "black"
}

class PrintContent extends Component<TPrintContent> {
    render() {
        const {
            fotoProfile,
            alamat,
            asalSekolah,
            namaJalur,
            pilihanJalur1,
            pilihanJalur2,
            name,
            noTelepon,
            nomorPeserta,
            akhirTahun,
            awalTahun,
            dummyCard,
            textColor,
            bgColor,
            grade
        } = this.props

        const smk = grade === "SMK"
        const smp = grade === "SMP"

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
                <div className={classes[`${smk ? "card-student-smk" : "card-student-smp"}`]} >
                    <div className={classes["inner-card"]} style={{ backgroundColor: bgColor }}>
                        <header className={classes["header"]}>
                            <img className={classes["logo-yatindo"]} src="/logo-yatindo-hd.png" alt="" />
                            <h3 className={classes["title"]}>
                                Kartu Pendaftaran Siswa <br /> {grade} TINTA EMAS INDONESIA <br />Tahun Ajaran {awalTahun ? awalTahun : " undenfined"} / {akhirTahun ? akhirTahun : "undefined"}
                            </h3>
                        </header>

                        <Divider mt={20} orientation='horizontal' size={"lg"} className={classes[`${smk ? "divider-smk" : "divider-smp"}`]} />

                        <div className={classes["biodata"]}>
                            {
                                fotoProfile?.length > 0 ? fotoProfile?.map((file, index) => {
                                    const imageUrl = URL.createObjectURL(file);
                                    return (
                                        <img
                                            height={170}
                                            width={160}
                                            key={index}
                                            src={imageUrl}
                                            onLoad={() => URL.revokeObjectURL(imageUrl)}
                                        />
                                    )
                                }) : <div className={classes["profile"]} />
                            }
                            <div className={classes["biodata-detail"]}>
                                <table className={classes["table"]}>
                                    <tbody>
                                        <tr>
                                            <td className={classes["td"]}>
                                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                    <p>Nomor Peserta</p>
                                                    <p>: </p>
                                                </div>
                                            </td>
                                            <td className={classes["td"]}>{nomorPeserta ? nomorPeserta : "-"}</td>
                                        </tr>
                                        <tr>
                                            <td className={classes["td"]}>
                                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                    <p>Nama Peserta</p>
                                                    <p>: </p>
                                                </div>
                                            </td>
                                            <td className={classes["td"]}>{name ? name : "-"}</td>
                                        </tr>
                                        <tr>
                                            <td className={classes["td"]}>
                                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                    <p>Nomor Telepon</p>
                                                    <p>: </p>
                                                </div>
                                            </td>
                                            <td className={classes["td"]}>{noTelepon ? noTelepon : "-"}</td>
                                        </tr>
                                        <tr>
                                            <td className={classes["td"]}>
                                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                    <p>Alamat</p>
                                                    <p>: </p>
                                                </div>
                                            </td>
                                            <td className={classes["td"]}>{alamat ? alamat : "-"}</td>
                                        </tr>
                                        <tr>
                                            <td className={classes["td"]}>
                                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                    <p>Asal Sekolah</p>
                                                    <p>: </p>
                                                </div>
                                            </td>
                                            <td className={classes["td"]}>{asalSekolah ? asalSekolah : "-"}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <Divider orientation='horizontal' size={"lg"} className={classes[`${smk ? "divider-smk" : "divider-smp"}`]}/>

                        <div className={classes["detail-pendaftaran"]}>
                            <table className="table">
                                <tbody>
                                    <tr>
                                        <td className={classes["td"]}>
                                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                <p>Jalur</p>
                                                <p>: </p>
                                            </div>
                                        </td>
                                        <td className={classes["td"]}>{namaJalur ? namaJalur : "-"}</td>
                                    </tr>
                                    {
                                        pilihanJalur1 && <tr>
                                            <td className={classes["td"]}>
                                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                    <p>Pilihan Jurusan 1</p>
                                                    <p>: </p>
                                                </div>
                                            </td>
                                            <td className={classes["td"]}>{pilihanJalur1 ? pilihanJalur1 : "-"}</td>
                                        </tr>
                                    }
                                    {
                                        pilihanJalur2 && <tr>
                                            <td className={classes["td"]}>
                                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                    <p>Pilihan Jurusan 2</p>
                                                    <p>: </p>
                                                </div>
                                            </td>
                                            <td className={classes["td"]}>{pilihanJalur2 ? pilihanJalur2 : "-"}</td>
                                        </tr>
                                    }
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
    const [profileImg, setProfileImg] = useState<File[] | null>(null)

    const {
        data: user,
    } = useQuery({
        queryFn: jwtDecode,
        queryKey: ["session-print"],
    });

    const img = user?.data?.student?.profile_picture
    const grade = user?.data?.student?.grade

    const setValue = useCallback(async () => {
        try {
            const data = await convertToFileObject(img as string)
            setProfileImg(data)
        } catch (error) {
            toast.error("Gagal mmengambil foto profil")
        }
    }, [img])

    useEffect((() => {
        if (img !== null && img !== undefined) {
            setValue()
        }
    }), [img, setValue])

    const majors = {
        TJKT: "Teknik Jaringan Komputer dan Telekomunikasi",
        TKR: "Teknik Otomotif",
        TAV: "Teknik Elektronika",
        AKL: "Akuntansi dan Keuangan Lembaga"
    }

    function displaySelectedMajors(major: string) {
        const selectedMajors = major.split(',');
        let result = [] as string[]

        for (let i = 0; i < selectedMajors.length; i++) {
            const code = selectedMajors[i].trim();
            const optionNumber = i + 1;
            const selectedMajorName = majors[code];

            // result += `Pilihan jurusan ${optionNumber}: "${selectedMajorName}"\n`;
            result.push(selectedMajorName)
        }

        return result;
    }

    const resMajor = user?.data?.student?.major && displaySelectedMajors(user.data.student.major)

    const handlePrint = useReactToPrint({
        onPrintError: () => {
            toast.error("Terjadi kesalahan")
        },
        content: () => componentRef.current,
        removeAfterPrint: true,
        copyStyles: true,
        print: async (printIframe: HTMLIFrameElement) => {
            const document = printIframe.contentDocument;
            if (document) {
                const html = document.getElementsByTagName("html")[0];
                try {
                    const exporter = new html2pdf(html, { filename: `PDF_SISWA_.pdf` })
                } catch (error) {
                    toast.error("Terjadi kesalahan")
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
                    grade={grade}
                    ref={componentRef}
                    akhirTahun="2025"
                    fotoProfile={profileImg}
                    alamat={user?.data?.student?.address}
                    asalSekolah={user?.data?.student?.school_origin}
                    awalTahun={"2024"}
                    namaJalur={user?.data?.student?.pathName}
                    name={user?.data?.student?.name}
                    noTelepon={user?.data?.student?.phone}
                    nomorPeserta={user?.data?.student?.formulirId}
                    pilihanJalur1={resMajor?.length > 0 ? resMajor[0] : ""}
                    pilihanJalur2={resMajor?.length > 0 ? resMajor[1] : ""}
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
                            grade={grade}
                            fotoProfile={profileImg}
                            akhirTahun="2025"
                            alamat={user?.data?.student?.address}
                            asalSekolah={user?.data?.student?.school_origin}
                            awalTahun={"2024"}
                            namaJalur={user?.data?.student?.pathName}
                            name={user?.data?.student?.name}
                            noTelepon={user?.data?.student?.phone}
                            nomorPeserta={user?.data?.student?.formulirId}
                            pilihanJalur1={resMajor?.length > 0 ? resMajor[0] : ""}
                            pilihanJalur2={resMajor?.length > 0 ? resMajor[1] : ""}
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