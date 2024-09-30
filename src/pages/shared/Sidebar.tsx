import { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoHomeSharp } from "react-icons/io5";
import { useAddUserLogoutMutation, useGetUserProfileQuery } from "@/redux/api/api";
import { toast } from "sonner";
import Loading from "./Loading";

const Sidebar = ({ sidebarToggle, setSidebarToggle }) => {
  const id = localStorage.getItem("id");
  const { data, isLoading } = useGetUserProfileQuery({id});
  const [addUserLogout] = useAddUserLogoutMutation();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  if (isLoading) {
    return (
        <div>
            <Loading />
        </div>
    );
}
const { data: user } = data || {};

const token = localStorage.getItem("token");

const handleLogout = async () => {
  try {
    const result = await addUserLogout({}).unwrap(); 
    console.log("Logout successful: ", result);
    toast.success("Logout successful");
    localStorage.removeItem("token"); 
    localStorage.removeItem("id");
    navigate("/login");
  } catch (error) {
    console.error("Logout failed: ", error);
  }
};
 
  const getLinkClass = (path) => {
    return location.pathname === path
      ? "bg-[#000924] text-[#42f5f5] rounded-full"
      : "bg-[#102e46] text-[#42f5f5] hover:bg-[#000924] hover:text-white hover:rounded-full";
  };

  return (
    <div className=" bg-[#102e46] h-screen border-t border-[#000924] rounded-r-lg">
      <div
        className={`${open ? "w-20" : "block w-20 md:w-56 "
          } absolute top-20 left-0 px-4 py-2  text-[#42f5f5]`}
      >
        {open ? (
          <FaArrowRight
            onClick={() => {
              setOpen(!open);
              setSidebarToggle(!sidebarToggle);
            }}
            className="hidden md:absolute cursor-pointer rounded-full  -right-3 top-9 w-5 h-5 border-2"
          />
        ) : (
          <FaArrowLeft
            onClick={() => {
              setOpen(!open);
              setSidebarToggle(!sidebarToggle);
            }}
            className="hidden md:absolute cursor-pointer rounded-full -right-3 top-9 w-5 h-5 border-2 text-xs"
          />
        )}
        {/* <div className="my-2  mb-2">
          <div className={`${open ? "text-xs font-semibold " : "text-xs md:text-lg font-bold text-center"}`}>
            {open ? <>  <Link to="/">
              <div className="flex items-center ">
                <img src="../../../public/lo2.jpg" className="h-10 md:h-12" alt="Logo" />
              </div>
            </Link></> :
              <Link to="/">
                <div className="hidden md:flex items-center">
                  <img src="../../../public/navlogo3.png" className="h-14 md:h-16" alt="Logo" />
                </div>
              </Link>
            }
          </div>
        </div> */}
        <ul
          className={`${open ? "text-start" : "mt-3 font-bold text-sm text-center md:text-start md:px-2"
            }`}
        >
          <li className={`mb-2 rounded hover:shadow py-2 ${getLinkClass("/")}`}>
            <Link to="/" className="px-3">
              <IoHomeSharp className="inline-block w-5 h-5  -mt-1" />
              {!open && <span className="hidden md:inline md:ml-1 text-[17px]">Home</span>}
            </Link>
          </li>
          {
            user?.role === "user" && (
              <>
               <li
            className={`mb-2 rounded hover:shadow py-2 ${getLinkClass(
              "/dashboard/mybooking"
            )}`}
          >
            <Link to="/dashboard/mybooking" className="px-3">
              <FaArrowLeft className="inline-block w-5 h-5  -mt-1" />
              {!open && <span className="hidden md:inline md:ml-1 text-[17px]" >My Bookings</span>}
            </Link>
          </li>
              </>
            )
          }
         {
          user?.role === "admin" && (
            <>
             <li
            className={`mb-2 rounded hover:shadow py-2 ${getLinkClass(
              "/dashboard/addadmin"
            )}`}
          >
            <Link to="/dashboard/addadmin" className="px-3">
              <FaArrowLeft className="inline-block w-5 h-5  -mt-1" />
              {!open && <span className="hidden md:inline md:ml-1 text-[17px]" >All Users</span>}
            </Link>
          </li>
             <li
            className={`mb-2 rounded hover:shadow py-2 ${getLinkClass(
              "/dashboard/facilitytable"
            )}`}
          >
            <Link to="/dashboard/facilitytable" className="px-3">
              <FaArrowLeft className="inline-block w-5 h-5  -mt-1" />
              {!open && <span className="hidden md:inline md:ml-1 text-[17px]" >All Facilities</span>}
            </Link>
          </li>
             <li
            className={`mb-2 rounded hover:shadow py-2 ${getLinkClass(
              "/dashboard/addfacility"
            )}`}
          >
            <Link to="/dashboard/addfacility" className="px-3">
              <FaArrowLeft className="inline-block w-5 h-5  -mt-1" />
              {!open && <span className="hidden md:inline md:ml-1 text-[17px]" >Add Facilities</span>}
            </Link>
          </li>
            </>
          ) 
         }
            <li className="mb-2 rounded hover:shadow py-2">
           <button onClick={handleLogout} className="px-3">
              <IoHomeSharp className="inline-block w-5 h-5  -mt-1" />
              {!open && <span className="hidden md:inline md:ml-1 text-[17px]">Logout</span>}
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
