import { Button, Group, Modal, Stack, Text, Title } from "@mantine/core";
import { useModal } from "../../hooks";

type ModalDeleteProps = {
    onClose: () => void;
    onAccept: () => void;
    loading: boolean;
    description: string;
    title: string
}

const ModalDelete = ({
    onAccept,
    onClose,
    loading,
    description,
    title,
}: ModalDeleteProps) => {
    const {openedDelete} = useModal()
    
  return (
    <>
    <Modal
        centered
        closeOnEscape={false}
        closeOnClickOutside={false}
        withCloseButton={false}
        opened={openedDelete}
        onClose={onClose}
      >
        <Stack>
          <Title order={3}>{title}</Title>
          <Text>
            {description}
          </Text>
        </Stack>
        <Group mt={20} position="right">
          <Button
            disabled={loading}
            variant="outline"
            onClick={() => {
              onClose()
            }}
          >
            Batal
          </Button>
          <Button
            variant="danger"
            onClick={() => onAccept()}
            loading={loading}
          >
            Hapus
          </Button>
        </Group>
      </Modal>
    </>
  )
}

export default ModalDelete