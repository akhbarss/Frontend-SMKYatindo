import { useContext } from "react";
import AlurContext, { AlurContextProps } from "../context/AlurProvider.context";

export const useAlur = (): AlurContextProps => {
  return useContext(AlurContext);
};
