import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

const Header = () => {
  return (
    <>
      <nav className="py-4 flex items-center justify-between">
        <Link>
          <h1 className="font-extrabold text-4xl">
            Hirred<span className="text-5xl">.</span>
          </h1>
        </Link>

        <Button variant={"outline"} className={"cursor-pointer"}>
          Login
        </Button>
        {/* <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn> */}
      </nav>
    </>
  );
};

export default Header;
