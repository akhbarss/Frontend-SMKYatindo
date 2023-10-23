import {
    Box,
    Divider,
    Stepper,
    useMantineTheme
} from "@mantine/core"
import { Element } from 'react-scroll'
import { useBreakPoints } from "../../utils/UseBreakpoints"
import { GetAllAlurPendaftaran } from "../../apis/alur/getAlur"
import TiptapOutput from "./tiptapOutput"

const AlurPendaftaran = () => {
    const { xs } = useBreakPoints()
    const theme = useMantineTheme()
    const dark = theme.colorScheme === 'dark'


    const { data: alurPendaftaran, } = GetAllAlurPendaftaran()


    return (
        <Element
            name="alur-pendaftaran"
            id="alur-pendaftaran"
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
                    style={{ display: "flex", flexDirection: "column" }}
                >
                    <div
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
                            {alurPendaftaran && alurPendaftaran.map(alur => (

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
                                        >
                                            <div
                                                style={{
                                                    width: "fit-content",
                                                    fontWeight: "bold",
                                                    color: `${dark ? "#6449da" : "#020731"}`
                                                }}

                                            >
                                                <h1 style={{ fontSize: "22px" }}>
                                                    {alur.title}
                                                </h1>
                                                <Divider size={4} color={dark ? "#6449da" : "#020731"} w={'60%'} />
                                            </div>
                                            <div
                                                style={{
                                                    marginTop: "24px",
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    gap: "25px",
                                                    lineHeight: "20px"
                                                }}

                                            >
                                                <TiptapOutput desc={alur.content} />
                                            </div>
                                        </Box>
                                    )}
                                />
                            ))}
                        </Stepper>
                    </div>
                </div>
            </Box>
        </Element>
    )
}

export default AlurPendaftaran