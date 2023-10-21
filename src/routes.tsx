import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import MissingPPDB from "./components/ppdb/missingPPDB";
import {
  AlurPPPDB,
  BerandaSiswaPPDB,
  GuestPPDB,
  JalurPendaftaran,
  PembelianSiswaPPDB,
  PendaftarPPDB,
  PengembalianSiswaPPDB,
  RootAdminPPDB,
  RootSiswaPPDB,
  UjianPPDB,
  UjianSiswaPPDB,
} from "./pages";
import BerandaAdmin from "./pages/ppdb/admin/BerandaAdmin";
import { lazy } from "react";
import AuthLayout from "./layouts/AuthLayout.tsx";
import PageLoading from "./components/PageLoading.tsx";

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
          path: "siswa",
          Component: () => <RootSiswaPPDB />,
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
            {
              path: "ujian",
              Component: () => <UjianSiswaPPDB />,
            },
          ],
        },
        {
          path: "admin",
          Component: () => <RootAdminPPDB />,
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
              Component: () => <JalurPendaftaran />,
            },
            {
              path: "pendaftar-ppdb",
              Component: () => <PendaftarPPDB />,
            },
            {
              path: "ujian-ppdb",
              Component: () => <UjianPPDB />,
            },
          ],
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
