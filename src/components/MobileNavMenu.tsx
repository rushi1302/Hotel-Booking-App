import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { useAuth0 } from "@auth0/auth0-react";
export default function MobileNavMenu() {
  const { logout } = useAuth0();
  return (
    <div className="flex flex-col gap-3">
      <Separator />
      <Link to={"/profile"} className="text-xl  text-green-600 text-center">
        User Profile
      </Link>
      <Separator />
      <Link
        to={"/manage-restaurants"}
        className="text-xl  text-green-600 text-center">
        Manage Restaurants
      </Link>
      <Separator />
      <Button
        onClick={() => logout()}
        variant="ghost"
        className="text-xl text-green-600 bg-black capitalize hover:text-green-600">
        LOGOUT
      </Button>
    </div>
  );
}
