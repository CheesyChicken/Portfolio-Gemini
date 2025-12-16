import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolio';
import { Mail, MapPin, Send, Calendar, Clock, Coffee, CheckCircle } from 'lucide-react';
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

    const availableSlots = bookingService.getAvailableSlots(selectedDate);

    const handleBooking = async (e) => {
        e.preventDefault();
        if (!selectedSlot || !formData.name || !formData.email || isSubmitting) return;

        setIsSubmitting(true);
        const result = bookingService.bookSlot(selectedDate, selectedSlot, {
            ...formData,
            type: 'meeting'
        });

        if (result.status === 'success') {
            await emailService.sendBookingConfirmation({
                ...formData,
                date: selectedDate.toISOString().split('T')[0],
                time: selectedSlot
            });
        }

        setBookingStatus(result);
        setIsSubmitting(false);
        
        if (result.status === 'success') {
            setTimeout(() => {
                setBookingStatus(null);
                setFormData({ name: '', email: '', message: '' });
                setSelectedSlot(null);
            }, 3000);
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
            setTimeout(() => setMessageStatus(null), 3000);
        }
    };

    const handleCoffee = () => {
        window.open('https://www.buymeacoffee.com/shubham', '_blank');
    };

    return (
        <div className="relative min-h-screen pt-32 pb-20 overflow-hidden">
            <ContactScene />

            <div className="section-container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12 text-center"
                >
                    <h2 className="text-5xl font-bold mb-4 text-text">Get In Touch</h2>
                    <p className="text-text-secondary max-w-2xl mx-auto text-lg leading-relaxed">
                        Let's build something amazing together. Book a time or just say hi!
                    </p>
                </motion.div>

                <div className="flex justify-center gap-4 mb-12 flex-wrap">
                    {['message', 'booking', 'coffee'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-6 py-2 rounded-full capitalize transition-all ${activeTab === tab
                                ? 'bg-primary text-white shadow-lg scale-105'
                                : 'bg-white dark:bg-surface text-text-secondary hover:bg-gray-100 dark:hover:bg-surface/80'
                                }`}
                        >
                            {tab === 'coffee' ? 'Buy me a Coffee' : tab}
                        </button>
                    ))}
                </div>

                <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="glass-panel p-8 h-full flex flex-col justify-center"
                    >
                        <div className="space-y-8">
                            <a href={`mailto:${portfolioData.personal.email}`} className="flex items-center gap-6 group">
                                <div className="w-14 h-14 rounded-2xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <p className="text-xs text-text-secondary uppercase tracking-widest mb-1">Email</p>
                                    <p className="font-medium text-xl text-text">{portfolioData.personal.email}</p>
                                </div>
                            </a>

                            <div className="flex items-center gap-6 group">
                                <motion.div
                                    whileHover={{ scale: 1.1, rotate: 10 }}
                                    className="w-20 h-20 flex items-center justify-center"
                                >
                                    <img src="/map_avatar.png" alt="Location Avatar" className="w-full h-full object-contain drop-shadow-lg" />
                                </motion.div>
                                <div>
                                    <p className="text-xs text-text-secondary uppercase tracking-widest mb-1">Location</p>
                                    <p className="font-medium text-xl text-text">{portfolioData.personal.location}</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                        className="glass-panel p-8"
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
                            <div className="space-y-6">
                                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2 text-text">
                                    <Calendar className="text-primary" /> Book a Slot
                                </h3>

                                {bookingStatus?.status === 'success' ? (
                                    <div className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 p-6 rounded-xl flex flex-col items-center gap-4 text-center">
                                        <motion.img
                                            src="/avatar_k.png"
                                            alt="OK"
                                            className="w-32 h-32"
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: "spring" }}
                                        />
                                        <div className="flex items-center gap-2 font-bold text-xl">
                                            <CheckCircle /> {bookingStatus.message}
                                        </div>
                                    </div>
                                ) : bookingStatus?.status === 'error' ? (
                                    <div className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 p-6 rounded-xl flex flex-col items-center gap-4 text-center">
                                        <motion.img
                                            src="/avatar_oops.png"
                                            alt="Oops"
                                            className="w-32 h-32"
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: "spring" }}
                                        />
                                        <div className="flex items-center gap-2 font-bold text-xl">
                                            {bookingStatus.message}
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <div>
                                            <label className="block text-sm font-medium text-text mb-2">Select Date</label>
                                            <input
                                                type="date"
                                                className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-background border border-border focus:border-primary outline-none text-text transition-colors"
                                                value={selectedDate.toISOString().split('T')[0]}
                                                onChange={(e) => setSelectedDate(new Date(e.target.value))}
                                                min={new Date().toISOString().split('T')[0]}
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-text mb-2">Available Slots</label>
                                            <div className="grid grid-cols-3 gap-2">
                                                {availableSlots.map(slot => (
                                                    <button
                                                        key={slot}
                                                        type="button"
                                                        onClick={() => setSelectedSlot(slot)}
                                                        className={`py-2 px-3 rounded-lg text-sm transition-all ${selectedSlot === slot
                                                            ? 'bg-primary text-white'
                                                            : 'bg-gray-100 dark:bg-background hover:bg-gray-200 dark:hover:bg-surface text-text'
                                                            }`}
                                                    >
                                                        {slot}
                                                    </button>
                                                ))}
                                                {availableSlots.length === 0 && <p className="text-sm text-text-secondary col-span-3">No slots available.</p>}
                                            </div>
                                        </div>

                                        <div className="space-y-4 pt-4 border-t border-border">
                                            <input
                                                type="text"
                                                placeholder="Your Name"
                                                className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-background border border-border focus:border-primary outline-none text-text transition-colors"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            />
                                            <input
                                                type="email"
                                                placeholder="Your Email"
                                                className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-background border border-border focus:border-primary outline-none text-text transition-colors"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            />
                                            <button
                                                type="button"
                                                onClick={handleBooking}
                                                disabled={!selectedSlot || !formData.name || !formData.email || isSubmitting}
                                                className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                {isSubmitting ? 'Booking...' : 'Confirm Booking'} <Clock size={18} />
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        )}

                        {activeTab === 'coffee' && (
                            <div className="text-center space-y-6 py-8">
                                <motion.div
                                    className="w-48 h-48 mx-auto relative"
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                >
                                    <img src="/coffee_avatar.png" alt="Coffee Avatar" className="w-full h-full object-contain drop-shadow-2xl" />
                                </motion.div>
                                <h3 className="text-2xl font-bold text-text">Fuel my creativity!</h3>
                                <p className="text-text-secondary leading-relaxed">
                                    If you like my work, consider buying me a coffee. It helps me keep building cool stuff.
                                </p>
                                <button
                                    onClick={handleCoffee}
                                    className="btn-primary mx-auto flex items-center gap-2"
                                >
                                    <Coffee size={20} />
                                    Buy Me a Coffee
                                </button>
                                <p className="text-xs text-text-secondary mt-4">
                                    You'll be redirected to Buy Me a Coffee
                                </p>
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
