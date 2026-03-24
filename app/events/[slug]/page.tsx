import EventDetails from "@/components/EventDetails";

const Page = async ({params} : {params: Promise<{slug: string}>}) => {
  const {slug} = await params;
  return <EventDetails slug={slug}/>
}

export default Page