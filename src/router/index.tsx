import DashBoardLayout from "@/components/Layouts/DashBoardLayout";
import MainLayout from "@/components/Layouts/MainLayouts";
import AddAdminTable from "@/pages/AdminDashboard/AddAdminTable";
import AddFacility from "@/pages/AdminDashboard/AddFacility";
import FacilityTable from "@/pages/AdminDashboard/FacilityTable";
import Booking from "@/pages/Booking/Booking";
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
      {
        path: "/facility",
        element: <Facility />,
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
        path: "/dashboard/addfacility",
        element: <AddFacility />,
      },
      {
        path: "/dashboard/facilitytable",
        element: <FacilityTable />,
      },
      {
        path: "/dashboard/addadmin",
        element: <AddAdminTable />,
      },
      {
        path: "/dashboard/mybooking",
        element: <Booking />,
      }

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
