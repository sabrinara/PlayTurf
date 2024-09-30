import { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { IoHomeSharp } from "react-icons/io5";

const Sidebar = ({ sidebarToggle, setSidebarToggle }) => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // Function to check the current path and apply the active styles
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
          <li
            className={`mb-2 rounded hover:shadow py-2 ${getLinkClass(
              "/dashboard/facility"
            )}`}
          >
            <Link to="/dashboard/facility" className="px-3">
              <FaArrowLeft className="inline-block w-5 h-5  -mt-1" />
              {!open && <span className="hidden md:inline md:ml-1 text-[17px]" >Facilities</span>}
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
