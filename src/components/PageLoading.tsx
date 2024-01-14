import { MoonLoader } from "react-spinners";

const PageLoading = () => {
  return (
    <div
      className={"w-full flex flex-col items-center justify-center gap-2"}
      style={{ height: "100vh" }}
    >
      <img
        src={"/logo-yatindo-hd.png"}
        alt={"Logo Yatindo"}
        className={"w-32"}
      />
      <MoonLoader size={40} color={"blue"} />
    </div>
  );
};

export default PageLoading;
