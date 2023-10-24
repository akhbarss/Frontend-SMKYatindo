import { TextInput, Stack, Button, Group } from "@mantine/core";
import { modals } from "@mantine/modals";
import { UseMutationResult } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { RegistrationPayload, Response } from "../../apis/registration";
import { ResponseType } from "../../types/global";

type TRegisterInformasiKredensial = {
  noWhatsapp: string;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: () => void;
  registrationMutation: UseMutationResult<
    ResponseType<Response>,
    Error,
    RegistrationPayload,
    unknown
  >;
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
        <TextInput
          label="Password"
          withAsterisk
          required
          type="password"
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
          {/* <Button onClick={() => console.log(noWhatsapp)}>Get Whatsapp</Button> */}
        </Group>
      </Stack>
    </form>
  );
};

export default RegisterInformasiKredensial;
