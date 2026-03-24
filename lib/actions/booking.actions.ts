'use server';

import connectDb from "../mogodb"
import { Booking, Event } from "@/database";

export const confirmEventBooking = async ({eventId, email}: {eventId: string, email: string}) => {
    try {
        await connectDb();

        const event_exists = await Event.findById(eventId).select('_id');

        if(!event_exists) {
            return {success: false, message: 'Event does not exist'};
        }

        await Booking.create({eventId, email});
        return {success: true, message: 'Event booking successful'};
    } catch(err: any) {
        if (err.code === 11000) {
            return {success: false, message: 'Event already booked'};
        }
        return {success: false, message: 'Event booking failed'};
    }
}