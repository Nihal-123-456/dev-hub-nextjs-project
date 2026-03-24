import { model, Schema, Document, Types, models } from "mongoose";

export interface IBooking extends Document {
    eventId: Types.ObjectId;
    email: string;
    createdAt: Date;
    updatedAt: Date;
}

const BookingSchema = new Schema<IBooking>({
    eventId: {
        type: Schema.Types.ObjectId,
        required: [true, 'Event Id is required'],
        ref: 'Event'
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        lowercase: true,
        validate: {
            validator: (email:string) => {
                const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
                return regex.test(email);
            },
            message: "Invalid Email"
        }
    }
}, {timestamps: true})

// check whether a dev-event exists before creating a booking in the apis

BookingSchema.index({eventId: 1});
BookingSchema.index({eventId: 1, email: 1}, {unique: true});

const Booking = models.Booking || model<IBooking>('Booking', BookingSchema);

export default Booking