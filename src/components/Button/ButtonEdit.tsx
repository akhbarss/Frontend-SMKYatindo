import { ActionIcon } from "@mantine/core";
import { AiFillEdit } from "react-icons/ai";

type ButtonEditProps = {
  onClick: () => void;
};

export const ButtonEdit = ({ onClick }: ButtonEditProps) => {
  return (
    <ActionIcon
      color="brand-yatindo"
      variant="filled"
      size={40}
      radius={100}
      onClick={onClick}
    >
      <AiFillEdit size={20} />
    </ActionIcon>
  );
};
