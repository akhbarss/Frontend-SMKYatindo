import {
    Modal,
    ScrollArea
} from '@mantine/core'
import React from 'react'

type TModalAdmin = {
    children: React.ReactNode
    opened: boolean
    onClose: () => void
    title: string
    size: string
}

const ModalAdmin: React.FC<TModalAdmin> = ({
    children,
    opened,
    onClose,
    title,
    size

}) => {
    return (
        <Modal
            centered
            size={size}
            onClose={onClose}
            opened={opened}
            title={title}
            styles={{
                header: {
                    background: "#2A166F",
                    overflowY: "auto"
                },
                title: {
                    color: "white",
                    fontSize: "25px",
                },
            }}
            scrollAreaComponent={ScrollArea.Autosize}
        >
            {children}
        </Modal>
    )
}

export default ModalAdmin