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

// const LazyGuestPPDB = React.lazy(() => import("./pages/ppdb/guest/GuestPPDB"))
// const LazyLogin = React.lazy(() => import("./pages/auth/LoginPPDB"))

// const LazyRootSiswaPPDB = React.lazy(() => import("./pages/ppdb/siswa/RootSiswaPPDB"))
// const LazyBerandaSiswaPPDB = React.lazy(() => import("./pages/ppdb/siswa/BerandaSiswaPPDB"))
// const LazyPembelianSiswaPPDB = React.lazy(() => import("./pages/ppdb/siswa/PembelianSiswaPPDB"))
// const LazyPengembalianSiswaPPDB = React.lazy(() => import("./pages/ppdb/siswa/PengembalianSiswaPPDB"))
// const LazyUjianSiswaPPDB = React.lazy(() => import("./pages/ppdb/siswa/UjianSiswaPPDB"))

// const LazyRootAdminPPDB = React.lazy(() => import("./pages/ppdb/admin/RootAdminPPDB"))
// const LazyBerandaAdmin = React.lazy(() => import("./pages/ppdb/admin/BerandaAdmin"))
// const LazyAlurPPPDB = React.lazy(() => import("./pages/ppdb/admin/AlurPPPDB"))
// const LazyJalurPendaftaran = React.lazy(() => import("./pages/ppdb/admin/JalurPendaftaran"))
// const LazyPendaftarPPDB = React.lazy(() => import("./pages/ppdb/admin/PendaftarPPDB"))
// const LazyUjianPPDB = React.lazy(() => import("./pages/ppdb/admin/UjianPPDB"))

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
          <Outlet />
        ),
        children: [
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
              // <React.Suspense fallback={<div>loading</div>}>
                < RootAdminPPDB />
            // * </React.Suspense> */}
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
    Component: () => Navigate({to: "/ppdb"})
  }
], { window, });
