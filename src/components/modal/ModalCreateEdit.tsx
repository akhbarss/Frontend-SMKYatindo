import ModalAdmin from "./modalAdmin";

type ModalCreateEditProps = {
  children: React.ReactNode;
  opened: boolean;
  onClose: () => void;
  title: string;
  size: string;
};

const ModalCreateEdit = ({
  children,
  onClose,
  opened,
  size,
  title,
}: ModalCreateEditProps) => {
  return (
    <>
      <ModalAdmin
        opened={opened}
        onClose={onClose}
        title={title}
        size={size}
        withFooter={false}
      >
        {children}
      </ModalAdmin>
    </>
  );
};

export default ModalCreateEdit;
