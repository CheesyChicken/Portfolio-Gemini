import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolio';
import { Mail, MapPin, Send, Calendar, Clock, Coffee, CheckCircle } from 'lucide-react';
import { InlineWidget } from 'react-calendly';

import ContactScene from '../components/3d/ContactScene';
import { bookingService } from '../services/bookingService';
import { emailService } from '../services/emailService';

const Contact = () => {
    const [activeTab, setActiveTab] = useState('message');
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [bookingStatus, setBookingStatus] = useState(null);
    const [messageStatus, setMessageStatus] = useState(null);
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [lastBooking, setLastBooking] = useState(null);
    const [coffeeData, setCoffeeData] = useState({ name: '', email: '', amount: '5', message: '' });
    const [coffeeStatus, setCoffeeStatus] = useState(null);

    const calendlyUrl = import.meta.env.VITE_CALENDLY_URL || 'https://calendly.com/ubheshubham/30min';

    const availableSlots = bookingService.getAvailableSlots(selectedDate);

    const buildGoogleCalendarLink = (booking) => {
        if (!booking) return null;

        const [hour, minute] = booking.time.split(':').map(Number);
        const start = new Date(booking.date);
        start.setHours(hour, minute, 0, 0);
        const end = new Date(start.getTime() + 30 * 60 * 1000);

        const format = (dateObj) => dateObj.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
        const text = encodeURIComponent('Meeting with Shubham');
        const details = encodeURIComponent(`Booked via portfolio site\nName: ${booking.name}\nEmail: ${booking.email}`);
        const dates = `${format(start)}/${format(end)}`;
        const location = encodeURIComponent('Google Meet (share link by email)');

        return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${dates}&details=${details}&location=${location}`;
    };

    const handleBooking = async (e) => {
        e.preventDefault();
        if (!selectedSlot || !formData.name || !formData.email || isSubmitting) return;

        setIsSubmitting(true);
        const bookingDetails = {
            ...formData,
            date: selectedDate.toISOString(),
            time: selectedSlot,
            type: 'meeting'
        };

        const result = bookingService.bookSlot(selectedDate, selectedSlot, bookingDetails);

        if (result.status === 'success') {
            setLastBooking(bookingDetails);
            await emailService.sendBookingConfirmation({
                ...formData,
                date: selectedDate.toISOString().split('T')[0],
                time: selectedSlot
            });
        }

        setBookingStatus(result);
        if (result.status !== 'success') {
            setLastBooking(null);
        }
        setIsSubmitting(false);

        if (result.status === 'success') {
            // No auto-dismissal
            // form data reset is optional, keeping it here so if they go back it's clean, 
            // but for now let's just keep status.
        }
    };

    const handleMessage = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;

        const name = e.target[0].value;
        const email = e.target[1].value;
        const message = e.target[2].value;

        if (!name || !email || !message) {
            setMessageStatus({ status: 'error', message: 'Please fill in all fields' });
            return;
        }

        setIsSubmitting(true);
        const result = await emailService.sendContactMessage({ name, email, message });
        setMessageStatus(result);
        setIsSubmitting(false);

        if (result.status === 'success') {
            e.target.reset();
            // timeouts removed 
        }
    };

    const handleCoffee = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;

        const { name, email, amount, message } = coffeeData;
        if (!name || !email || !amount) {
            setCoffeeStatus({ status: 'error', message: 'Please fill in all required fields' });
            return;
        }

        setIsSubmitting(true);
        const result = await emailService.sendCoffeeNotification({ name, email, amount, message });
        setCoffeeStatus(result);
        setIsSubmitting(false);

        // No auto-dismissal
    };

    return (
        <div className="relative min-h-screen pt-32 pb-20 overflow-hidden">
            <ContactScene />

            <div className="section-container px-4 md:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8 md:mb-12 text-center"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4 text-text">Get In Touch</h2>
                    <p className="text-text-secondary max-w-2xl mx-auto text-base md:text-lg leading-relaxed px-4">
                        Let's build something amazing together. Book a time or just say hi!
                    </p>
                </motion.div>

                <div className="flex justify-center gap-3 md:gap-4 mb-8 md:mb-12 flex-wrap px-4">
                    {['message', 'booking', 'coffee'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 md:px-6 py-2 rounded-full capitalize transition-all text-sm md:text-base ${activeTab === tab
                                ? 'bg-primary text-white shadow-lg scale-105'
                                : 'bg-white dark:bg-surface text-text-secondary hover:bg-gray-100 dark:hover:bg-surface/80'
                                }`}
                        >
                            {tab === 'coffee'
                                ? 'Buy Me a Coffee'
                                : tab === 'message'
                                    ? 'Message'
                                    : 'Booking'}
                        </button>
                    ))}

                </div>

                <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="glass-panel p-6 md:p-8 h-full flex flex-col justify-center"
                    >
                        <div className="space-y-6 md:space-y-8">
                            <a href={`mailto:${portfolioData.personal.email}`} className="flex items-center gap-4 md:gap-6 group">
                                <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 flex-shrink-0">
                                    <Mail size={20} className="md:w-6 md:h-6" />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-xs text-text-secondary uppercase tracking-widest mb-1">Email</p>
                                    <p className="font-medium text-base md:text-xl text-text break-all">{portfolioData.personal.email}</p>
                                </div>
                            </a>

                            <div className="flex items-center gap-4 md:gap-6 group">
                                <motion.div
                                    whileHover={{ scale: 1.1, rotate: 10 }}
                                    className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center flex-shrink-0"
                                >
                                    <img src="/map_avatar.png" alt="Location Avatar" className="w-full h-full object-contain drop-shadow-lg" />
                                </motion.div>
                                <div className="min-w-0">
                                    <p className="text-xs text-text-secondary uppercase tracking-widest mb-1">Location</p>
                                    <p className="font-medium text-base md:text-xl text-text">{portfolioData.personal.location}</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                        className="glass-panel p-6 md:p-8"
                    >
                        {activeTab === 'message' && (
                            <form className="space-y-6" onSubmit={handleMessage}>
                                <div className="group">
                                    <label className="block text-sm font-medium text-text mb-2">Name</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-background border border-border focus:border-primary outline-none text-text transition-colors"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div className="group">
                                    <label className="block text-sm font-medium text-text mb-2">Email</label>
                                    <input
                                        type="email"
                                        className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-background border border-border focus:border-primary outline-none text-text transition-colors"
                                        placeholder="john@example.com"
                                    />
                                </div>
                                <div className="group">
                                    <label className="block text-sm font-medium text-text mb-2">Message</label>
                                    <textarea
                                        rows={4}
                                        className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-background border border-border focus:border-primary outline-none resize-none text-text transition-colors"
                                        placeholder="Your message..."
                                    />
                                </div>
                                {messageStatus && (
                                    <div className={`p-4 rounded-xl text-center ${messageStatus.status === 'success' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'}`}>
                                        {messageStatus.message}
                                    </div>
                                )}
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? 'Sending...' : 'Send Message'} <Send size={18} />
                                </button>
                            </form>
                        )}

                        {activeTab === 'booking' && (
                            <div className="h-[600px] w-full overflow-hidden rounded-2xl bg-white dark:bg-neutral-900 border border-border">
                                <InlineWidget
                                    url={calendlyUrl}
                                    styles={{
                                        height: '100%',
                                        width: '100%'
                                    }}
                                    pageSettings={{
                                        backgroundColor: '111827',
                                        hideEventTypeDetails: false,
                                        hideLandingPageDetails: false,
                                        primaryColor: '3b82f6',
                                        textColor: 'ffffff'
                                    }}
                                />
                            </div>
                        )}


                        {activeTab === 'coffee' && (
                            <div className="space-y-6">
                                <div className="text-center">
                                    <motion.div
                                        className="w-32 h-32 mx-auto relative mb-4"
                                        animate={{ y: [0, -10, 0] }}
                                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                    >
                                        <img src="/coffee_avatar.png" alt="Coffee Avatar" className="w-full h-full object-contain drop-shadow-2xl" />
                                    </motion.div>
                                    <h3 className="text-2xl font-bold text-text flex items-center justify-center gap-2">
                                        <Coffee className="text-primary" /> Buy Me a Coffee
                                    </h3>
                                    <p className="text-text-secondary text-sm mt-2">
                                        Support my work and fuel my creativity!
                                    </p>
                                </div>

                                {coffeeStatus?.status === 'success' ? (
                                    <div className="bg-white dark:bg-surface border border-border p-6 rounded-xl flex flex-col items-center gap-4 text-center">
                                        <div className="w-48 h-48 bg-white p-2 rounded-xl shadow-lg">
                                            <img
                                                src="/upi_qr.png"
                                                alt="UPI QR Code"
                                                className="w-full h-full object-contain"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <h4 className="font-bold text-xl text-text">Scan to Pay ₹{coffeeData.amount * 85}</h4>
                                            <p className="text-sm text-text-secondary">or use UPI ID</p>
                                            <div className="bg-gray-100 dark:bg-neutral-800 px-4 py-2 rounded-lg font-mono text-sm text-primary select-all">
                                                ubheshubham.37@okhdfcbank
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 text-green-600 font-medium mt-2">
                                            <CheckCircle size={18} /> Pledge sent! Complete payment above.
                                        </div>
                                        <button
                                            onClick={() => {
                                                setCoffeeStatus(null);
                                                setCoffeeData({ name: '', email: '', amount: '5', message: '' });
                                            }}
                                            className="text-sm text-text-secondary hover:text-primary underline mt-4"
                                        >
                                            Back to Payment
                                        </button>
                                    </div>
                                ) : (
                                    <form className="space-y-4" onSubmit={handleCoffee}>
                                        <div>
                                            <label className="block text-sm font-medium text-text mb-2">Name *</label>
                                            <input
                                                type="text"
                                                className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-background border border-border focus:border-primary outline-none text-text transition-colors"
                                                placeholder="Your name"
                                                value={coffeeData.name}
                                                onChange={(e) => setCoffeeData({ ...coffeeData, name: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-text mb-2">Email *</label>
                                            <input
                                                type="email"
                                                className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-background border border-border focus:border-primary outline-none text-text transition-colors"
                                                placeholder="your@email.com"
                                                value={coffeeData.email}
                                                onChange={(e) => setCoffeeData({ ...coffeeData, email: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-text mb-2">Amount ($) *</label>
                                            <div className="grid grid-cols-4 gap-2 mb-2">
                                                {['3', '5', '10', '20'].map((amt) => (
                                                    <button
                                                        key={amt}
                                                        type="button"
                                                        onClick={() => setCoffeeData({ ...coffeeData, amount: amt })}
                                                        className={`py-2 px-3 rounded-lg text-sm transition-all ${coffeeData.amount === amt
                                                            ? 'bg-primary text-white'
                                                            : 'bg-gray-100 dark:bg-background hover:bg-gray-200 dark:hover:bg-surface text-text'
                                                            }`}
                                                    >
                                                        ${amt}
                                                    </button>
                                                ))}
                                            </div>
                                            <input
                                                type="number"
                                                min="1"
                                                className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-background border border-border focus:border-primary outline-none text-text transition-colors"
                                                placeholder="Custom amount"
                                                value={coffeeData.amount}
                                                onChange={(e) => setCoffeeData({ ...coffeeData, amount: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-text mb-2">Message (optional)</label>
                                            <textarea
                                                rows={3}
                                                className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-background border border-border focus:border-primary outline-none resize-none text-text transition-colors"
                                                placeholder="Say something nice..."
                                                value={coffeeData.message}
                                                onChange={(e) => setCoffeeData({ ...coffeeData, message: e.target.value })}
                                            />
                                        </div>
                                        {coffeeStatus?.status === 'error' && (
                                            <div className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 p-4 rounded-xl text-center text-sm">
                                                {coffeeStatus.message}
                                            </div>
                                        )}
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {isSubmitting ? 'Processing...' : `Support with $${coffeeData.amount || '0'}`}
                                            <Coffee size={18} />
                                        </button>
                                        <p className="text-xs text-text-secondary text-center mt-2">
                                            This is a demo form. No actual payment will be processed.
                                        </p>
                                    </form>
                                )}
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
