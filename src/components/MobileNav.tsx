import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import MobileNavMenu from "./MobileNavMenu";

const MobileNav = () => {
  const { user, isAuthenticated, loginWithRedirect } = useAuth0();

  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="text-green-400" />
      </SheetTrigger>
      <SheetContent className="space-y-3">
        <SheetTitle className="text-center text-yellow-500">
          {user?.nickname?.toUpperCase()} WELCOME TO CITY INN
        </SheetTitle>
        <Separator />
        <SheetDescription className="flex flex-col gap-3 py-3">
          <Link to={"/about"} className="text-xl  text-green-600 text-center">
            About
          </Link>
          {isAuthenticated ? (
            <MobileNavMenu />
          ) : (
            <Button
              onClick={() => loginWithRedirect()}
              className="text-green-400">
              Log In
            </Button>
          )}
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
