import { useContext } from "react";
import ModalContext, {
  ModalContextProps,
} from "../context/ModalProvider.context";

export const useModal = (): ModalContextProps => {
  return useContext(ModalContext);
};
