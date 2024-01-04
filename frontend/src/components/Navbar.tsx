"use client";
import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Button, buttonVariants } from "./ui/button";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "./../redux/features/auth-slice";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.userAuth.name);
  // console.log("redux name", user);

  function handleLogout() {
    dispatch(clearUser());
  }
  return (
    <div className="py-8 sticky z-50 top-0 inset-x-0 h-16 bg-white">
      <header className="relative bg-white">
        <MaxWidthWrapper className="flex justify-between items-center border-b-[1px] border-gray-300 pb-3">
          <div className="text-2xl font-mono">
            <Link href={"/"}>Book</Link>
          </div>
          <div className="flex justify-center items-center gap-x-4">
            <div>
              {user ? (
                <Button onClick={handleLogout}>Logout</Button>
              ) : (
                <div>
                  <Link
                    href={"/auth"}
                    className={buttonVariants({ variant: "link" })}
                  >
                    Login
                  </Link>
                </div>
              )}
            </div>
            <span className="h-6 w-px bg-gray-300" aria-hidden="true"></span>
            {user ? (
              <div>
                <Link
                  href={"/write"}
                  className={cn(
                    buttonVariants({ variant: "link" }),
                    "font-medium text-lg"
                  )}
                >
                  Write
                </Link>
              </div>
            ) : (
              <div>
                <Link
                  className={cn(buttonVariants({ variant: "link" }))}
                  href={"/auth"}
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </MaxWidthWrapper>
      </header>
    </div>
  );
};

export default Navbar;
