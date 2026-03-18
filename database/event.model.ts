import { Document, Schema, model, models } from "mongoose";
import slugify from "slugify";

export interface IEvent extends Document {
    title: string;
    slug: string;
    description: string;
    overview: string;
    image: string;
    venue: string;
    location: string;
    date: string;
    time: string;
    mode: string;
    audience: string;
    agenda: string[];
    organizer: string;
    tags: string[];
    createdAt: Date;
    updatedAt: Date;
}

const EventSchema = new Schema<IEvent>({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
        maxlength: [100, 'Title cannot exceed 100 characters']
    },
    slug: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true,
    },
    overview: {
        type: String,
        required: [true, 'Overview is required'],
        trim: true,
        maxlength: [500, 'Overview cannot exceed 500 characters']
    },
    image: {
        type: String,
        required: [true, 'Image is required'],
        trim: true,
    },
    venue: {
        type: String,
        required: [true, 'Venue is required'],
        trim: true,
    },
    location: {
        type: String,
        required: [true, 'Location is required'],
        trim: true,
    },
    date: {
        type: String,
        required: [true, 'Date is required'],
        trim: true,
    },
    time: {
        type: String,
        required: [true, 'Time is required'],
        trim: true,
    },
    mode: {
        type: String,
        required: [true, 'Mode is required'],
        trim: true,
        enum: {
            values: ['online', 'offline', 'hybrid'],
            message: 'Mode must be either online, offline or hybrid'
        }
    },
    audience: {
        type: String,
        required: [true, 'Audience is required'],
        trim: true,
    },
    agenda: {
        type: [String],
        required: [true, 'Agendas are required'],
        validate: {
            validator: (v:string[])=> v.length > 0, message: 'At least one agenda is required'
        }
    },
    organizer: {
        type: String,
        required: [true, 'Organizer name is required'],
        trim: true,
    },
    tags: {
        type: [String],
        required: [true, 'Tags are required'],
        validate: {
            validator: (v:string[])=> v.length > 0, message: 'At least one tag is required'
        }
    },
}, {timestamps: true})

EventSchema.pre('save', async function() {
    const event = this as IEvent;
    if(event.isModified('title') || event.isNew) {
        const baseSlug = slugify(event.title, {lower: true});
        event.slug = `${baseSlug}-${event._id.toString().slice(-6)}`
    }
})

EventSchema.index({date: 1, mode: 1});

const Event = models.Event || model<IEvent>('Event', EventSchema);

export default Event