import { AppShell } from "@mantine/core";
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
} from "./pages";
import LoginPPDB from "./pages/auth/LoginPPDB";
import BerandaAdmin from "./pages/ppdb/admin/BerandaAdmin";
import Gelombang from "./pages/ppdb/admin/jalurPendaftaranPPDB/Gelombang";
import InformasiUmum from "./pages/ppdb/admin/jalurPendaftaranPPDB/InformasiUmum";

const ROLES = {
  ADMIN: "ADMIN",
  SISWA: "SISWA"
}

export const routeConfigs = createBrowserRouter([
  {
    path: "/ppdb",
    children: [
      {
        index: true,
        Component: GuestPPDB
      },
      {
        path: "login",
        Component: () => (
          <LoginPPDB />
        )
      },
      {
        Component: () => (
          <RequireAuth />
        ),
        children: [
          {
            Component: () => <RoleRequire allowedRole={ROLES.SISWA} />,
            children: [
              {
                path: "siswa",
                Component: () => (
                  < LayoutSiswa />
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
                ]
              },
            ]
          }
        ]
      },
      {
        Component: () => (
          <RequireAuth />
        ),
        children: [
          {
            Component: () => <RoleRequire allowedRole={ROLES.ADMIN} />,
            children: [
              {
                path: "admin",
                Component: () => (
                  <AppShell padding={0}>
                    < RootAdminPPDB />
                  </AppShell>
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
                    children: [
                      {
                        index: true,
                        Component: () => (< JalurPendaftaran />),
                      },
                      {
                        path: ":idJalurPendaftaran",
                        Component: () => <Outlet />,
                        children: [
                          {
                            path: "informasi-umum",
                            Component: InformasiUmum
                          },
                          {
                            path: "gelombang",
                            Component: Gelombang
                          },
                        ]
                      }
                    ]
                  },
                  {
                    path: "pendaftar-ppdb",
                    Component: () => (< PendaftarPPDB />)
                  },
                ]
              }
            ]
          }
        ]
      },
      {
        path: "unauthorized",
        Component: Unauthorized

      }
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
