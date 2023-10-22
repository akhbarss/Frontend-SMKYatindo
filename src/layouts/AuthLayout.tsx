import React, { Suspense } from "react";
import PageHeader from "../components/ppdb/pageHeader";
import { Group } from "@mantine/core";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import PageLoading from "../components/PageLoading";
import { useBreakPoints } from "../utils/UseBreakpoints";

type TAuthLayout = {
  children: any;
};

const AuthLayout: React.FC<TAuthLayout> = ({ children }) => {

  const { md } = useBreakPoints()

  return (
    <Suspense fallback={<PageLoading />}>
      <main id="login" className="">
        {
          !md && (
            <PageHeader >

              <h1 className="text-[#C1C2C5] text-2xl font-bold md:hidden">
                PPDB Online
              </h1>

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
            </PageHeader>
          )
        }
        {children}
      </main>
    </Suspense>
  );
};

export default AuthLayout;
