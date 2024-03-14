import { useDisclosure } from "@mantine/hooks";
import React, { createContext } from "react";

type ModalProviderProps = {
  children: React.ReactNode;
};

export type ModalContextProps = {
  openedCreate: boolean;
  openedEdit: boolean;
  openedDelete: boolean;
  openCreate: () => void;
  openEdit: () => void;
  openDelete: () => void;
  closeCreate: () => void;
  closeEdit: () => void;
  closeDelete: () => void;
};

const ModalContext = createContext<ModalContextProps>({
  openedCreate: false,
  openedDelete: false,
  openedEdit: false,
  openCreate: () => {},
  openDelete: () => {},
  openEdit: () => {},
  closeCreate: () => {},
  closeDelete: () => {},
  closeEdit: () => {},
});

export const ModalProvider = ({ children }: ModalProviderProps) => {
  const [openedCreate, { open: openCreate, close: closeCreate }] =
    useDisclosure(false);
  const [openedEdit, { open: openEdit, close: closeEdit }] =
    useDisclosure(false);
  const [openedDelete, { open: openDelete, close: closeDelete }] =
    useDisclosure(false);

    
  return (
    <ModalContext.Provider
      value={{
        openCreate,
        openDelete,
        openEdit,
        openedCreate,
        openedDelete,
        openedEdit,
        closeCreate,
        closeDelete,
        closeEdit,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export default ModalContext;
