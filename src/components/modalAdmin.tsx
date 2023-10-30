import {
    Group,
    Button,
    Modal,
    ScrollArea,
    Box,
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
}

const ModalAdmin: React.FC<TModalAdmin> = ({
    children,
    opened,
    onClose,
    title,
    size,
    onAccept,
    withFooter

}) => {
    return (
        <Modal.Root onClose={onClose} opened={opened} size={size} centered>
            <Modal.Overlay />
            <Modal.Content sx={{ padding: 0, overflow: "hidden" }}>
                <Modal.Header sx={{
                    background: "#2A166F",
                    color: "white",
                    fontSize: "25px"
                }}>
                    {title}
                    <Modal.CloseButton />
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
                        sx={{
                            padding: "1rem 4rem",
                            backgroundColor: "whitesmoke"
                        }}
                    >
                        <Button
                            variant="outline"
                            onClick={() => onClose()}
                        >
                            Batal
                        </Button>

                        <Button
                            onClick={() => onAccept?.acceptFn()}
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