import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "./ui/button";
import {
  SignedIn,
  SignedOut,
  SignIn,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { BriefcaseBusiness, Heart, PenBox } from "lucide-react";

const Header = () => {
  const [showSignin, setshowSignin] = useState(false);
  const [search, setSearch] = useSearchParams();
  useEffect(() => {
    if (search.get("sign-in")) {
      setshowSignin(true);
      setSearch({});
    }
  }, [search, setSearch]);
  const handleOverlayClick = (e) => {
    if (e.target == e.currentTarget) {
      setshowSignin(false);
    }
  };
  return (
    <>
      <nav className="py-4 flex items-center justify-between">
        <Link>
          <h1 className="font-extrabold text-4xl">
            Hirred<span className="text-5xl">.</span>
          </h1>
        </Link>
        <div className="flex gap-8">
          <SignedOut>
            <Button
              variant={"outline"}
              className={"cursor-pointer"}
              onClick={() => setshowSignin(true)}
            >
              Login
            </Button>
          </SignedOut>
          <SignedIn>
            <Link to={"/post-job"}>
              <Button variant={"red"} className={"cursor-pointer rounded-full"}>
                <PenBox size={20} className="mr-2" />
                Post a Job
              </Button>
            </Link>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: { height: 40, width: 40 },
                },
              }}
            >
              <UserButton.MenuItems>
                <UserButton.Link
                  label="My Jobs"
                  labelIcon={<BriefcaseBusiness size={15} />}
                  href="/my-jobs"
                />
                <UserButton.Link
                  label="Saved Jobs"
                  labelIcon={<Heart size={15} />}
                  href="/saved-job"
                />
              </UserButton.MenuItems>
            </UserButton>
          </SignedIn>
        </div>
      </nav>
      {showSignin && (
        <div
          className="fixed inset-0 z-10 flex items-center justify-center bg-black/50"
          onClick={handleOverlayClick}
        >
          <SignIn
            signUpForceRedirectUrl={"/onboarding"}
            fallbackRedirectUrl={"/onboarding"}
          />
        </div>
      )}
    </>
  );
};

export default Header;
