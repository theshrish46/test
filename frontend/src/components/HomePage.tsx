"use client";
import React from "react";
import CardComponent from "./CardComponent";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

type TProps = {
  children: React.ReactNode;
};

const HomePage = ({ children }: TProps) => {
  const user = useSelector((state) => state.userAuth);
  const router = useRouter();
  return (
    <>
      {user.id == null ? (
        router.push("/auth")
      ) : (
        <div>
          <div className="py-20 text-center">
            <div className="flex flex-wrap justify-center items-center gap-x-5">
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HomePage;
