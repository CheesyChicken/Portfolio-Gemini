import emailjs from '@emailjs/browser';

emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY');

export const emailService = {
  sendContactMessage: async (formData) => {
    try {
      const result = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID',
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID',
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_name: 'Shubham',
        }
      );
      
      console.log('Email sent successfully:', result);
      return { status: 'success', message: 'Message sent successfully!' };
    } catch (error) {
      console.error('Email send failed:', error);
      return { status: 'error', message: 'Failed to send message. Please try again.' };
    }
  },

    sendBookingConfirmation: async (bookingData) => {
      try {
        const result = await emailjs.send(
          import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID',
          import.meta.env.VITE_EMAILJS_BOOKING_TEMPLATE_ID || 'YOUR_BOOKING_TEMPLATE_ID',
          {
            from_name: bookingData.name,
            from_email: bookingData.email,
            date: bookingData.date,
            time: bookingData.time,
            to_name: 'Shubham',
          }
        );
        
        console.log('Booking email sent:', result);
        return { status: 'success', message: 'Booking confirmed! Check your email.' };
      } catch (error) {
        console.error('Booking email failed:', error);
        return { status: 'error', message: 'Booking saved but email failed to send.' };
      }
    },

    sendCoffeeNotification: async (coffeeData) => {
      try {
        const result = await emailjs.send(
          import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID',
          import.meta.env.VITE_EMAILJS_COFFEE_TEMPLATE_ID || 'YOUR_COFFEE_TEMPLATE_ID',
          {
            from_name: coffeeData.name,
            from_email: coffeeData.email,
            amount: coffeeData.amount,
            message: coffeeData.message || 'No message',
            to_name: 'Shubham',
          }
        );
        
        console.log('Coffee notification sent:', result);
        return { status: 'success', message: 'Thank you for your support! ☕' };
      } catch (error) {
        console.error('Coffee notification failed:', error);
        return { status: 'error', message: 'Failed to process. Please try again.' };
      }
    }
  };
