import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Link, useNavigate } from "react-router-dom";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";
import { useAddUserLogoutMutation } from "@/redux/api/api";
import { toast } from "sonner"; // Make sure you import toast for notifications

export default function Navbar() {
  const [addUserLogout] = useAddUserLogoutMutation();
  const navigate = useNavigate(); // Use useNavigate to redirect after logout

  const handleLogout = async () => {
    try {
      const result = await addUserLogout({ }).unwrap(); // Ensure the logout is successful

      toast.success("Logout successful");

      localStorage.removeItem("token");
      navigate("/login"); // Clear token on successful logout
      // Redirect to login or home page after logout
    } catch (error) {
      console.error("Logout failed: ", error);
    }
  };
  

  const data = [
    {
      id: 1,
      name: "Home",
      path: "/",
    },
    {
      id: 2,
      name: "Products",
      path: "/products",
    },
    {
      id: 3,
      name: "More",
      path: "/more",
    },
    {
      id: 4,
      name: "About",
      path: "/about",
    },
    {
      id: 6,
      name: "Login",
      path: "/login",
    },
    {
      id: 7,
      name: "Register",
      path: "/signup",
    },
  ];

  return (
    <div className="sticky md:top-6 py-5 bg-[#102e46] md:mx-4 md:rounded-full md:px-10">
      <div className="flex items-center justify-between lg:p-0 gap-2">
        <Link to="/">
          <div className="flex items-center">
            <img src="./navlogo3.png" className="h-14 md:h-16" alt="Logo" />
          </div>
        </Link>

        {/* large and medium screens */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="flex ">
            {data.map((item) => (
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
            <NavigationMenuItem>
              <button
                onClick={handleLogout}
                className="text-lg font-bold sm:text-base hover:rounded-full !text-[#42f5f5] !bg-[#102e47] hover:!bg-[#7fd9f5] hover:!text-[#000924]"
              >
                Logout
              </button>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/*  small devices */}
        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-2 text-[#42f5f5] mr-2">
                <Menu className="h-6 w-6" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-32 mr-4 bg-[#002a4b] text-[#42f5f5] border-[#002a4b]">
              {data.map((item) => (
                <DropdownMenuItem key={item.id} asChild className="text-xs font-medium">
                  <Link to={item.path}>
                    {typeof item.name === "string" ? item.name : item.name}
                  </Link>
                </DropdownMenuItem>
              ))}
              <DropdownMenuItem asChild className="text-xs font-medium">
                <button onClick={handleLogout}>
                  Logout
                </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
