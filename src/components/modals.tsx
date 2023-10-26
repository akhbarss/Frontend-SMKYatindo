import { Box, Button, Divider, Group, Stack, Text } from "@mantine/core";
import { ContextModalProps } from "@mantine/modals";
import { FiInfo } from "react-icons/fi";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

export const createDataModel = ({
  context,
  id,
  innerProps,
}: ContextModalProps<{ modalBody: string; ayam: string }>) => {
  return (
    <>
      <Stack>
        {innerProps.modalBody}

        <Divider />
        <Group position="right">
          <Button variant="default" onClick={() => context.closeModal(id)}>
            Batal
          </Button>
          <Button onClick={() => context.closeModal(id)}>Simpan</Button>
        </Group>
      </Stack>
    </>
  );
};

export const createModalSuccess = ({
  context,
  id,
  innerProps,
}: ContextModalProps<{
  modalBody: string;
  onAccept: () => void;
  onCancel: () => void;
}>) => {
  const { onAccept, modalBody } = innerProps;

  return (
    <>
      <Stack>
        <Box sx={{ color: "#339AF0", marginInline: "auto" }}>
          <IoMdCheckmarkCircleOutline size={100} color="#33FF00" />
        </Box>

        <Text align="center" mt={20}>
          {modalBody}
        </Text>

        <Divider mt={30} />
        <Group position="center">
          <Button
            variant="success"
            onClick={() => {
              onAccept();
              context.closeModal(id);
            }}
          >
            Lanjutkan
          </Button>
        </Group>
      </Stack>
    </>
  );
};

export const createInformasi = ({
  context,
  id,
  innerProps,
}: ContextModalProps<{
  modalBody: string;
  onAccept: () => void;
  onCancel: () => void;
}>) => {
  const { modalBody, onAccept, onCancel } = innerProps;

  return (
    <>
      <Stack>
        {/* <ThemeIcon size={130} variant="outline" color="cyan" sx={{ border: "none" }}> */}
        <Box sx={{ color: "#339AF0", marginInline: "auto" }}>
          <FiInfo size={100} />
        </Box>
        {/* </ThemeIcon> */}
        <Text align="center" mt={20}>
          {modalBody}
        </Text>

        <Divider mt={30} />
        <Group position="center">
          <Button
            variant="danger"
            onClick={() => {
              onCancel();
              context.closeModal(id);
            }}
          >
            Batalkan
          </Button>
          <Button
            variant="success"
            onClick={() => {
              onAccept();
              context.closeModal(id);
            }}
          >
            Lanjutkan
          </Button>
        </Group>
      </Stack>
    </>
  );
};

export const modalAlurAdmin = ({
  context,
  id,
  innerProps,
}: ContextModalProps<{
  modalBody: string;
  onAccept: () => void;
  onCancel: () => void;
}>) => {
  const { modalBody, onAccept, onCancel } = innerProps;

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onAccept();
  };

  return (
    <>
      <form
        onSubmit={submitHandler}
        className="overflow-y-auto flex-[1] flex flex-col"
      >
        <Box
          id="box-content"
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            overflowY: "auto",
          }}
        >
          <Box
            id="content"
            sx={{
              paddingInline: "16px",
              paddingBlock: "50px",
            }}
          >
            {modalBody}
          </Box>
        </Box>
        <Group
          position="right"
          sx={(theme) => ({
            padding: "24px 40px",
            backgroundColor: `${
              theme.colorScheme === "dark"
                ? theme.colors.dark[9]
                : theme.colors.gray[0]
            }`,
          })}
        >
          <Button
            variant="outline"
            onClick={() => {
              onCancel();
              context.closeModal(id);
            }}
          >
            Batal
          </Button>
          <Button
            type="submit"
            // onClick={() => {
            //     onAccept()
            //     context.closeModal(id)
            // }}
          >
            Simpan
          </Button>
        </Group>
      </form>
    </>
  );
};
