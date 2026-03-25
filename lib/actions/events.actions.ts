"use server";

import { Event } from "@/database";
import connectDb from "../mogodb";
import { cacheLife } from "next/cache";

export const getSimilarEvents = async (slug: string) => {
  "use cache";
  cacheLife("hours");

  try {
    await connectDb();

    const event = await Event.findOne({ slug: slug });
    return await Event.find({
      _id: { $ne: event._id },
      tags: { $in: event.tags },
    }).lean();
  } catch (err) {
    return [];
  }
};
