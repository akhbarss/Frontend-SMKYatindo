import { CacheProvider } from "@emotion/react"

import {
    Box,
    Button,
    ColorScheme,
    ColorSchemeProvider,
    Divider,
    Group,
    MantineProvider,
    Stack,
    Text,
    useEmotionCache
} from "@mantine/core"
import { useHotkeys, useLocalStorage } from "@mantine/hooks"
import { ContextModalProps, ModalsProvider } from "@mantine/modals"
import { FiInfo } from "react-icons/fi"
import { CustomFonts } from "./customFonts"

const createDataModel = ({
    context,
    id,
    innerProps,
}: ContextModalProps<{ modalBody: string, ayam: string }>) => {
    console.log(context)
    console.log(innerProps.modalBody)
    console.log(id)
    console.log(innerProps.ayam)
    return (
        <>
            <Stack>

                {innerProps.modalBody}

                <Divider />
                <Group position="right">
                    <Button variant="default" onClick={() => context.closeModal(id)}>
                        Batal
                    </Button>
                    <Button onClick={() => context.closeModal(id)}>Simpan</Button>
                </Group>
            </Stack>
        </>
    )
}

const createInformasi = ({
    context,
    id,
    innerProps,
}: ContextModalProps<{
    modalBody: string,
    onAccept: () => void,
    onCancel: () => void
}>) => {

    const {
        modalBody,
        onAccept,
        onCancel
    } = innerProps

    return (
        <>
            <Stack>
                {/* <ThemeIcon size={130} variant="outline" color="cyan" sx={{ border: "none" }}> */}
                <Box sx={{ color: "#339AF0", marginInline: "auto" }}>
                    <FiInfo size={100} />
                </Box>
                {/* </ThemeIcon> */}
                <Text align="center" mt={20}>
                    {modalBody}
                </Text>

                <Divider mt={30} />
                <Group position="center">
                    <Button variant="danger" onClick={() => {
                        onCancel()
                        context.closeModal(id)
                    }}>
                        Batalkan
                    </Button>
                    <Button variant="success" onClick={() => {
                        onAccept()
                        context.closeModal(id)
                    }}>
                        Lanjutkan
                    </Button>
                </Group>
            </Stack>
        </>
    )
}




const modals = {
    createData: createDataModel,
    createInformasi
}
declare module "@mantine/modals" {
    export interface MantineModalsOverride {
        modals: typeof modals
    }
}

export default function ProviderMantine({
    children,
}: {
    children: React.ReactNode
}) {
    const cache = useEmotionCache()
    cache.compat = true

    const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
        key: "color-scheme",
        defaultValue: "light",
        getInitialValueInEffect: true,
    })

    const toggleColorScheme = (value?: ColorScheme) =>
        setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"))

    useHotkeys([["mod+J", () => toggleColorScheme()]])

    return (
        <ColorSchemeProvider
            colorScheme={colorScheme}
            toggleColorScheme={toggleColorScheme}
        >
            <CacheProvider value={cache}>
                <MantineProvider
                    withGlobalStyles
                    withNormalizeCSS

                    theme={{
                        colorScheme,
                        colors: {
                            // "brand-blue": [
                            //     "#e4f2ff",
                            //     "#bad6f8",
                            //     "#90bbef",
                            //     "#66a0e7",
                            //     "#3c85de",
                            //     "#256bc6",
                            //     "#1a539a",
                            //     "#103c6f", // main color
                            //     "#052445",
                            //     "#000d1c",
                            // ],
                            // "brand-sky-blue": [
                            //     "#e2f4ff",
                            //     "#bcdcf6",
                            //     "#93c3ea",
                            //     "#6babe0", // main color
                            //     "#4493d7",
                            //     "#2b79bd",
                            //     "#1f5e94",
                            //     "#13436b",
                            //     "#052842",
                            //     "#000e1b",
                            // ],
                            // "brand-yellow": [
                            //     "#fff7db",
                            //     "#ffe7af",
                            //     "#fcd681",
                            //     "#f9c650",
                            //     "#f8b621", // main color
                            //     "#de9c07",
                            //     "#ad7a02",
                            //     "#7c5700",
                            //     "#4b3400",
                            //     "#1d1000",
                            // ],
                            "brand-blues": [
                                "#2A166F"
                            ]
                        },
                        // primaryColor: "brand-blues",
                        // primaryShade:4,
                        fontFamily: "Ubuntu, sans-serif",
                        headings: {
                            fontFamily: "Ubuntu, sans-serif"
                        },
                        components: {
                            Button: {
                                variants: {
                                    danger: (theme) => ({
                                        root: {
                                            backgroundColor: theme.colors.red[6],
                                            color: theme.colors.red[0],
                                            ...theme.fn.hover({ backgroundColor: theme.colors.red[8] }),
                                        },
                                    }),

                                    success: (theme) => ({
                                        root: {
                                            backgroundColor: "#2A166F",
                                            color: theme.white,
                                        },
                                    }),
                                },
                            }
                        }
                    }}
                >
                    <CustomFonts />
                    <ModalsProvider
                        modals={modals}
                        modalProps={{
                            centered: true,
                            size: "lg",

                        }}
                    >
                        {children}
                    </ModalsProvider>
                </MantineProvider>
            </CacheProvider>
        </ColorSchemeProvider>
    )
}
