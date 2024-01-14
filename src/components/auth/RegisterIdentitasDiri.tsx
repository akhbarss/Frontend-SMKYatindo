import {
  Select,
  TextInput,
  Stack,
  Textarea,
  Button,
  Group,

} from "@mantine/core"

type TRegisterIdentitasDiri = {
  handleStepChange: (nextstep: number) => void
  active: number

  noWhatsapp: string
  setNoWhatsapp: React.Dispatch<React.SetStateAction<string>>
  namaLengkap: string
  setNamaLengkap: React.Dispatch<React.SetStateAction<string>>
  alamat: string
  setAlamat: React.Dispatch<React.SetStateAction<string>>
  jenkel: string
  setJenkel: React.Dispatch<React.SetStateAction<string>>
  asalSekolah: string
  setAsalSekolah: React.Dispatch<React.SetStateAction<string>>

}

const RegisterIdentitasDiri: React.FC<TRegisterIdentitasDiri> = ({
  handleStepChange,
  active,
  noWhatsapp,
  setNoWhatsapp,
  alamat,
  asalSekolah,
  namaLengkap,
  setAlamat,
  jenkel,
  setJenkel,
  setAsalSekolah,
  setNamaLengkap,
}) => {
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
          value={noWhatsapp}
          onChange={(e) => setNoWhatsapp(e.target.value)}
        />

        <TextInput
          label="Nama Lengkap"
          description="Harap masukan Nama Lengkap sesuai dengan akta kelahiran"
          withAsterisk
          required
          value={namaLengkap}
          onChange={(e) => setNamaLengkap(e.target.value)}

        />

        <Textarea
          label="Alamat"
          description="Harap masukan alamat rumah anda"
          withAsterisk
          required
          value={alamat}
          onChange={(e) => setAlamat(e.target.value)}
        />

        <Select
          data={["Laki-laki", "Perempuan"]}
          label="Jenis Kelamin"
          description="Harap masukan jenis kelamin anda"
          value={jenkel}
          onChange={setJenkel}
        />

        <TextInput
          label="Asal Sekolah"
          description="Masukan asal sekolah"
          withAsterisk
          required
          value={asalSekolah}
          onChange={(e) => setAsalSekolah(e.target.value)}
        />

        <Group position="center" mt="xl">
          <Button type="submit">Simpan dan lanjutkan</Button>
        </Group>

      </Stack>
    </form>
  )
}

export default RegisterIdentitasDiri