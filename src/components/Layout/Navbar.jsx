import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { portfolioData } from '../../data/portfolio';
import { ThemeToggle } from '../UI/ThemeToggle';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass py-3' : 'bg-transparent py-5'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center gap-8">
                <Link to="/">
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="text-3xl md:text-4xl font-serif italic font-bold text-text cursor-pointer tracking-wide"
                    >
                        SSU
                    </motion.div>
                </Link>

                <div className="hidden lg:flex space-x-12 items-center">
                    {portfolioData.dockItems.map((item) => (
                        <Link
                            key={item.id}
                            to={item.to}
                            className={`text-sm font-medium transition-colors uppercase tracking-widest ${location.pathname === item.to ? 'text-text border-b-2 border-primary' : 'text-text-secondary hover:text-text'
                                }`}
                        >
                            {item.label}
                        </Link>
                    ))}

                    <ThemeToggle />
                </div>

                <div className="flex items-center gap-3">
                    <div className="lg:hidden">
                        <ThemeToggle />
                    </div>
                    <motion.a
                        href={portfolioData.personal.social.find(s => s.name === 'Resume')?.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="btn-primary text-xs md:text-sm px-4 md:px-6 py-2 md:py-3 whitespace-nowrap"
                    >
                        <span className="hidden sm:inline">Download CV</span>
                        <span className="sm:hidden">CV</span>
                    </motion.a>
                </div>
            </div>
        </motion.nav>
    );
};

export default Navbar;
