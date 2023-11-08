import { Box, useMantineTheme } from '@mantine/core'
import { TGRegistrationPath } from '../../types/global'
import { useBreakPoints } from '../../utils/UseBreakpoints'

const BiayaJalurPendaftaran = ({
    batch
}: {
    batch?: TGRegistrationPath
}) => {

    const { xs } = useBreakPoints()
    const theme = useMantineTheme()
    const dark = theme.colorScheme === 'dark'

    return (
        <Box
            id='biaya'
            style={{
                backgroundColor: `${dark ? theme.colors.dark[9] : "#dbe1fe"}`,
                color: `${dark ? "white" : "#0F172A"}`,
                display: "flex",
                flexDirection: "column",
                marginTop: "20px",
                padding: `${xs ? "32px" : "32px 8px"}`,
                borderRadius: "7px"
            }}
        >
            <h1
                style={{ fontSize: "22px" }}
            >
                Biaya {batch?.name}:
            </h1>
            {
                batch && batch?.additionalPrices.length > 0 ?
                batch?.additionalPrices.map(biayaJalur => (
                        <Box
                            key={biayaJalur.id}
                            style={{
                                backgroundColor: `${dark ? "black" : "white"}`,
                                color: `${dark ? "white" : "#0F172A"}`,
                                display: "flex",
                                flexDirection: "column",
                                marginTop: "20px"
                            }}
                        >
                            <div
                                id='judul-biaya'
                                style={{
                                    borderBottom: "1px solid",
                                    padding: "8px 24px",
                                    textAlign: "center"
                                }}

                            >
                                <p >{biayaJalur.namePrice}</p>
                            </div>
                            <div>
                                {biayaJalur.priceDetails.map(item => {
                                    const formatedAngka = item.price.toLocaleString("id-ID", {
                                        style: "currency",
                                        currency: "IDR",
                                    })

                                    return (
                                        <div
                                            key={item.id}
                                            style={{
                                                display: "flex",
                                                fontSize: "16px",
                                                padding: "8px 32px",
                                            }}
                                        >
                                            <span style={{ flex: 2 }}>{item.subTitle}</span>
                                            <span style={{ flex: 1 }}>{formatedAngka.endsWith(",00") ? formatedAngka.slice(0, -3) : formatedAngka}</span>
                                        </div>
                                    )
                                })}
                            </div>
                        </Box>
                    ))
                    : "-"
            }
        </Box>)
}

export default BiayaJalurPendaftaran