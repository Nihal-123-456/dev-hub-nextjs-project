import { Event } from "@/database";
import connectDb from "@/lib/mogodb";
import { NextRequest, NextResponse } from "next/server";

interface RouteParams {
    params: Promise<{
        slug: string
    }>
}

export const GET = async (req:NextRequest, {params}:RouteParams):Promise<NextResponse> => {
    try {
        await connectDb();

        const {slug} = await params;

        if(!slug || typeof(slug) !== 'string' || slug.trim() === '') {
            return NextResponse.json({message: 'Invalid or missing slug parameter'}, {status: 400});
        }

        const sanitizedSlug = slug.trim().toLowerCase();

        const event = await Event.findOne({slug: sanitizedSlug}).lean();

        if(!event) {
            return NextResponse.json({message: 'Failed to find event'}, {status: 404});
        }

        return NextResponse.json({message: 'Event fetched successfully', event: event}, {status: 200});
    } catch(err) {
        if(process.env.NODE_ENV == 'development') {
            console.log('An error occured: ', err);
        }

        return NextResponse.json({message: 'Error fetching event details', error: err instanceof Error ? err : 'Unknown'}, {status: 500});
    }
}