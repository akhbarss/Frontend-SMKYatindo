import React, { Suspense } from "react";
import PageHeader from "../components/ppdb/pageHeader.tsx";
import { Group, MantineProvider } from "@mantine/core";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import PageLoading from "../components/PageLoading.tsx";

type TAuthLayout = {
  children: any;
};

const AuthLayout: React.FC<TAuthLayout> = ({ children }) => {
  return (
    <Suspense fallback={<PageLoading />}>
      <main id="login" className="">
        {/* <MantineProvider theme={{ colorScheme: "light" }}> */}
          {/* <PageHeader>
            <h1 className="text-[#C1C2C5] text-2xl font-bold max-md:hidden">
              PPDB SMK TINTA EMAS INDONESIA
            </h1>

            <Group>
              <Link to={"/ppdb"}>
                <FaHome
                  size={30}
                  style={{}}
                  className={`cursor-pointer text-gray-300 hover:text-white`}
                />
              </Link>
            </Group>
          </PageHeader> */}
          {children}
        {/* </MantineProvider> */}
      </main>
    </Suspense>
  );
};

export default AuthLayout;
