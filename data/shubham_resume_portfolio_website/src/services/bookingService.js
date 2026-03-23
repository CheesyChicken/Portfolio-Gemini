export const bookingService = {
    // Get available slots for a given date
    getAvailableSlots: (date) => {
        const dateStr = date.toISOString().split('T')[0];
        const storedBookings = JSON.parse(localStorage.getItem('bookings') || '{}');
        const dayBookings = storedBookings[dateStr] || [];

        // Generate slots from 9 AM to 5 PM
        const allSlots = [
            '09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00'
        ];

        return allSlots.filter(slot => !dayBookings.includes(slot));
    },

    // Book a slot
    bookSlot: (date, time, details) => {
        const dateStr = date.toISOString().split('T')[0];
        const storedBookings = JSON.parse(localStorage.getItem('bookings') || '{}');

        if (!storedBookings[dateStr]) {
            storedBookings[dateStr] = [];
        }

        if (storedBookings[dateStr].includes(time)) {
            return { status: 'error', message: 'Slot already booked' };
        }

        storedBookings[dateStr].push(time);
        localStorage.setItem('bookings', JSON.stringify(storedBookings));

        // Log activity
        bookingService.logActivity({
            type: 'booking',
            date: dateStr,
            time,
            details
        });

        // Simulate sending email notification
        bookingService.sendNotification(details, dateStr, time);

        return { status: 'success', message: 'Booking confirmed!' };
    },

    // Send a message
    sendMessage: (details) => {
        bookingService.logActivity({
            type: 'message',
            date: new Date().toISOString().split('T')[0],
            time: new Date().toLocaleTimeString(),
            details
        });

        console.log(`--- MESSAGE SENT: ${details.message} ---`);
        return { status: 'success', message: 'Message sent successfully!' };
    },

    // Send coffee
    sendCoffee: (amount, details) => {
        bookingService.logActivity({
            type: 'coffee',
            amount,
            date: new Date().toISOString().split('T')[0],
            time: new Date().toLocaleTimeString(),
            details
        });

        console.log(`--- COFFEE RECEIVED: $${amount} ---`);
        return { status: 'success', message: `Thanks for the $${amount} coffee!` };
    },

    // Log all activities to a central "database"
    logActivity: (activity) => {
        const activities = JSON.parse(localStorage.getItem('activities') || '[]');
        activities.push({ ...activity, timestamp: new Date().toISOString() });
        localStorage.setItem('activities', JSON.stringify(activities));
        console.log('Activity Logged:', activity);
    },

    // Simulate email notification
    sendNotification: (details, date, time) => {
        console.log(`
      --- EMAIL NOTIFICATION SYSTEM ---
      To: ${details.email}
      Subject: ${details.type === 'coffee' ? 'Coffee Received!' : 'Booking Confirmation'}
      
      Dear ${details.name || 'Friend'},
      
      ${details.type === 'booking'
                ? `Your meeting is confirmed for ${date} at ${time}.`
                : `Thanks for the support! We received your request.`}
      
      ---------------------------------
    `);
    }
};
