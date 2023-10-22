import { lazy } from "react";
import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import MissingPPDB from "./components/ppdb/missingPPDB";
import Gelombang from "./components/ppdb/siswa/gelombang";
import Unauthorized from "./components/ppdb/unauthorized";
import AuthLayout from "./layouts/AuthLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import {
  AlurPPPDB,
  GuestPPDB,
  JalurPendaftaran,
  PendaftarPPDB
} from "./pages";
import InformasiUmum from "./pages/ppdb/admin/jalurPendaftaranPPDB/InformasiUmum";
import GuestLayout from "./layouts/GuestLayout";

export const routeConfigs = createBrowserRouter(
  [
    {
      path: "/ppdb",
      children: [
        {
          Component: () => (
            <GuestLayout >
              <Outlet />
            </GuestLayout>
          ),
          children: [
            {
              index: true,
              Component: lazy(() => import("./pages/ppdb/guest/GuestPPDB")),
            }
          ]
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
              Component: lazy(() => import("./pages/auth/Register"))
            }
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
              Component: lazy(() => import("./pages/ppdb/siswa/pembelian/PembelianSiswaPPDB")),
            },
            {
              path: "pengembalian",
              Component: lazy(() => import("./pages/ppdb/siswa/pengembalian/PengembalianSiswaPPDB")),
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
