import {
    Divider,
    Styles,
    TextInputStylesNames,
    Grid,
    Group,
    Paper,
    Stack,
    Text,
    TextInput,
    Textarea,
    ThemeIcon
} from "@mantine/core";
import { BsFileEarmarkImage } from "react-icons/bs";
import { DarkTheme } from '../../../../utils/darkTheme';
import { UseQueryResult } from "@tanstack/react-query";
import { ResponseType } from "../../../../types/global";
import { TStudentDetail } from "../../../../apis/student/getStudent";

type TBiodataAdmin = {
    studentQuery: UseQueryResult<ResponseType<TStudentDetail>, Error>
}

const BiodataAdmin: React.FC<TBiodataAdmin> = ({ studentQuery }) => {
    const dark = DarkTheme()

    const {
        data: student,
        isLoading,
        isFetching,
        isError,
        error
    } = studentQuery

    const stylesInput: Styles<TextInputStylesNames, Record<string, any>> = {
        input: { ":readOnly": { opacity: 1 } },
        label: { userSelect: "none", fontWeight: "bold" },
    }

    console.log(student?.data)

    return (
        <>
            {/* IDENTITAS DIRI */}
            <Paper mt={40} withBorder shadow='lg' p={"lg"} sx={theme => ({ backgroundColor: dark ? theme.colors.dark[9] : "white" })}>
                <Group>
                    <Divider orientation='vertical' size={"0.5rem"} color='#2A166F' />
                    <Text weight={"bold"} size={30}>Identitas Diri</Text>
                </Group>
                <Grid gutter={"lg"} mt={20}>

                    <Grid.Col md={6}>
                        <TextInput
                            size="sm"
                            readOnly
                            label="NISN"
                            value={student?.data.nisn ? student?.data.nisn : ""}
                            styles={stylesInput}
                        />

                    </Grid.Col>


                    <Grid.Col md={6}>
                        <TextInput
                            size="sm"
                            readOnly
                            label="Nomor Whatsapp"
                            value={student?.data.phone ? student?.data.phone : ""}
                            styles={stylesInput}
                        />

                    </Grid.Col>

                    <Grid.Col md={6}>
                        <TextInput
                            size="sm"
                            readOnly
                            label="Nama Lengkap"
                            value={student?.data.name ? student?.data.name : ""}
                            styles={stylesInput}
                        />

                    </Grid.Col>


                    <Grid.Col md={6}>
                        <TextInput
                            size="sm"
                            readOnly
                            label="Nama Panggilan"
                            value={student?.data.surname ? student?.data.surname : ""}
                            styles={stylesInput}
                        />

                    </Grid.Col>

                    <Grid.Col md={6}>
                        <TextInput
                            size="sm"
                            readOnly
                            label="Gender"
                            value={student?.data.gender ? student?.data.gender : ""}
                            styles={stylesInput}
                        />

                    </Grid.Col>

                    <Grid.Col md={6}>
                        <TextInput
                            size="sm"
                            readOnly
                            label="Agama"
                            value={student?.data.religion ? student?.data.religion : ""}
                            styles={stylesInput}
                        />

                    </Grid.Col>

                    <Grid.Col md={6}>
                        <TextInput
                            size="sm"
                            readOnly
                            label="Tempat Lahir"
                            // @ts-ignore
                            value={student?.data?.birth_place}
                            // value={student?.data.} ? student?.data.}:""
                            styles={stylesInput}
                        />

                    </Grid.Col>

                    <Grid.Col md={6} >
                        <TextInput
                            size="sm"
                            readOnly
                            label="Tanggal Lahir"
                            // @ts-ignore
                            value={student?.data.phone ? new Date(student?.data?.birth_date).toLocaleDateString() : ""}
                            styles={stylesInput}
                        />

                    </Grid.Col>

                    <Grid.Col span={12} >
                        <Textarea
                            autosize
                            size="sm"
                            readOnly
                            label="Alamat"
                            value={student?.data.address ? student?.data.address : ""}
                            styles={stylesInput}
                        />

                    </Grid.Col>

                    <Grid.Col span={6} >
                        <TextInput
                            size="sm"
                            readOnly
                            label="Provinsi"
                            value={student?.data.province ? student?.data.province : ""}
                            styles={stylesInput}
                        />

                    </Grid.Col>

                    <Grid.Col span={6} >
                        <TextInput
                            size="sm"
                            readOnly
                            label="Kabupaten/Kota"
                            value={student?.data.city ? student?.data.city : ""}
                            styles={stylesInput}
                        />

                    </Grid.Col>

                    <Grid.Col span={6} >
                        <TextInput
                            size="sm"
                            readOnly
                            label="Kecamatan"
                            value={student?.data.sub_district ? student?.data.sub_district : ""}
                            styles={stylesInput}
                        />

                    </Grid.Col>

                    <Grid.Col span={6} >
                        <TextInput
                            size="sm"
                            readOnly
                            label="Kelurahan"
                            value={student?.data.district ? student?.data.district : ""}
                            styles={stylesInput}
                        />

                    </Grid.Col>

                    <Grid.Col span={6} >
                        <TextInput
                            size="sm"
                            readOnly
                            label="Kodepos"
                            value={student?.data.postal_code ? student?.data.postal_code : ""}
                            styles={stylesInput}
                        />

                    </Grid.Col>

                    <Grid.Col span={6} >
                        <TextInput
                            size="sm"
                            readOnly
                            label="Asal Sekolah"
                            value={student?.data.school_origin ? student?.data.school_origin : ""}
                            styles={stylesInput}
                        />

                    </Grid.Col>

                </Grid>
            </Paper>


            {/* INFORMASI ORANG TUA */}
            <Paper mt={40} withBorder shadow='lg' p={"lg"} sx={theme => ({ backgroundColor: dark ? theme.colors.dark[9] : "white" })}>
                <Group >
                    <Divider orientation='vertical' size={"0.5rem"} color='#2A166F' />
                    <Text weight={"bold"} size={30}>Informasi Orang Tua</Text>
                </Group>
                <Grid gutter={"lg"} mt={20}>

                    <Grid.Col sm={6}>
                        <TextInput
                            size="sm"
                            readOnly
                            label="Nama Ayah"
                            value={student?.data.dad_name ? student?.data.dad_name : ""}
                            styles={stylesInput}
                        />

                    </Grid.Col>

                    <Grid.Col sm={6}>
                        <TextInput
                            size="sm"
                            readOnly
                            label="Nama Ibu"
                            value={student?.data.mother_name ? student?.data.mother_name : ""}
                            styles={stylesInput}
                        />

                    </Grid.Col>

                    <Grid.Col sm={6}>
                        <TextInput
                            size="sm"
                            readOnly
                            label="Pekerjaan Ayah"
                            value={student?.data.dad_job ? student?.data.dad_job : ""}
                            styles={stylesInput}
                        />

                    </Grid.Col>

                    <Grid.Col sm={6}>
                        <TextInput
                            size="sm"
                            readOnly
                            label="Pekerjaan Ibu"
                            value={student?.data.mother_job ? student?.data.mother_job : ""}
                            styles={stylesInput}
                        />

                    </Grid.Col>

                    <Grid.Col sm={6}>
                        <TextInput
                            size="sm"
                            readOnly
                            label="No Telp Ayah"
                            value={student?.data.dad_phone ? student?.data.dad_phone : ""}
                            styles={stylesInput}
                        />

                    </Grid.Col>

                    <Grid.Col sm={6}>
                        <TextInput
                            size="sm"
                            readOnly
                            label="No Telp Ibu"
                            value={student?.data.mother_phone ? student?.data.mother_phone : ""}
                            styles={stylesInput}
                        />

                    </Grid.Col>

                    <Grid.Col sm={6}>
                        <Textarea
                            autosize
                            size="sm"
                            readOnly
                            label="Alamat Ayah"
                            value={student?.data.dad_address ? student?.data.dad_address : ""}
                            styles={stylesInput}
                        />

                    </Grid.Col>

                    <Grid.Col sm={6}>
                        <Textarea
                            autosize
                            size="sm"
                            readOnly
                            label="Alamat Ibu"
                            value={student?.data.mother_address ? student?.data.mother_address : ""}
                            styles={stylesInput}
                        />

                    </Grid.Col>

                    <Grid.Col span={12}>
                        <Text weight={"bold"} size={18}>Lampiran Kartu Keluarga</Text>
                        <Group
                            // p={"xs"}
                            py={"xs"}
                            px={"lg"}
                            bg={dark ? "black" : "#E3E5FC"}
                            className="rounded-md cursor-pointer"
                        // onClick={() => openModalBuktiPembayaran()}
                        >
                            <ThemeIcon radius={"100%"} color="#2A166F" size={45}>
                                <BsFileEarmarkImage size={25} />
                            </ThemeIcon>
                            <Text size={20} weight={"bold"}>File Kartu Keluarga</Text>
                        </Group>
                    </Grid.Col>

                    <Grid.Col span={12}>
                        <Text weight={"bold"} size={18}>Lampiran Akta</Text>
                        <Group
                            // p={"md"}
                            py={"xs"}
                            px={"lg"}
                            bg={dark ? "black" : "#E3E5FC"}
                            className="rounded-md cursor-pointer"
                        // onClick={() => openModalBuktiPembayaran()}
                        >
                            <ThemeIcon radius={"100%"} color="#2A166F" size={45}>
                                <BsFileEarmarkImage size={25} />
                            </ThemeIcon>
                            <Text size={20} weight={"bold"}>File Akta</Text>
                        </Group>
                    </Grid.Col>
                </Grid>
            </Paper>
        </>
    )
}

export default BiodataAdmin