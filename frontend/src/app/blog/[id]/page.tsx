import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import BlogComponent from "@/components/BlogComponent";

export default function ({ params }: { params: { id: number } }) {
  const blodId = params.id;
  // const user = useSelector((state) => state.userAuth);
  return (
    <div className="my-10">
      <MaxWidthWrapper>
        <BlogComponent id={blodId} />
      </MaxWidthWrapper>
    </div>
  );
}
