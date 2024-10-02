import DashBoardLayout from "@/components/Layouts/DashBoardLayout";
import MainLayout from "@/components/Layouts/MainLayouts";
import About from "@/pages/About/About";
import AddAdmin from "@/pages/AdminDashboard/AddAdmin";
import AddAdminTable from "@/pages/AdminDashboard/AddAdminTable";
import AddFacility from "@/pages/AdminDashboard/AddFacility";
import AllBookings from "@/pages/AdminDashboard/AllBookings";
import FacilityTable from "@/pages/AdminDashboard/FacilityTable";
import Booking from "@/pages/Booking/Booking";
import MyBooking from "@/pages/Booking/MyBooking";
import Contact from "@/pages/Contact/Contact";
import DashboardUser from "@/pages/DashboardUser/DashboardUser";
import Facility from "@/pages/Facility/Facility";
import FacilityDetails from "@/pages/Facility/FacilityDetails";
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
      {
        path: "/facility/:id",
        element: <FacilityDetails />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
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
        path: "/dashboard/allusers",
        element: <AddAdminTable />,
      },
      {
        path: "/dashboard/addadmin",
        element: <AddAdmin />,
      },
     
      {
        path: "/dashboard/allbookings",
        element: <AllBookings />,
      },
      {
        path: "/dashboard/mybooking",
        element: <MyBooking />,
      },
      {
        path: "/dashboard/booking",
        element:<Booking/>
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
