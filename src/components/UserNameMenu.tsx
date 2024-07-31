import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CircleUserRound } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { useAuth0 } from "@auth0/auth0-react";

export default function UserNameMenu() {
  const { user, logout } = useAuth0();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 font-bold text-xl text-green-700 justify-center">
        <CircleUserRound className="flex items-center justify-center" />
        {user?.email}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col items-center justify-center gap-2">
        <DropdownMenuItem asChild>
          <Link to={"/profile"} className="text-green-700 ">
            User Profile
          </Link>
        </DropdownMenuItem>
        <Separator />
        <DropdownMenuItem asChild>
          <Link to={"/manage-restaurants"} className="text-green-700">
            Manage Restuarants
          </Link>
        </DropdownMenuItem>
        <Separator />
        <DropdownMenuItem asChild>
          <Button
            variant="ghost"
            className="text-xl text-green-600  capitalize hover:text-green-600"
            onClick={() => logout()}>
            Logout
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
