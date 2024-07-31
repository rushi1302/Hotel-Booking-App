import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="bg-white py-5 md:py-10 border-t-2">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-7 ">
        <span className="text-3xl text-green-700 tracking-tight">
          <Link to={"/"}>CITY INN</Link>
        </span>
        <span className="text-green-500 flex gap-8 md:text-xl">
          <Link to={"/privacy"} className=" hover:text-black">
            Privacy Policy
          </Link>
          <Link to={"/terms"} className=" hover:text-black">
            Terms and Conditions
          </Link>
          <Link to={"/terms"} className=" hover:text-black">
            Contact
          </Link>
        </span>
      </div>
    </div>
  );
}
