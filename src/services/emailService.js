import emailjs from '@emailjs/browser';

emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY');

export const emailService = {
  sendContactMessage: async (formData) => {
    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      // Check if we are using placeholders or missing keys
      if (!serviceId || !templateId || !publicKey || serviceId === 'YOUR_SERVICE_ID') {
        console.warn('EmailJS keys are missing or default. Simulating success for demo.');
        console.log('Would have sent email:', formData);
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
        return { status: 'success', message: 'Message sent successfully! (Demo Mode)' };
      }

      const result = await emailjs.send(
        serviceId,
        templateId,
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
      // Check if we are using placeholders or missing keys
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_BOOKING_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey || serviceId === 'YOUR_SERVICE_ID') {
        console.warn('EmailJS keys are missing or default. Simulating success for demo.');
        console.log('Would have sent booking email:', bookingData);
        await new Promise(resolve => setTimeout(resolve, 1000));
        return { status: 'success', message: 'Booking confirmed! (Demo Mode)' };
      }

      const result = await emailjs.send(
        serviceId,
        templateId,
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
      // Check if we are using placeholders or missing keys
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_COFFEE_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey || serviceId === 'YOUR_SERVICE_ID') {
        console.warn('EmailJS keys are missing or default. Simulating success for demo.');
        console.log('Would have sent coffee notification:', coffeeData);
        await new Promise(resolve => setTimeout(resolve, 1000));
        return { status: 'success', message: 'Thank you for your support! ☕ (Demo Mode)' };
      }

      const result = await emailjs.send(
        serviceId,
        templateId,
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
