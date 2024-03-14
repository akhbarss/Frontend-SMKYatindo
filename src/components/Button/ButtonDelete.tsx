import { ActionIcon } from "@mantine/core";
import { BsFillTrashFill } from "react-icons/bs";

type ButtonDeleteProps = {
  onClick: () => void;
};

export const ButtonDelete = ({ onClick }: ButtonDeleteProps) => {
  return (
    <ActionIcon
      color="brand-yatindo"
      variant="filled"
      size={40}
      radius={100}
      onClick={onClick}
    >
      <BsFillTrashFill size={20} />
    </ActionIcon>
  );
};
