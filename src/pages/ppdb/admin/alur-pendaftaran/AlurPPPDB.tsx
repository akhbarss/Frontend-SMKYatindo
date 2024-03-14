import { Button, Stack } from "@mantine/core";
import FooterModal from "../../../../components/FooterModal";
import FormAlur from "../../../../components/Form/FormAlur";
import ListAlur from "../../../../components/List/ListAlur";
import ModalCreateEdit from "../../../../components/Modal/ModalCreateEdit";
import ModalDelete from "../../../../components/Modal/ModalDelete";
import Page from "../../../../components/Page";
import PageLabel from "../../../../components/PageLabel";
import {
  AlurFormValues,
  useAlurFormContext,
} from "../../../../context/form-context";
import { useAlur, useAlurAction, useModal } from "../../../../hooks";

const AlurPPPDB = () => {
  const {
    openCreate,
    openedCreate,
    closeCreate,
    closeEdit,
    openedEdit,
    closeDelete,
  } = useModal();

  const size = "50rem";
  const formAlur = useAlurFormContext();
  const { alurBySmk, alurBySmp, loadingActionAlur } = useAlur();
  const { submitCreateAlur, submitEditAlur, submitDeleteAlur } =
    useAlurAction();

  const createAlurHandler = (data: AlurFormValues) => {
    const { desc, grade, title } = data;
    submitCreateAlur({ content: desc, grade, title });
  };

  const editAlurHandler = (data: AlurFormValues) => {
    const { desc, grade, title, id } = data;
    submitEditAlur({ content: desc, grade, title, id });
  };

  return (
    <Page title={"Alur Pendaftaran"}>
      <PageLabel label={"Alur Pendaftaran"} />
      <Stack
        mt={40}
        spacing={"2rem"}
        className={"style-box max-w-[70rem] mx-auto"}
      >
        <Button onClick={openCreate}>Tambah</Button>

        <ListAlur grade="SMP" alur={alurBySmp} />
        <ListAlur grade="SMK" alur={alurBySmk} />

        <ModalCreateEdit
          size={size}
          title="Tambah Alur"
          opened={openedCreate}
          onClose={closeCreate}
        >
          <form onSubmit={formAlur.onSubmit(createAlurHandler)}>
            <FormAlur />
            <FooterModal
              label="Tambah"
              loading={loadingActionAlur}
              onClose={() => {
                closeCreate();
                formAlur.reset();
              }}
            />
          </form>
        </ModalCreateEdit>

        <ModalCreateEdit
          size={size}
          title="Ubah Alur"
          opened={openedEdit}
          onClose={closeEdit}
        >
          <form onSubmit={formAlur.onSubmit(editAlurHandler)}>
            <FormAlur />
            <FooterModal
              label="Ubah"
              loading={loadingActionAlur}
              onClose={() => {
                closeEdit();
                formAlur.reset();
              }}
            />
          </form>
        </ModalCreateEdit>

        {/* <ModalDeleteAlur /> */}
        <ModalDelete
          title="Hapus Alur"
          loading={loadingActionAlur}
          onAccept={() => submitDeleteAlur({ id: formAlur.values.id })}
          onClose={() => {
            closeDelete();
            formAlur.reset();
          }}
          description={`Anda yakin ingin menghapus alur pendaftaran ${formAlur.values.title}?`}
        />
      </Stack>
    </Page>
  );
};

export default AlurPPPDB;
