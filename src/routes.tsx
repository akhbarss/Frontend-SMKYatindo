import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import MissingPPDB from "./components/ppdb/missingPPDB";
import Unauthorized from "./components/ppdb/unauthorized";
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
} from "./pages";
import Dashboard from "./pages/ppdb/admin/Dashboard.tsx";
import { AppShell } from "@mantine/core";
import { lazy } from "react";
import InformasiUmum from "./pages/ppdb/admin/jalurPendaftaranPPDB/InformasiUmum.tsx";
import Gelombang from "./components/ppdb/siswa/gelombang.tsx";
import AuthLayout from "./layouts/AuthLayout.tsx";
import DashboardLayout from "./layouts/DashboardLayout.tsx";

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
              path: "register",
              Component: lazy(() => import("./pages/auth/Register.tsx")),
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
              Component: () => <PembelianSiswaPPDB />,
            },
            {
              path: "pengembalian",
              Component: () => <PengembalianSiswaPPDB />,
            },

            {
              path: "dashboard",
              Component: lazy(() => import("./pages/ppdb/admin/Dashboard")),
            },
            {
              path: "alur",
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
