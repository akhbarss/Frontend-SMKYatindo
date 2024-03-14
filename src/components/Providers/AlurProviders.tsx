import { isNotEmpty } from "@mantine/form";
import { AlurContextProvider } from "../../context/AlurProvider.context";
import { AlurFormProvider, useAlurForm } from "../../context/form-context";

type AlurProvidersProps = {
  children: React.ReactNode;
};

const AlurProviders = ({ children }: AlurProvidersProps) => {
  const formAlur = useAlurForm({
    initialValues: {
      id: null,
      desc: "",
      grade: "SMP",
      title: "",
    },
    validate: {
        desc: isNotEmpty("Dibutuhkan"),
        grade: isNotEmpty("Dibutuhkan"),
        title: isNotEmpty("Dibutuhkan"),
    }
  });

  return (
    <>
      <AlurContextProvider>
        <AlurFormProvider form={formAlur}>{children}</AlurFormProvider>
      </AlurContextProvider>
    </>
  );
};

export default AlurProviders;
