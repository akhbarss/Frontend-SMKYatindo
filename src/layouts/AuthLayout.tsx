/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Suspense, useEffect } from "react";
import PageHeader from "../components/ppdb/pageHeader";
import { Group } from "@mantine/core";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import PageLoading from "../components/PageLoading";
import { useBreakPoints } from "../utils/UseBreakpoints";

type TAuthLayout = {
  children: any;
};

const AuthLayout: React.FC<TAuthLayout> = ({ children }) => {
  const { md } = useBreakPoints()
  const { pathname } = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (pathname === "/ppdb/auth" || pathname === "/ppdb/auth/") {
      navigate("/ppdb/auth/login")
    }
  }, [pathname, navigate])

  return (
    <Suspense fallback={<PageLoading />}>
      <main id="login" className="">
        {
          !md && (
            <PageHeader >

              <h1 className="text-white text-2xl font-bold md:hidden">
                PPDB Yatindo
              </h1>

              <Group>
                <Link to={"/ppdb"}>
                  <FaHome
                    size={30}
                    className={`cursor-pointer text-white hover:text-white`}
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
