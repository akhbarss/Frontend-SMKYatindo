import {
    Box,
    Button,
    Group,
    Modal,
    ScrollArea
} from '@mantine/core'
import React from 'react'

type TModalAdmin = {
    children: React.ReactNode
    opened: boolean
    onClose: () => void,
    onAccept?: {
        acceptFn?: () => void;
        titleAccept?: string
    }
    title: string
    size: string
    withFooter: boolean
    loading?: boolean
}

const ModalAdmin: React.FC<TModalAdmin> = ({
    children,
    opened,
    onClose,
    title,
    size,
    onAccept,
    withFooter,
    loading

}) => {
    return (
        <Modal.Root onClose={onClose} opened={opened} size={size} centered  closeOnClickOutside={false} closeOnEscape={false}>
            <Modal.Overlay />
            <Modal.Content sx={{ padding: 0, overflow: "hidden" }}>
                <Modal.Header
                    sx={{
                        background: "#2A166F",
                        color: "white",
                        fontSize: "25px"
                    }}
                >
                    {title}
                    {/* <Modal.CloseButton /> */}
                </Modal.Header>

                <Modal.Body sx={{ padding: 0 }} >
                    <Box
                        component={ScrollArea.Autosize}
                        sx={{
                            maxHeight: "70vh",
                        }}
                    >

                        {children}
                    </Box>
                </Modal.Body>

                {withFooter && (
                    <Group
                        position="right"
                        sx={theme => ({
                            padding: "1rem 4rem",
                            backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[9] : "whitesmoke",
                            position: "sticky",
                            bottom: 0,
                            marginTop: "2rem"
                        })}
                    >
                        <Button
                            variant="outline"
                            onClick={() => onClose()}
                            disabled={loading}
                        >
                            Batal
                        </Button>

                        <Button
                            color='brand-yatindo'
                            onClick={() => onAccept?.acceptFn()}
                            loading={loading}
                        >
                            {onAccept?.titleAccept}
                        </Button>
                    </Group>
                )}
            </Modal.Content>
        </Modal.Root>
    )
}

export default ModalAdmin