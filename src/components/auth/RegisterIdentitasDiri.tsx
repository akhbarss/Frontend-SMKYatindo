import {
  TextInput,
  Stack,
  Textarea,
  Button,
  Group,

} from "@mantine/core"

type TRegisterIdentitasDiri = {
  handleStepChange: (nextstep: number) => void
  active: number
}

const RegisterIdentitasDiri: React.FC<TRegisterIdentitasDiri> = ({ handleStepChange, active }) => {
  return (
    <form onSubmit={() => handleStepChange(active + 1)}>
      <Stack mt={20}>

        <TextInput
          label="Nomor Whatsapp"
          description="Harap masukan Nomor Aktif WhatsApp anda"
          withAsterisk
          type="number"
          required
          autoFocus
        />

        <TextInput
          label="Nama Lengkap"
          description="Harap masukan Nama Lengkap sesuai dengan akta kelahiran"
          withAsterisk
          required
        />

        <Textarea
          label="Alamat"
          description="Harap masukan alamat rumah anda"
          withAsterisk
          required
        />

        <TextInput
          label="Asal Sekolah"
          description="Masukan asal sekolah"
          withAsterisk
          required
        />

        <Group position="center" mt="xl">
          <Button type="submit">Simpan dan lanjutkan</Button>
        </Group>

      </Stack>
    </form>
  )
}

export default RegisterIdentitasDiri