import { createBrowserRouter } from "react-router-dom";
import {
  DashboardPPDB,
  DashboardSmk,
  DashboardSmp,
  DashboardYayasan,
  RootPPDB,
  RootSmk,
  RootSmp,
  RootYayasan
} from "./pages";
import LoginPPDB from "./pages/auth/LoginPPDB";

export const routeConfigs = createBrowserRouter([
  {
    path: "/",
    Component: RootYayasan,
    children: [
      {
        Component: DashboardYayasan,
        index: true
      },

    ],
  },
  {
    path: "/smk",
    Component: RootSmk,
    children: [
      {
        index: true,
        Component: DashboardSmk
      }
    ]
  },
  {
    path: "/smp",
    Component: RootSmp,
    children: [
      {
        index: true,
        Component: DashboardSmp
      }
    ]
  },
  {
    path: "/ppdb",
    Component: RootPPDB,
    children: [
      {
        index: true,
        Component: DashboardPPDB,

        
      },
      // {
      //   path: "login",
      //   Component: LoginPPDB
      // },
    ],
  
  },
  {
    path: "/ppdb/login",
    Component: LoginPPDB
  }
], {window});
