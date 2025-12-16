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
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                <Link to="/">
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="text-2xl font-bold text-text cursor-pointer tracking-tighter"
                    >
                        {portfolioData.personal.name}
                    </motion.div>
                </Link>

                <div className="hidden md:flex space-x-8 items-center">
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

                <motion.a
                    href={portfolioData.personal.social.find(s => s.name === 'Resume')?.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-primary"
                >
                    Download CV
                </motion.a>
            </div>
        </motion.nav>
    );
};

export default Navbar;
