import CardComponent from "@/components/CardComponent";
import HomePage from "@/components/HomePage";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

export default function Home() {
  return (
    <main>
      <MaxWidthWrapper>
        <HomePage>
          <CardComponent className={"my-10"} />
        </HomePage>
      </MaxWidthWrapper>
    </main>
  );
}
