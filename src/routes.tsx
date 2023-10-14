import { Navigate, Outlet, createBrowserRouter } from "react-router-dom";
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
  UjianSiswaPPDB
} from "./pages";
import LoginPPDB from "./pages/auth/LoginPPDB";
import BerandaAdmin from "./pages/ppdb/admin/BerandaAdmin";
import { AppShell } from "@mantine/core";

export const routeConfigs = createBrowserRouter([
  {
    path: "/ppdb",
    children: [
      {
        index: true,
        Component: GuestPPDB
      },
      {
        Component: () => (
          <AppShell
            padding={0}
          >
            <Outlet />
          </AppShell>
        ),
        children: [
          {
            path: "login",
            Component: () => (
              <LoginPPDB />
            )
          },
          {
            path: "siswa",
            Component: () => (
              < RootSiswaPPDB />
            ),
            children: [
              {
                index: true,
                Component: () => (< BerandaSiswaPPDB />)
              },
              {
                path: "pembelian",
                Component: () => (< PembelianSiswaPPDB />)
              },
              {
                path: "pengembalian",
                Component: () => (< PengembalianSiswaPPDB />)
              },
              {
                path: "ujian",
                Component: () => (< UjianSiswaPPDB />)
              },
            ]
          },
          {
            path: "admin",
            Component: () => (
              < RootAdminPPDB />
            ),
            children: [
              {
                index: true,
                Component: () => (< BerandaAdmin />)
              },
              {
                path: "alur-ppdb",
                Component: () => (< AlurPPPDB />)
              },
              {
                path: "jalur-pendaftaran",
                Component: () => (< JalurPendaftaran />)
              },
              {
                path: "pendaftar-ppdb",
                Component: () => (< PendaftarPPDB />)
              },
              {
                path: "ujian-ppdb",
                Component: () => (< UjianPPDB />)
              },
            ]
          }
        ]
      },
    ],
  },
  {
    path: "/ppdb/*",
    Component: MissingPPDB
  },
  {
    path: "*",
    Component: () => Navigate({ to: "/ppdb" })
  }
], { window, });
