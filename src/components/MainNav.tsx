import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useAuth0 } from "@auth0/auth0-react";
import UserNameMenu from "./UserNameMenu";

const MainNav = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  return (
    <div className="flex justify-center items-center gap-10 hover:text-green-800">
      <Link to={"/about"} className="text-xl text-green-600 font-bold">
        About
      </Link>
      {isAuthenticated ? (
        <>
          <Link
            to={"/order-status"}
            className="text-xl text-green-600 font-bold">
            Order status
          </Link>
          <UserNameMenu />
        </>
      ) : (
        <Button
          variant="ghost"
          className="text-xl text-green-600 font-bold capitalize hover:text-green-600"
          onClick={async () => await loginWithRedirect()}>
          Log In
        </Button>
      )}
    </div>
  );
};

export default MainNav;
