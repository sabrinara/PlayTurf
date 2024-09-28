import MainLayout from "@/components/Layouts/MainLayouts";
import DashboardUser from "@/pages/DashboardUser/DashboardUser";
import Home from "@/pages/Home/Home";
import Login from "@/pages/Login/Login";
import Registration from "@/pages/Registration/Registration";
import NotFound from "@/pages/shared/NotFound";
import { createBrowserRouter } from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Registration />,
      },
      {
        path:"/userdashboard",
        element: <DashboardUser/>
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
