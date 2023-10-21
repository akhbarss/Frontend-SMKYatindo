import { Navigate, Outlet, createBrowserRouter } from "react-router-dom";
import MissingPPDB from "./components/ppdb/missingPPDB";
import RequireAuth from "./components/ppdb/requireAuth";
import Unauthorized from "./components/ppdb/unauthorized";
import RoleRequire from "./components/roleRequire";
import {
  AlurPPPDB,
  BerandaSiswaPPDB,
  GuestPPDB,
  JalurPendaftaran,
  LayoutSiswa,
  PembelianSiswaPPDB,
  PendaftarPPDB,
  PengembalianSiswaPPDB,
  RootAdminPPDB,
  RootSiswaPPDB,
  UjianPPDB,
  UjianSiswaPPDB,
} from "./pages";
import BerandaAdmin from "./pages/ppdb/admin/BerandaAdmin";
import { AppShell } from "@mantine/core";
import { lazy } from "react";
import InformasiUmum from "./pages/ppdb/admin/jalurPendaftaranPPDB/InformasiUmum.tsx";
import Gelombang from "./components/ppdb/siswa/gelombang.tsx";
import AuthLayout from "./layouts/AuthLayout.tsx";

export const routeConfigs = createBrowserRouter(
  [
    {
      path: "/ppdb",
      children: [
        {
          index: true,
          Component: GuestPPDB,
        },
        {
          path: "/auth",
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
          ],
        },
        {
          Component: () => <RequireAuth />,
          children: [
            {
              Component: () => <RoleRequire allowedRole={ROLES.SISWA} />,
              children: [
                {
                  path: "siswa",
                  Component: () => <LayoutSiswa />,
                  children: [
                    {
                      index: true,
                      Component: () => <BerandaSiswaPPDB />,
                    },
                    {
                      path: "pembelian",
                      Component: () => <PembelianSiswaPPDB />,
                    },
                    {
                      path: "pengembalian",
                      Component: () => <PengembalianSiswaPPDB />,
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          Component: () => <RequireAuth />,
          children: [
            {
              Component: () => <RoleRequire allowedRole={ROLES.ADMIN} />,
              children: [
                {
                  path: "admin",
                  Component: () => (
                    <AppShell padding={0}>
                      <RootAdminPPDB />
                    </AppShell>
                  ),
                  children: [
                    {
                      index: true,
                      Component: () => <BerandaAdmin />,
                    },
                    {
                      path: "alur-ppdb",
                      Component: () => <AlurPPPDB />,
                    },
                    {
                      path: "jalur-pendaftaran",
                      children: [
                        {
                          index: true,
                          Component: () => <JalurPendaftaran />,
                        },
                        {
                          path: ":idJalurPendaftaran",
                          Component: () => <Outlet />,
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
                  ],
                },
              ],
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
  { window }
);
