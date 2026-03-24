'use client';

import { confirmEventBooking } from '@/lib/actions/booking.actions';
import { FormEvent, useState } from 'react'

const EventBooking = ({eventId}: {eventId: string}) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e:FormEvent) => {
    e.preventDefault();

    const {success, message} = await confirmEventBooking({eventId, email});
    if(success) {
      setSubmitted(true);
    }
  }
  return (
    <div id='book-event'>
      {submitted ? (<p className='text-sm'>Thank you for signing up</p>) : (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="email">Email</label>
                <input type="email" id='email' placeholder='Enter your email' value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            
            <button>Submit</button>
        </form>
      )}
      
    </div>
  )
}

export default EventBooking
