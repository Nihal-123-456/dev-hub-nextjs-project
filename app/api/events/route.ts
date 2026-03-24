import { NextRequest, NextResponse } from "next/server";
import connectDb from "@/lib/mogodb";
import { Event } from "@/database";
import { v2 as cloudinary } from "cloudinary";

export const POST = async(req:NextRequest) => {
    try {
        await connectDb();
        const formData = await req.formData();

        let event;
        try{
            event = Object.fromEntries(formData.entries());
        } catch(e) {
            return NextResponse.json({message: 'Invalid data format'}, {status: 400});
        }
        
        const file = formData.get('image') as File;
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const uploadResult = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({resource_type: 'image', folder: 'devEvent'}, (error, results) => {
                if(error) return reject(error);
                resolve(results);
            }).end(buffer)
        })

        event.image = (uploadResult as {secure_url: string}).secure_url;
        event.tags = JSON.parse(formData.get('tags') as string);
        event.agenda = JSON.parse(formData.get('agenda') as string);

        const createdEvent = await Event.create(event);
        return NextResponse.json({message: 'Event created successfully', event: createdEvent}, {status: 201});
    } catch(e) {
        return NextResponse.json({message: 'Failed to create Event', error: e instanceof Error ? e.message : 'Unknown'}, {status: 500});
    }
}

export const GET = async(req:NextRequest) => {
    try{
        await connectDb();

        const events = await Event.find().sort({createdAt: -1});
        return NextResponse.json({message: 'Events fetched successfully', events: events}, {status: 200});
    } catch(e){
        return NextResponse.json({message: "Failed to fetch events", error: e instanceof Error ? e : 'Unknown'}, {status: 500});
    }
}