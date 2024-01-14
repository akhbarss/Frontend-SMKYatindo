import React from "react";
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import {
  Group,
  Image,
  rem,
  SimpleGrid,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { FaUpload } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { HiPhoto } from "react-icons/hi2";
import { DarkTheme } from "../utils/darkTheme";

interface TUploadDropzone extends DropzoneProps {
  label: string;
  value?: File[];
}

const UploadDropzone: React.FC<TUploadDropzone> = ({
  onChange,
  onReject,
  onDrop,
  accept,
  multiple,
  value,
  label,
}) => {
  const theme = useMantineTheme();
  const dark = DarkTheme()
  return (
    <Dropzone
      multiple={multiple}
      onChange={onChange}
      onReject={onReject}
      maxSize={3 * 1024 ** 2}
      accept={accept}
      onDrop={onDrop}
    >
      <Group
        position="center"
        spacing="xl"
        style={{
          minHeight: rem(220),
          pointerEvents: "none",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Dropzone.Accept>
          <FaUpload
            size="3.2rem"
            color={
              theme.colors[theme.primaryColor][
              theme.colorScheme === "dark" ? 4 : 6
              ]
            }
          />
        </Dropzone.Accept>
        <Dropzone.Reject>
          <ImCross
            size="3.2rem"
            color={theme.colors.red[theme.colorScheme === "dark" ? 4 : 6]}
          />
        </Dropzone.Reject>
        <Dropzone.Idle>
          <HiPhoto size="3.2rem" />
        </Dropzone.Idle>
        <Text sx={{ zIndex: 9, color: value && !multiple ? dark ? "transparent" : "transparent" : dark ? "white" : "black" }}>
          {label}
        </Text>

        {!multiple &&
          value &&
          value?.length > 0 &&
          value?.map((file, index) => {
            const imageUrl = URL.createObjectURL(file);
            return (
              <Image
                key={index}
                src={imageUrl}
                width={"80%"}
                sx={{
                  // width: "100px"
                  position: "absolute",
                  filter: "brightness(50%)",
                  top: 0,
                  // right: 0,
                  // left:0
                }}
                imageProps={{
                  onLoad: () => URL.revokeObjectURL(imageUrl),
                }}
              />
            );
          })}
      </Group>
      <SimpleGrid cols={4} mt={5} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
        {multiple &&
          value &&
          accept === IMAGE_MIME_TYPE &&
          value?.map((file, index) => {
            const imageUrl = URL.createObjectURL(file);
            return (
              <Image
                key={index}
                src={imageUrl}
                w={20}
                imageProps={{
                  onLoad: () => URL.revokeObjectURL(imageUrl),
                }}
              />
            );
          })}
      </SimpleGrid>
    </Dropzone>
  );
};

export default UploadDropzone;
