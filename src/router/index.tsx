import DashBoardLayout from "@/components/Layouts/DashBoardLayout";
import MainLayout from "@/components/Layouts/MainLayouts";
import DashboardUser from "@/pages/DashboardUser/DashboardUser";
import Facility from "@/pages/Facility/Facility";
import Home from "@/pages/Home/Home";
import Login from "@/pages/Login/Login";
import Registration from "@/pages/Registration/Registration";
import NotFound from "@/pages/shared/NotFound";
import { createBrowserRouter } from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
     
      
    ],
  },
  {
    path: "/dashboard",
    element: <DashBoardLayout />,
    errorElement: <NotFound />,
    children: [
      { 
        path: "",
        element: <DashboardUser />,
      },
      {
        path: "/dashboard/facility",
        element: <Facility />,
      },

    ]
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Registration />,
  }
]);

export default router;
