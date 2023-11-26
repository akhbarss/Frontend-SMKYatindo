import {
    Canvas,
    usePDF,
    Document,
    PDFDownloadLink,
    Page,
    Text,
    View,
    StyleSheet,
    PDFViewer,
    Image,
} from '@react-pdf/renderer'
import { Group, Button, Title } from "@mantine/core"
import { FaFilePdf } from "react-icons/fa6";
import { useBreakPoints } from '../../utils/UseBreakpoints';
import { Link } from 'react-router-dom';

const PdfPage = () => {
    const { md } = useBreakPoints()

    const styles = StyleSheet.create({
        page: {
            flexDirection: 'row',
            backgroundColor: 'white',
            padding: "50px",
            width: "100%"
        },
        section: {
            flexGrow: 1
        }
    });

    const document = (
        <Document title='pdf' style={{ backgroundColor: "black", objectFit: "cover" }} >
            <Page size="A4" style={styles.page} >
                <View style={styles.section}>
                    <div style={{ display: "flex" }}>

                    <Image source={"/LOGO_SMP_YATINDO.png"} style={{ width: 100,  objectFit: "fit" }} />
                    <Text>Section #1</Text>
                    </div>
                </View>
            </Page>
        </Document>
    )

    const [{ url }] = usePDF({ document });
    console.log(url)

    return (
        <>
            <Title mt={50} align='center' order={3}>Silakan download kartu formulir anda</Title>

            <Group position='center' mt={10}>
                <PDFDownloadLink document={document} fileName="somename.pdf">
                    {({ loading, error }) => {
                        if (error) {
                            return "Gagal membaca dokumen"
                        }

                        return (
                            <Button size='md' leftIcon={<FaFilePdf size={26} />} loading={loading}>{loading ? "Loading dokumen..." : "Download"}</Button>
                        )
                    }
                    }
                </PDFDownloadLink>
            </Group>

            <Group mt={20} mx={"auto"} position='center'>
                {md && (
                    <PDFViewer
                        height={md ? 1000 : 400}
                        width={"100%"}
                        showToolbar={false}
                    >
                        {document}
                    </PDFViewer>
                )}
            </Group>
        </>
    )
}

export default PdfPage