
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
          <div className={`${sidebarToggle ? "w-20 bg-[#000924]" : "w-2/12 bg-[#000924]"} `}>
                <Sidebar sidebarToggle={sidebarToggle} setSidebarToggle={setSidebarToggle} /> 
            </div>
            <div className={`${sidebarToggle ? "w-10/12 md:w-11/12 px-4 ml-0 md:ml-6 bg-[#000924]" : "w-9/12 md:w-4/5 ml-2 md:ml-10 bg-[#000924]"}  relative   bg-[#000924]`}>
                <Outlet />
            </div>
          </div>
           </div>
        </div>
    );
};

export default DashBoardLayout;