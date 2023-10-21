import {
    Box,
    Divider,
    Stepper,
    useMantineTheme
} from "@mantine/core"
import { Element } from 'react-scroll'
import { useBreakPoints } from "../../utils/UseBreakpoints"

const AlurPendaftaran = () => {
    const { xs } = useBreakPoints()
    const theme = useMantineTheme()
    const dark = theme.colorScheme === 'dark'


    return (
        <Element
            name="alur-pendaftaran"
            id="alur-pendaftaran"
            // className={`  min-h-[87vh] flex flex-col justify-center 
            // ${xs && "items-center py-[2rem] "}
            // ${dark ? "backdrop-brightness-75" : "backdrop-brightness-50"}
            // `}
            style={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: `${xs ? "center" : ""}`,
                minHeight: "87vh",
                paddingBlock: `${xs ? "2rem" : ""}`,
                backdropFilter: `${dark ? "brightness(.75)" : "brightness(.5)"}`
            }}

        >
            <Box
                // className={`   ${xs ? "w-[65%] p-[2rem] min-h-[450px] rounded-[20px]" : "flex-1  p-[1rem]"}`}
                sx={(theme => ({
                    backgroundColor: theme.colorScheme === 'dark' ? "black" : theme.colors.gray[0],
                    color: theme.colorScheme === 'dark' ? theme.colors.gray[1] : "#020731",
                    width: `${xs ? "65%" : ""}`,
                    padding: `${xs ? "2rem" : "1rem"}`,
                    minHeight: `${xs ? "450px" : ""}`,
                    borderRadius: `${xs ? "20px" : ""}`,
                    flex: `${xs ? "" : "1"}`
                }))}
            >
                <div
                    //  className="flex flex-col "
                    style={{ display: "flex", flexDirection: "column" }}
                >
                    <div
                        // className={`${dark ? "bg-[#291872] shadow-[0_0_20px_-3px_#291872]" : "bg-[#020731] "} text-white h-[20vw] max-h-[4rem] flex items-center justify-center px-[4rem] rounded-full mx-auto`}
                        style={{
                            backgroundColor: `${dark ? "#291872" : "#020731"}`,
                            boxShadow: `${dark ? "0 0 20px -3px #291872" : ""}`,
                            color: "white",
                            height: "20vw",
                            maxHeight: "4rem",
                            display: 'flex',
                            alignItems: "center",
                            justifyContent: "center",
                            paddingInline: "4rem",
                            borderRadius: "100px",
                            marginInline: "auto"
                        }}
                    >
                        <span
                            // className={`  font-bold ${xs ? "text-[2.5vw]" : "text-[5vw]"}`}
                            style={{
                                fontWeight: "bold",
                                fontSize: `${xs ? "2.5vw" : "5vw"}`
                            }}
                        >
                            Alur Pendaftaran
                        </span>
                    </div>
                    <div className="mt-10 flex">
                        <Stepper
                            active={0}
                            orientation="vertical"
                            // className="flex flex-1 w-full justify-between"
                            sx={{
                                display: "flex",
                                width: "100%",
                                justifyContent: "space-between",
                                flex: "1"
                            }}

                            styles={{
                                stepWrapper: {
                                    width: '3.5rem',
                                    height: '3.5rem',
                                },
                                stepIcon: {
                                    border: "none",
                                    backgroundColor: `${dark ? "#291872" : "#020731"}`,
                                    color: "white",
                                    borderRadius: "100%",
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    width: '100%',
                                    height: '100%',
                                    boxShadow: `5px 5px 10px -5px ${dark ? "#291872" : "black"}`
                                },
                                verticalSeparator: {
                                    borderLeft: `2px solid ${dark ? "#291872" : "#020731"}`,
                                    position: "absolute",
                                    top: "calc(3.5rem + calc(2rem / 2))",
                                    left: "calc(3.5rem / 2)"
                                },
                                steps: {
                                    flex: 1,
                                },
                                step: {
                                    display: 'flex',
                                    width: '100%',
                                    gap: xs ? '2rem' : "",
                                },
                                stepBody: {
                                    flex: 1,
                                },
                                stepDescription: {
                                    margin: 0
                                },
                            }}
                        >
                            <Stepper.Step
                                mb={10}
                                description={(
                                    <Box
                                        style={{
                                            backgroundColor: `${dark ? theme.colors.dark[9] : "#dbe1fe"}`,
                                            color: `${dark ? "white" : "black"}`,
                                            borderRadius: "12px",
                                            padding: `${xs ? "1rem" : "0.5rem"}`
                                        }}
                                    // className={`  rounded-xl ${xs ? "p-[1rem]" : "p-[0.5rem]"}`}
                                    >
                                        <div
                                            // className={`title w-fit font-bold  ${dark ? "text-[#6449da]" : "text-[#020731]"}`}
                                            style={{
                                                width: "fit-content",
                                                fontWeight: "bold",
                                                color: `${dark ? "#6449da" : "#020731"}`
                                            }}

                                        >
                                            <h1 style={{ fontSize: "22px" }}>
                                                PEMBELIAN FORMULIR
                                            </h1>
                                            <Divider size={4} color={dark ? "#6449da" : "#020731"} w={'60%'} />
                                        </div>
                                        <div
                                            //  className="mt-6 flex flex-col gap-5 leading-5"
                                            style={{
                                                marginTop: "24px",
                                                display: "flex",
                                                flexDirection: "column",
                                                gap: "25px",
                                                lineHeight: "20px"
                                            }}

                                        >
                                            <p >1. calon siswa baru mengakses laman PPDB online</p>
                                            <p >2. Klik daftar / masuk</p>
                                            <p >3. Pilih gelombang PPDB</p>
                                            <p >4. Lakukan pembelian formulir pendaftaran dan unggah bukti pembayaran</p>
                                            <p >5. Pilih jurusan</p>
                                            <p >6. Cetak kartu peserta</p>
                                            <p >7. WA ADMIN 081380908008</p>
                                        </div>
                                    </Box>
                                )}
                            />
                            <Stepper.Step
                                description={(
                                    <Box
                                        style={{
                                            backgroundColor: `${dark ? theme.colors.dark[9] : "#dbe1fe"}`,
                                            color: `${dark ? "white" : "black"}`,
                                            borderRadius: "12px",
                                            padding: `${xs ? "1rem" : "0.5rem"}`
                                        }}
                                    // className={`  rounded-xl ${xs ? "p-[1rem]" : "p-[0.5rem]"}`}
                                    >
                                        <div
                                            // className={`title w-fit font-bold  ${dark ? "text-[#6449da]" : "text-[#020731]"}`}
                                            style={{
                                                width: "fit-content",
                                                fontWeight: "bold",
                                                color: `${dark ? "#6449da" : "#020731"}`
                                            }}
                                        >
                                            <h1 style={{ fontSize: "22px" }}>
                                                PENGEMBALIAN FORMULIR
                                            </h1>
                                            <Divider size={4} color={dark ? "#6449da" : "#020731"} w={'60%'} />
                                        </div>
                                        <div
                                            // className="mt-6 flex flex-col gap-5 leading-5"
                                            style={{
                                                marginTop: "24px",
                                                display: "flex",
                                                flexDirection: "column",
                                                gap: "25px",
                                                lineHeight: "20px"
                                            }}
                                        >
                                            <p >1. Klik Pengembalian</p>
                                            <p >2. Bayar dana masuk dan unggah bukti pembayaran</p>
                                            <p >3. Isi biodata</p>
                                            <p >4. Isi nilai rapot semester 1 s.d semester 6</p>
                                            <p >5. Isi data prestasi</p>
                                            <p >6. Pilih jurusan</p>
                                            <p >7. Cetak kartu peserta</p>
                                            <p >8. WA ADMIN 081380908008</p>
                                        </div>
                                    </Box>
                                )}
                            />
                        </Stepper>
                    </div>
                </div>
            </Box>
        </Element>
    )
}

export default AlurPendaftaran