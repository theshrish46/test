import React from "react";

type TPrpos = {
  children: React.ReactNode;
};

export default function Layout({ children }: TPrpos) {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      {children}
    </div>
  );
}
