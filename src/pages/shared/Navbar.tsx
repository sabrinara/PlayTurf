import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";

export default function Navbar() {
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
    }
  ];

  return (
    <div className="sticky md:top-6 py-5 bg-[#102e46] md:mx-4 md:rounded-full md:px-10">
      <div className="flex  items-center justify-between lg:p-0 gap-2">
        <Link to="/">
          <div className="flex items-center">
            <Link to={"/"} >
              <img src="./navlogo3.png" className="h-14 md:h-16 " alt="" />

            </Link >
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
                <DropdownMenuItem key={item.id} asChild className="text-xs  font-medium">
                  <Link to={item.path}>
                    {typeof item.name === "string" ? item.name : item.name}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}