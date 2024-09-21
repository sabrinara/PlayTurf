import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
   <div className="mx-auto container  ">
     <div className="flex  items-center justify-between border-b-2 py-3 ">
      <Link to="/" className="flex items-center">
        <h3 className="font-extrabold bg-yellow-400 p-1 rounded-md">
          {" "} PlayTurf
        </h3>{" "}
     
      </Link>
      <NavigationMenu className="">
        <NavigationMenuList>
          <div className="flex justify-end">
            <NavigationMenuItem>
              <Link to="/">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                 Something
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
   </div>
  );
}
