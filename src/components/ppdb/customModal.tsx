import { Modal } from '@mantine/core'

const CustomModal = ({
    opened,
    close
}: {
    opened: boolean
    close: () => void
}) => {
    return (
        <Modal.Root
            opened={opened
            } onClose={close}
            radius={'md'}
        >
            <Modal.Overlay />
            <Modal.Content>
                <Modal.Header>
                    <Modal.Title>Modal title</Modal.Title>
                    <Modal.CloseButton />
                </Modal.Header>
                <Modal.Body >
                    Body
                </Modal.Body>
            </Modal.Content>
        </Modal.Root>

    )
}

export default CustomModal