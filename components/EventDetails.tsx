import { notFound } from "next/navigation";
import Image from "next/image";
import EventBooking from "@/components/EventBooking";
import { getSimilarEvents } from "@/lib/actions/events.actions";
import { IEvent } from "@/database";
import EventCard from "@/components/EventCard";

const base_url = process.env.NEXT_PUBLIC_BASE_URL;
const bookings = 10;

const EventDetailsItems = ({icon, alt, label}:{icon: string, alt: string, label: string}) => {
  return(
    <div className="flex-row-gap-2">
      <Image src={icon} alt={alt} width={17} height={17}/>
      <p>{label}</p>
    </div>
  )
}

const EventAgenda = ({agendas}:{agendas:string[]}) => {
  return (
    <div className="agenda">
      <h2>Event Agenda</h2>

      <ul>
        {agendas.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  )
}

const EventTags = ({tags}:{tags: string[]}) => {
  return(
    <div className="flex gap-2 flex-wrap">
      {tags.map((item) => (
        <div key={item} className="pill">{item}</div>
      ))}
    </div>
  )
}

const EventDetails = async ({slug}:{slug:string}) => {
  const response = await fetch(`${base_url}/api/events/${slug}`);
  const {event} = await response.json();

  if(!event) { return notFound() }

  const {title, description, overview, image, venue, location, date, time, mode, audience, agenda, organizer, tags} = event;

  const similarEvents:IEvent[] = await getSimilarEvents(slug);

  return (
    <section id="event">
      <div className="header">
        <h1>Event Description</h1>
        <p>{description}</p> 
      </div>

      <div className="details">
        <div className="content">
          <Image src={image} alt="Banner Image" width={800} height={800} className="banner"/>

          <section className="flex-col-gap-2">
            <h2>Overview</h2>
            <p>{overview}</p>
          </section>

          <section className="flex-col-gap-2">
            <h2>Event Details</h2>

            <EventDetailsItems icon="/icons/calendar.svg" alt="date" label={date}/>
            <EventDetailsItems icon="/icons/clock.svg" alt="time" label={time}/>
            <EventDetailsItems icon="/icons/pin.svg" alt="location" label={`${location}, ${venue}`}/>
            <EventDetailsItems icon="/icons/mode.svg" alt="mode" label={mode}/>
            <EventDetailsItems icon="/icons/audience.svg" alt="audience" label={audience}/>
          </section>

          <EventAgenda agendas={agenda}/>

          <section className="flex-col-gap-2">
            <h2>About the Organizer</h2>
            <p>{organizer}</p>
          </section>

          <EventTags tags={tags}/>
        </div>
        <aside className="booking">
          <div className="signup-card">
            <h2>Book your spot</h2>
            {bookings > 0 ? (<p className="text-sm">
              Join {bookings} people who have already booked their spot
            </p>): <p className="text-sm">Be the first to book your spot</p>}
            <EventBooking eventId={event._id}/>
          </div>
        </aside>
      </div>

      <div className="flex flex-col gap-4 pt-20">
        <h2>Similar Events</h2>
        <div className="events">
          {similarEvents.length > 0 && similarEvents.map((e:IEvent) => (
            <EventCard key={e.slug} {...e}/>
          ))}
        </div>
      </div>
    </section>
  )
}

export default EventDetails
