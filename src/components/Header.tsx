import { Link } from "react-router-dom";
import MobileNav from "./MobileNav";
import MainNav from "./MainNav";

function Header() {
  return (
    <div className="border-b-2 py-6 px-3">
      <div className="container flex flex-1 justify-between items-center">
        <Link
          to={"/"}
          className="text-4xl font-bold tracking-tight text-green-700">
          CITY INN
        </Link>
        <div className="md:hidden">
          <MobileNav />
        </div>
        <div className="hidden md:block">
          <MainNav />
        </div>
      </div>
    </div>
  );
}

export default Header;
