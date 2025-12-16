import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolio';
import { Mail, MapPin, Send, Calendar, Clock, Coffee, CheckCircle } from 'lucide-react';
import ContactScene from '../components/3d/ContactScene';
import { bookingService } from '../services/bookingService';

const Contact = () => {
    const [activeTab, setActiveTab] = useState('message'); // 'message', 'booking', 'coffee'
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [bookingStatus, setBookingStatus] = useState(null);
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });

    const availableSlots = bookingService.getAvailableSlots(selectedDate);

    const handleBooking = (e) => {
        e.preventDefault();
        if (!selectedSlot || !formData.name || !formData.email) return;

        const result = bookingService.bookSlot(selectedDate, selectedSlot, {
            ...formData,
            type: 'meeting'
        });

        setBookingStatus(result);
        if (result.status === 'success') {
            setTimeout(() => setBookingStatus(null), 3000);
            setFormData({ name: '', email: '', message: '' });
            setSelectedSlot(null);
        }
    };

    const handleMessage = (e) => {
        e.preventDefault();
        const name = e.target[0].value;
        const email = e.target[1].value;
        const message = e.target[2].value;

        if (!name || !email || !message) return;

        const result = bookingService.sendMessage({ name, email, message });
        alert(result.message);
        e.target.reset();
    };

    const handleCoffee = (amount) => {
        const result = bookingService.sendCoffee(amount, { ...formData, type: 'coffee' });
        alert(result.message);
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
                    <h2 className="text-5xl font-bold mb-4">Get In Touch</h2>
                    <p className="text-gray-500 max-w-2xl mx-auto">
                        Let's build something amazing together. Book a time or just say hi!
                    </p>
                </motion.div>

                {/* Tab Navigation */}
                <div className="flex justify-center gap-4 mb-12">
                    {['message', 'booking', 'coffee'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-6 py-2 rounded-full capitalize transition-all ${activeTab === tab
                                ? 'bg-primary text-white shadow-lg scale-105'
                                : 'bg-white text-gray-600 hover:bg-gray-100'
                                }`}
                        >
                            {tab === 'coffee' ? 'Buy me a Coffee' : tab}
                        </button>
                    ))}
                </div>

                <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                    {/* Contact Info (Always Visible) */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="glass-panel p-8 h-full flex flex-col justify-center"
                    >
                        <div className="space-y-8">
                            <a href={`mailto:${portfolioData.personal.email}`} className="flex items-center gap-6 group">
                                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Email</p>
                                    <p className="font-medium text-xl">{portfolioData.personal.email}</p>
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
                                    <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Location</p>
                                    <p className="font-medium text-xl">{portfolioData.personal.location}</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Dynamic Form Section */}
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
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                                    <input type="text" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-primary outline-none" placeholder="John Doe" />
                                </div>
                                <div className="group">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                    <input type="email" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-primary outline-none" placeholder="john@example.com" />
                                </div>
                                <div className="group">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                                    <textarea rows={4} className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-primary outline-none resize-none" placeholder="Your message..." />
                                </div>
                                <button className="btn-primary w-full flex items-center justify-center gap-2">
                                    Send Message <Send size={18} />
                                </button>
                            </form>
                        )}

                        {activeTab === 'booking' && (
                            <div className="space-y-6">
                                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                                    <Calendar className="text-primary" /> Book a Slot
                                </h3>

                                {bookingStatus?.status === 'success' ? (
                                    <div className="bg-green-100 text-green-700 p-6 rounded-xl flex flex-col items-center gap-4 text-center">
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
                                    <div className="bg-red-100 text-red-700 p-6 rounded-xl flex flex-col items-center gap-4 text-center">
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
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Select Date</label>
                                            <input
                                                type="date"
                                                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-primary outline-none"
                                                value={selectedDate.toISOString().split('T')[0]}
                                                onChange={(e) => setSelectedDate(new Date(e.target.value))}
                                                min={new Date().toISOString().split('T')[0]}
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Available Slots</label>
                                            <div className="grid grid-cols-3 gap-2">
                                                {availableSlots.map(slot => (
                                                    <button
                                                        key={slot}
                                                        onClick={() => setSelectedSlot(slot)}
                                                        className={`py-2 px-3 rounded-lg text-sm transition-all ${selectedSlot === slot
                                                            ? 'bg-primary text-white'
                                                            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                                                            }`}
                                                    >
                                                        {slot}
                                                    </button>
                                                ))}
                                                {availableSlots.length === 0 && <p className="text-sm text-gray-500 col-span-3">No slots available.</p>}
                                            </div>
                                        </div>

                                        <div className="space-y-4 pt-4 border-t border-gray-100">
                                            <input
                                                type="text"
                                                placeholder="Your Name"
                                                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-primary outline-none"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            />
                                            <input
                                                type="email"
                                                placeholder="Your Email"
                                                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-primary outline-none"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            />
                                            <button
                                                onClick={handleBooking}
                                                disabled={!selectedSlot || !formData.name || !formData.email}
                                                className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                Confirm Booking <Clock size={18} />
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
                                <h3 className="text-2xl font-bold">Fuel my creativity!</h3>
                                <p className="text-gray-500">
                                    If you like my work, consider buying me a coffee. It helps me keep building cool stuff.
                                </p>
                                <div className="flex justify-center gap-4">
                                    {[1, 3, 5].map(amount => (
                                        <button
                                            key={amount}
                                            onClick={() => handleCoffee(amount)}
                                            className="w-16 h-16 rounded-2xl border-2 border-orange-200 flex flex-col items-center justify-center hover:bg-orange-50 hover:border-orange-500 transition-all"
                                        >
                                            <span className="text-xl font-bold">${amount}</span>
                                            <span className="text-xs text-orange-500">Coffee</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
