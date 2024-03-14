import { ModalProvider } from "../../context/ModalProvider.context";
import ProviderMantine from "./ProviderMantine";

type ProvidersProps = {
  children: React.ReactNode;
};

const Providers = ({ children }: ProvidersProps) => {
  return (
    <ProviderMantine>
      <ModalProvider>{children}</ModalProvider>
    </ProviderMantine>
  );
};

export default Providers;
