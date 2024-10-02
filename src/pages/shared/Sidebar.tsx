import { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import {  BsFillCalendarFill } from "react-icons/bs";
import { MdPeopleAlt } from "react-icons/md";
import { GiField } from "react-icons/gi";
import { MdPostAdd } from "react-icons/md";
import { RiLogoutBoxLine } from "react-icons/ri";
import { TiUserAdd } from "react-icons/ti";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoHomeSharp } from "react-icons/io5";
import { MdBookmarkAdd, MdBookmarkAdded } from "react-icons/md";
import { useAddUserLogoutMutation, useGetUserProfileQuery } from "@/redux/api/api";
import { toast } from "sonner";



interface SidebarProps {
  sidebarToggle: boolean;
  setSidebarToggle: (toggle: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarToggle, setSidebarToggle }) => {
  const id = localStorage.getItem("id");
  const { data, isLoading } = useGetUserProfileQuery({ id });
  const [addUserLogout] = useAddUserLogoutMutation();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  if (isLoading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  const { data: user } = data || {};

  const token = localStorage.getItem("token");
  console.log("token: ", token);

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

  const getLinkClass = (path: string) => {
    return location.pathname === path
      ? "bg-[#000924] text-[#42f5f5] rounded-full"
      : "bg-[#102e46] text-[#42f5f5] hover:bg-[#000924] hover:text-white hover:rounded-full";
  };

  return (
    <div className="bg-[#102e46] min-h-screen border-t border-[#000924] rounded-r-lg">
      <div
        className={`${open ? "w-20" : "block w-20 md:w-56"
          } absolute top-20 left-0 px-4 py-2 text-[#42f5f5]`}
      >
        {open ? (
          <FaArrowRight
            onClick={() => {
              setOpen(!open);
              setSidebarToggle(!sidebarToggle);
            }}
            className="hidden md:flex absolute cursor-pointer rounded-full -right-3 top-9 w-5 h-5 border-2"
          />
        ) : (
          <FaArrowLeft
            onClick={() => {
              setOpen(!open);
              setSidebarToggle(!sidebarToggle);
            }}
            className="hidden md:flex absolute cursor-pointer rounded-full -right-3 top-9 w-5 h-5 border-2 text-xs"
          />
        )}
        <ul
          className={`${open ? "text-start" : "mt-3 font-bold text-sm text-center md:text-start md:px-2"
            }`}
        >
          <li className={`mb-2 rounded hover:shadow py-2 ${getLinkClass("/")}`}>
            <Link to="/" className="px-3">
              <IoHomeSharp className="inline-block w-5 h-5 -mt-1" />
              {!open && <span className="hidden md:inline md:ml-1 text-[17px]">Home</span>}
            </Link>
          </li>
          {user?.role === "user" && (
           <>
            <li className={`mb-2 rounded hover:shadow py-2 ${getLinkClass("/dashboard/booking")}`}>
              <Link to="/dashboard/booking" className="px-3">
                <MdBookmarkAdd className="inline-block w-5 h-5 -mt-1" />
                {!open && <span className="hidden md:inline md:ml-1 text-[17px]">Book Facility</span>}
              </Link>
            </li>
            <li className={`mb-2 rounded hover:shadow py-2 ${getLinkClass("/dashboard/mybooking")}`}>
              <Link to="/dashboard/mybooking" className="px-3">
                <MdBookmarkAdded className="inline-block w-5 h-5 -mt-1" />
                {!open && <span className="hidden md:inline md:ml-1 text-[17px]">My Bookings</span>}
              </Link>
            </li>
           </>
          )}
          {user?.role === "admin" && (
            <>
             
              
              <li className={`mb-2 rounded hover:shadow py-2 ${getLinkClass("/dashboard/addadmin")}`}>
                <Link to="/dashboard/addadmin" className="px-3">
                <TiUserAdd className="inline-block w-5 h-5 -mt-1" />
                  {!open && <span className="hidden md:inline md:ml-1 text-[17px]">Add Admin</span>}
                </Link>
              </li>
               <li className={`mb-2 rounded hover:shadow py-2 ${getLinkClass("/dashboard/allusers")}`}>
                <Link to="/dashboard/allusers" className="px-3">
                <MdPeopleAlt className="inline-block w-5 h-5 -mt-1" />
                  {!open && <span className="hidden md:inline md:ml-1 text-[17px]">All Users</span>}
                </Link>
              </li> 
              <li className={`mb-2 rounded hover:shadow py-2 ${getLinkClass("/dashboard/addfacility")}`}>
                <Link to="/dashboard/addfacility" className="px-3">
                  <MdPostAdd className="inline-block w-5 h-5 -mt-1" />
                  {!open && <span className="hidden md:inline md:ml-1 text-[17px]">Add Facilities</span>}
                </Link>
              </li>
              <li className={`mb-2 rounded hover:shadow py-2 ${getLinkClass("/dashboard/facilitytable")}`}>
                <Link to="/dashboard/facilitytable" className="px-3">
                  <GiField className="inline-block w-5 h-5 -mt-1" />
                  {!open && <span className="hidden md:inline md:ml-1 text-[17px]">All Facilities</span>}
                </Link>
              </li>
              <li className={`mb-2 rounded hover:shadow py-2 ${getLinkClass("/dashboard/allbookings")}`}>
                <Link to="/dashboard/allbookings" className="px-3">
                  <BsFillCalendarFill className="inline-block w-4 h-4 -mt-1" />
                  {!open && <span className="hidden md:inline md:ml-1 text-[17px]">All Bookings</span>}
                </Link>
              </li>
             
             
            </>
          )}
          <li className="mb-2 rounded hover:shadow py-2">
            <button onClick={handleLogout} className="px-3">
              <RiLogoutBoxLine className="inline-block w-5 h-5 -mt-1" />
              {!open && <span className="hidden md:inline md:ml-1 text-[17px]">Logout</span>}
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
