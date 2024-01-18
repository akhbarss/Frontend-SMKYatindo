import { modals } from "@mantine/modals";
import { convertToFileObject } from "./imageUtils";
import { ActionIcon, Box, Image, ScrollArea, Text } from "@mantine/core";
import { MdClose } from "react-icons/md";

export const openModalImage = async (imageName: string) => {
    const img = imageName && await convertToFileObject(
        imageName
    )
    modals.open({
        children: (
            <>
                <Box component={ScrollArea.Autosize} className='overflow-auto'>
                    <Box className='z-50 fixed top-0 right-0 left-0' p={10}>
                        <ActionIcon
                            ml={"auto"}
                            variant='light'
                            onClick={() => {
                                modals.closeAll()
                            }}
                        >
                            <MdClose size={30} />
                        </ActionIcon>
                    </Box>
                    {
                        img?.length > 0 ? img.map((file, index) => {
                            const imageUrl = URL.createObjectURL(file);
                            return (
                                <Image
                                    key={index}
                                    src={imageUrl}
                                    imageProps={{
                                        onLoad: () => URL.revokeObjectURL(imageUrl),
                                    }}
                                />
                            );
                        }) : (
                            <Box
                                mt={20}
                                p={100}
                                sx={{
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}
                            >
                                <Text align="center" fw={"bolder"} fz={24}>Data kosong</Text>
                            </Box>
                        )
                    }
                </Box>
            </>
        ),
        size: "100rem",
        styles: {
            body: {
                padding: 0
            },
            header: { display: "none" }
        },
        centered: true
    })
}