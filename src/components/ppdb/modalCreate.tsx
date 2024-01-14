import { Box, Button, Group, Modal } from "@mantine/core";
import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { DarkTheme } from "../../utils/darkTheme";

const ModalCreate = ({
  opened,
  close,
  title,
  body,
}: {
  opened: boolean;
  close: () => void;
  title?: string;
  body: React.ReactNode;
}) => {
  const dark = DarkTheme();

  return (
    <Modal.Root
      opened={opened}
      onClose={close}
      radius={"md"}
      style={{ width: "10rem" }}
      size={"70rem"}
      id="modal-alur"
      centered
      styles={{}}
    >
      <Modal.Overlay />
      <Modal.Content sx={{ listStyleType: "revert" }}>
        <Modal.Header
          style={{
            // backgroundColor: "#3B82F6",
            height: "80px",
          }}
        >
          <Modal.Title className="font-bold text-2xl text-white ml-4">
            {title}
          </Modal.Title>
          <Modal.CloseButton
            sx={{
              ":hover": {
                background: "none",
              },
              color: "white",
              marginRight: "2rem",
            }}
          >
            <div>
              <AiOutlineClose size={30} />
            </div>
          </Modal.CloseButton>
        </Modal.Header>
        <Modal.Body
          style={{
            overflow: "hidden",
            height: "70vh",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            padding: 0,
          }}
        >
          <Box
            id="box-content"
            // className='flex-1 flex flex-col overflow-auto'
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              overflowY: "auto",
            }}
          >
            <Box
              id="content"
              // className='px-4 py-10 flex-1'
              sx={{
                padding: "40px 16px",
              }}
            >
              {body}
            </Box>
          </Box>
          <Group
            position="right"
            // className={`px-10 py-6 ${dark ? "bg-neutral-900" : "bg-neutral-100"} `}
            sx={(theme) => ({
              padding: "24px 40px",
              backgroundColor: `${
                dark ? theme.colors.dark[9] : theme.colors.gray[0]
              }`,
            })}
          >
            <Button
              variant="outline"
              onClick={() => close()}
              //  className='bg-white'
            >
              Batal
            </Button>
            <Button
              // className="bg-blue-500"
              onClick={() => close()}
            >
              Simpan
            </Button>
          </Group>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
};

export default ModalCreate;
