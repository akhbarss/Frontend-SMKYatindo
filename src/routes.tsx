import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { lazy } from "react";
import { Navigate, Outlet, RouteObject } from "react-router-dom";
import Interceptors from "./Interceptor";
import MissingPPDB from "./components/ppdb/missingPPDB";
import Unauthorized from "./components/ppdb/unauthorized";
import AuthLayout from "./layouts/AuthLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import GuestLayout from "./layouts/GuestLayout";
import JalurPendaftaranDetailLayout from "./layouts/JalurPendaftaranDetailLayout";
import { PendaftarPPDB } from "./pages";
import DetailSiswa from "./pages/ppdb/admin/DetailSiswa";
import PendaftarPerGelombang from "./pages/ppdb/admin/PendaftarPerGelombang";
import Gelombang from "./pages/ppdb/admin/jalurPendaftaranPPDB/Gelombang";
import InformasiUmum from "./pages/ppdb/admin/jalurPendaftaranPPDB/InformasiUmum";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
    },
  },
});

export const routes: RouteObject[] = [
  {
    Component: () => (
      <Interceptors>
        <QueryClientProvider client={queryClient}>
          <Outlet />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </Interceptors>
    ),
    children: [
      {
        path: "/ppdb",
        children: [
          {
            Component: () => (
              <GuestLayout>
                <Outlet />
              </GuestLayout>
            ),
            children: [
              {
                index: true,
                Component: lazy(() => import("./pages/ppdb/guest/GuestPPDB")),
              },
            ],
          },
          {
            path: "auth",
            Component: () => (
              <AuthLayout>
                <Outlet />
              </AuthLayout>
            ),
            children: [
              {
                path: "login",
                Component: lazy(() => import("./pages/auth/LoginPPDB")),
              },
              {
                path: "register/smk",
                Component: lazy(() => import("./pages/auth/Register")),
              },
              {
                path: "register/smp",
                Component: lazy(() => import("./pages/auth/Register")),
              },
              {
                path: "admin/register",
                Component: lazy(() => import("./pages/auth/RegisterAdmin")),
              },
            ],
          },
          {
            path: "main",
            Component: () => (
              <DashboardLayout>
                <Outlet />
              </DashboardLayout>
            ),
            children: [
              {
                path: "home",
                index: true,
                Component: lazy(
                  () => import("./pages/ppdb/siswa/home/BerandaSiswaPPDB")
                ),
              },
              {
                path: "pembelian",
                Component: lazy(
                  () =>
                    import("./pages/ppdb/siswa/pembelian/PembelianSiswaPPDB")
                ),
              },
              {
                path: "pengembalian",
                Component: lazy(
                  () =>
                    import(
                      "./pages/ppdb/siswa/pengembalian/PengembalianSiswaPPDB"
                    )
                ),
              },

              {
                path: "dashboard",
                Component: lazy(() => import("./pages/ppdb/admin/Dashboard")),
              },
              {
                path: "alur",
                // Component: () => <AlurPPPDB />,
                Component: lazy(() => import("./pages/ppdb/admin/AlurPPPDB")),
              },
              {
                path: "jalur-pendaftaran",
                children: [
                  {
                    index: true,
                    Component: lazy(
                      () =>
                        import(
                          "./pages/ppdb/admin/jalurPendaftaranPPDB/JalurPendaftaranAdmin"
                        )
                    ),
                  },
                  {
                    path: ":idJalurPendaftaran",
                    Component: () => (
                      <JalurPendaftaranDetailLayout>
                        <Outlet />
                      </JalurPendaftaranDetailLayout>
                    ),
                    children: [
                      {
                        path: "informasi-umum",
                        Component: InformasiUmum,
                      },
                      {
                        path: "gelombang",
                        Component: Gelombang,
                      },
                    ],
                  },
                ],
              },
              {
                path: "pendaftar-ppdb",
                Component: () => <PendaftarPPDB />,
              },
              {
                path: "pendaftar-ppdb/:gelombangId",
                Component: () => <PendaftarPerGelombang />,
              },
              {
                path: "pendaftar-ppdb/:gelombangId/:userId",
                Component: () => <DetailSiswa />,
              },
            ],
          },
          {
            path: "unauthorized",
            Component: Unauthorized,
          },
        ],
      },
      {
        path: "/ppdb/*",
        Component: MissingPPDB,
      },
      {
        path: "*",
        Component: () => Navigate({ to: "/ppdb" }),
      },
    ],
  },
];
