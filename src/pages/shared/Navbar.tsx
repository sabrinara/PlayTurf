import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Link, useNavigate, useParams } from "react-router-dom";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";
import { useAddUserLogoutMutation, useGetUserProfileQuery } from "@/redux/api/api";
import { toast } from "sonner";

export default function Navbar() {
  const { id: _id } = useParams();
  const [addUserLogout] = useAddUserLogoutMutation();
  const navigate = useNavigate();
  
  const navData = [
    { id: 1, name: "Home", path: "/" },
    { id: 2, name: "More", path: "/more" },
    { id: 3, name: "About", path: "/about" },
    { id: 4, name: "Contact", path: "/contact" },
  ];

  const { data } = useGetUserProfileQuery({ id: _id });
  // console.log("user: ", data);
  const user = data?.data;
  // console.log("user: ", user);
  const handleLogout = async () => {
    try {
      await addUserLogout({}).unwrap();
      toast.success("Logout successful");
      localStorage.removeItem("token");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed: ", error);
    }
  };

  return (
    <div className="sticky md:top-6 py-5 bg-[#102e46] md:mx-4 md:rounded-full md:px-10">
      <div className="flex items-center justify-between lg:p-0 gap-2">
        <Link to="/">
          <div className="flex items-center">
            <img src="./navlogo3.png" className="h-14 md:h-16" alt="Logo" />
          </div>
        </Link>

        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="flex">
            {navData.map((item) => (
              <NavigationMenuItem key={item.id}>
                <Link to={item.path}>
                  <NavigationMenuLink
                    className={`${navigationMenuTriggerStyle()} text-lg font-bold sm:text-base hover:rounded-full !text-[#42f5f5] !bg-[#102e47] hover:!bg-[#7fd9f5] hover:!text-[#000924]`}
                  >
                    {item.name}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}

            {user?.role === "admin" && (
              <NavigationMenuItem>
                <Link to="/faculty">
                  <NavigationMenuLink
                    className={`${navigationMenuTriggerStyle()} text-lg font-bold sm:text-base hover:rounded-full !text-[#42f5f5] !bg-[#102e47] hover:!bg-[#7fd9f5] hover:!text-[#000924]`}
                  >
                    Faculty
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            )}

            {!user ? (
              <>
                <NavigationMenuItem>
                  <Link to="/login">
                    <NavigationMenuLink
                      className={`${navigationMenuTriggerStyle()} text-lg font-bold sm:text-base hover:rounded-full !text-[#42f5f5] !bg-[#102e47] hover:!bg-[#7fd9f5] hover:!text-[#000924]`}
                    >
                      Login
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/signup">
                    <NavigationMenuLink
                      className={`${navigationMenuTriggerStyle()} text-lg font-bold sm:text-base hover:rounded-full !text-[#42f5f5] !bg-[#102e47] hover:!bg-[#7fd9f5] hover:!text-[#000924]`}
                    >
                      Register
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </>
            ) : (
              <NavigationMenuItem>
                <button
                  onClick={handleLogout}
                  className="text-lg px-4 py-2 font-bold sm:text-base hover:rounded-full !text-[#42f5f5] !bg-[#102e47] hover:!bg-[#7fd9f5] hover:!text-[#000924]"
                >
                  Logout
                </button>
              </NavigationMenuItem>
            )}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-2 text-[#42f5f5] mr-2">
                <Menu className="h-6 w-6" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-32 mr-4 bg-[#002a4b] text-[#42f5f5] border-[#002a4b]">
              {navData.map((item) => (
                <DropdownMenuItem key={item.id} asChild className="text-xs font-medium">
                  <Link to={item.path}>{item.name}</Link>
                </DropdownMenuItem>
              ))}
              {user?.role === "admin" && (
                <DropdownMenuItem asChild className="text-xs font-medium">
                  <Link to="/faculty">Faculty</Link>
                </DropdownMenuItem>
              )}
              {!user ? (
                <>
                  <DropdownMenuItem asChild className="text-xs font-medium">
                    <Link to="/login">Login</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="text-xs font-medium">
                    <Link to="/signup">Register</Link>
                  </DropdownMenuItem>
                </>
              ) : (
                <DropdownMenuItem asChild className="text-xs font-medium">
                  <button onClick={handleLogout}>Logout</button>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
