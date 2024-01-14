import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { lazy } from "react";
import { Navigate, Outlet, RouteObject } from "react-router-dom";
import Interceptors from "./Interceptor";
import { ProviderMantine } from "./components";
import MissingPPDB from "./components/ppdb/missingPPDB";
import Unauthorized from "./components/ppdb/unauthorized";
import AuthLayout from "./layouts/AuthLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import GuestLayout from "./layouts/GuestLayout";
import JalurPendaftaranDetailLayout from "./layouts/JalurPendaftaranDetailLayout";
import { PendaftarPPDB } from "./pages";
import JalurPendaftaranAdminSMP from "./pages/ppdb/admin/jalur-pendaftaran/JalurPendaftaranAdminSMP";
import JalurPendaftarahAdmin from "./pages/ppdb/admin/jalur-pendaftaran/JalurPendaftaranAdmin";
import JalurPendaftaranAdminSMK from "./pages/ppdb/admin/jalur-pendaftaran/JalurPendaftaranAdminSMK";

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
          <ProviderMantine>
            <Outlet />
          </ProviderMantine>
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
                path: "profile",
                Component: lazy(() => import("./pages/ppdb/Profile"))
              },
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
                Component: lazy(() => import("./pages/ppdb/siswa/pengembalian/PengembalianSiswaPPDB")),
              },
              {
                path: "tes-ujian",
                Component: lazy(() => import("./pages/ppdb/siswa/test-ujian/TesUjianStudent")),
              },
              {
                path: "dashboard",
                Component: lazy(() => import("./pages/ppdb/admin/dashboard/Dashboard")),
              },
              {
                path: "alur",
                Component: lazy(() => import("./pages/ppdb/admin/alur-pendaftaran/AlurPPPDB")),
              },
              {
                path: "jalur-pendaftaran",
                Component: () => (
                  <JalurPendaftarahAdmin>
                    <Outlet />
                  </JalurPendaftarahAdmin>
                ),
                children: [
                  // {
                  //   index: true,
                  //   // Component: lazy(
                  //   //   () =>
                  //   //     import(
                  //   //       "./pages/ppdb/admin/jalur-pendaftaran/JalurPendaftaranAdmin"
                  //   //     )
                  //   // ),
                  // },
                  {
                    path: "smp",
                    Component: JalurPendaftaranAdminSMP
                  },
                  {
                    path: "smk",
                    Component: JalurPendaftaranAdminSMK
                  },
                  {
                    path: ":grade/:idJalurPendaftaran",
                    Component: () => (
                      <JalurPendaftaranDetailLayout>
                        <Outlet />
                      </JalurPendaftaranDetailLayout>
                    ),
                    children: [
                      {
                        path: "informasi-umum",
                        Component: lazy(() => import("./pages/ppdb/admin/jalur-pendaftaran/InformasiUmum")),
                      },
                      {
                        path: "gelombang",
                        Component: lazy(() => import("./pages/ppdb/admin/jalur-pendaftaran/Gelombang")),
                      },
                    ],
                  },
                ],
              },
              {
                path: "pendaftar-ppdb",
                Component: () => (
                  <PendaftarPPDB >
                    <Outlet />
                  </PendaftarPPDB>
                ),
                children: [
                  {
                    path: "pembelian",
                    Component: lazy(() => import("./pages/ppdb/admin/pendaftar/PendaftarGelombangTPembelian")),
                  },
                  {
                    path: "pengembalian",
                    Component: lazy(() => import("./pages/ppdb/admin/pendaftar/PendaftarGelombangTPengembalian"))
                  }
                ]
              },
              {
                path: "pendaftar-ppdb/:tipeGelombang/:gelombangId",
                Component: lazy(() => import("./pages/ppdb/admin/pendaftar/PendaftarPerGelombang")),
              },
              {
                path: "pendaftar-ppdb/:tipeGelombang/:gelombangId/:userId",
                Component: lazy(() => import("./pages/ppdb/admin/pendaftar/DetailPendaftar")),
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
