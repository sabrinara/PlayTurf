
import DashboardNavbar from "@/pages/shared/DashboardNavbar";
import Sidebar from "@/pages/shared/Sidebar";
import { useState } from "react";
import { Outlet } from "react-router-dom";

const DashBoardLayout = () => {
    const [sidebarToggle, setSidebarToggle] = useState(false);
    return (
        <div className="bg-[#000924]">
           <div className="flex flex-col ">
           <DashboardNavbar />
          <div className="flex">
          <div className={`${sidebarToggle ? "w-20" : "w-2/12"} h-full`}>
                <Sidebar sidebarToggle={sidebarToggle} setSidebarToggle={setSidebarToggle}/>
            </div>
            <div className={`${sidebarToggle ? "w-10/12 md:w-11/12 px-4 ml-0 md:ml-24 " : "w-9/12 md:w-3/4 ml-2 md:ml-24 "}  relative  pt-10 `}>
                <Outlet />
            </div>
          </div>
           </div>
        </div>
    );
};

export default DashBoardLayout;