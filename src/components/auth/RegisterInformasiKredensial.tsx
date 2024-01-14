import { Button, Group, Stack, TextInput, PasswordInput } from "@mantine/core";
import { UseMutationResult } from "@tanstack/react-query";
import { RegistrationPayload, RegistrationResponse } from "../../apis/registration";
import { ResponseType } from "../../types/global";

type TRegisterInformasiKredensial = {
  noWhatsapp: string;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: () => void;
  registrationMutation: UseMutationResult<ResponseType<ResponseType<RegistrationResponse>>, Error, RegistrationPayload, unknown>
};

const RegisterInformasiKredensial: React.FC<TRegisterInformasiKredensial> = ({
  noWhatsapp,
  password,
  setPassword,
  onSubmit,
  registrationMutation,
}) => {
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onSubmit();
  };

  return (
    <form onSubmit={submitHandler}>
      <Stack mt={20}>
        <PasswordInput
          label="Password"
          withAsterisk
          required
          autoFocus
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Group position="center" mt="xl">
          <Button
            loading={registrationMutation.status === "pending"}
            type="submit"
          >
            Simpan dan lanjutkan
          </Button>
        </Group>
      </Stack>
    </form>
  );
};

export default RegisterInformasiKredensial;
