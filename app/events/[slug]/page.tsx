import EventDetails from "@/components/EventDetails";
import { cacheLife } from "next/cache";

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  return <EventDetails slug={slug} />;
};

export default Page;
