import { Box, Select, Stack, Text, TextInput } from "@mantine/core";
import { useAlurFormContext } from "../../context/form-context";
import TiptapInput from "../Fields/FieldTiptapInput";

const FormAlur = () => {
  const form = useAlurFormContext();
  const { errors } = form;
  return (
    <Stack p={20} pb={"6rem"}>
      <Box>
        <Text align="left" weight={"bold"}>
          Nama
        </Text>
        <TextInput data-autofocus {...form.getInputProps("title")} />
      </Box>

      <Box>
        <Text align="left" weight={"bold"}>
          Jenjang
        </Text>
        <Select
          data={["SMP", "SMK"]}
          value={form.values.grade}
          onChange={(val) => form.setFieldValue("grade", val as "SMP" | "SMK")}
        />
      </Box>

      <Box>
        <Text align="left" weight={"bold"}>
          Deskripsi Keterangan
        </Text>
        <TiptapInput
          value={form.values.desc}
          onChange={(e) => form.setFieldValue("desc", e)}
          error={errors?.desc && errors.desc as string}
        />
      </Box>
    </Stack>
  );
};

export default FormAlur;
