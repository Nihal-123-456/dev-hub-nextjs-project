import EventDetails from "@/components/EventDetails";
import { cacheLife } from "next/cache";
import { Suspense } from "react";

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EventDetails slug={slug} />;
    </Suspense>
  );
};

export default Page;
