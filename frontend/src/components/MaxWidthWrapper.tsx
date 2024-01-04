// "use client";
import { cn } from "@/lib/utils";
import React from "react";

type TProps = {
  children: React.ReactNode;
  className?: string;
};

const MaxWidthWrapper = ({ children, className }: TProps) => {
  return (
    <div className={cn(className, "mx-auto w-full max-w-5xl px-2.5 md:px-20")}>
      {children}
    </div>
  );
};

export default MaxWidthWrapper;
