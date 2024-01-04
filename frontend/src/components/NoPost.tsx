import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";

const NoPost = () => {
  return (
    <MaxWidthWrapper className="py-10">
      <div className="w-full flex flex-col justify-center items-center gap-y-5">
        <div className="text-5xl text-muted-foreground text-gray-700">
          No Posts in the DB
        </div>
        <Link
          className={cn("text-4xl", buttonVariants({ variant: "link" }))}
          href={"/write"}
        >
          Write a new Post
        </Link>
      </div>
    </MaxWidthWrapper>
  );
};

export default NoPost;
