import {
    ActionIcon,
    Box,
    Button,
    Group,
    Stack,
    Text,
    TextInput
} from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { randomId } from '@mantine/hooks';
import React from 'react';
import { FaTrash } from 'react-icons/fa';
import { NumericFormat } from 'react-number-format';
import ModalAdmin from '../modalAdmin';

export type FormEditBiayaTambahan = {
    id: number
    namePrice: string,
    priceDetails: {
        subTitle: string;
        price: string;
    }[]
}

type TModalBiayaTambahanEdit = {
    opened: boolean;
    close: () => void;
    titleModal: string;
    editBiayaTambahanHandler: (data: FormEditBiayaTambahan) => void;
    loading?: boolean
    form: UseFormReturnType<{
        id: number;
        judulBiaya: string;
        priceDetails: {
            name: string;
            biaya: string;
            key: string;
        }[];
    }, (values: {
        id: number;
        judulBiaya: string;
        priceDetails: {
            name: string;
            biaya: string;
            key: string;
        }[];
    }) => {
        id: number;
        judulBiaya: string;
        priceDetails: {
            name: string;
            biaya: string;
            key: string;
        }[];
    }>
}

const ModalBiayaTambahanEdit: React.FC<TModalBiayaTambahanEdit> = ({
    opened,
    close,
    titleModal,
    editBiayaTambahanHandler,
    form,
    loading
}) => {

    const fields = form?.values?.priceDetails?.map((item, index) => (
        <Box key={item.key} >
            <Text weight={"bold"} sx={{ flex: 1 }}>
                Nama {index + 1}
            </Text>

            <Group mt="xs">
                <TextInput
                    placeholder={`Gelombang ${index + 1}`}
                    required
                    withAsterisk
                    sx={{ flex: 1 }}
                    {...form?.getInputProps(`priceDetails.${index}.name`)}
                />

                {
                    index > 0 && (
                        <ActionIcon color="red" variant='filled' size={30} onClick={() => form?.removeListItem('priceDetails', index)}>
                            <FaTrash size="1rem" />
                        </ActionIcon>
                    )
                }
            </Group>

            <Text weight={"bold"} sx={{ flex: 1 }} mt={"xs"}>
                Biaya {index + 1}
            </Text>

            <NumericFormat
                mt={"xs"}
                thousandSeparator="."
                required
                decimalSeparator=","
                prefix="Rp. "
                customInput={TextInput}
                placeholder="Rp. 0"
                sx={{ flex: 1 }}
                withAsterisk
                {...form?.getInputProps(`priceDetails.${index}.biaya`)}
            />
        </Box>
    ));

    function onSubmit(values: {
        id: number;
        judulBiaya: string;
        priceDetails: {
            name: string;
            biaya: string;
            key: string;
        }[];
    }) {
        const { priceDetails, judulBiaya, id } = values

        const withoutKey = priceDetails.map(item => ({
            subTitle: item.name,
            price: item.biaya?.substring(4).replace(/\./g, '')
        }))

        editBiayaTambahanHandler({
            id,
            namePrice: judulBiaya,
            priceDetails: withoutKey,
        })
    }

    return (
        <ModalAdmin
            size='50rem'
            onClose={close}
            opened={opened}
            title={titleModal}
            withFooter={false}
        >
            <form onSubmit={form?.onSubmit(val => onSubmit(val))}>

                <Stack p={20} pb={"6rem"} sx={{ minHeight: "50vh" }} spacing={"2rem"}>
                    <Box>

                        <Text align="left" weight={"bold"} >Judul Biaya</Text>

                        <TextInput mt={"xs"} required {...form?.getInputProps("judulBiaya")} />
                    </Box>

                    {fields && fields}

                    <Group position="center" mt="md">
                        <Button
                            onClick={() =>
                                form?.insertListItem('priceDetails', { name: '', biaya: "", key: randomId() })
                            }
                        >
                            Tambah Biaya
                        </Button>
                    </Group>
                </Stack>

                <Group
                    position="right"
                    sx={theme => ({
                        position: "absolute",
                        bottom: 0,
                        right: 0,
                        left: 0,
                        padding: "1rem 4rem",
                        backgroundColor: theme.colorScheme === 'dark' ? "black" : "whitesmoke",
                        zIndex: 1
                    })}
                >
                    <Button
                        variant="outline"
                        onClick={() => {
                            close()
                        }}
                        disabled={loading}
                    >
                        Batal
                    </Button>

                    <Button type='submit' loading={loading}>
                        Ubah
                    </Button>
                </Group>
            </form>
        </ModalAdmin>
    )
}

export default ModalBiayaTambahanEdit