import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { portfolioData } from '../data/portfolio';
import { ArrowRight, Code, Briefcase, Mail } from 'lucide-react';
import HomeScene from '../components/3d/HomeScene';

const Home = () => {
    return (
        <div className="relative min-h-screen pt-20 pb-32 overflow-hidden">
            <HomeScene />

            <div className="section-container flex flex-col justify-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-12 max-w-2xl relative"
                >
                    <h2 className="text-primary font-semibold mb-2 tracking-wide uppercase">
                        {portfolioData.personal.title}
                    </h2>
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                        Hello, I'm <br />
                        <span className="text-gradient">
                            {portfolioData.personal.name}
                        </span>
                    </h1>
                    <p className="text-xl text-gray-600 leading-relaxed">
                        {portfolioData.personal.bio}
                    </p>
                </motion.div>

                {/* Floating Avatar - Absolute Positioned */}
                <motion.img
                    src="/avatar_keyboard_surf.png"
                    alt="Coding Journey"
                    className="hidden md:block absolute right-[10%] top-[20%] w-64 h-64 drop-shadow-2xl z-10 pointer-events-none"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{
                        opacity: 1,
                        x: 0,
                        y: [0, -20, 0],
                        rotate: [0, 5, -5, 0]
                    }}
                    transition={{
                        y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                        rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                        default: { duration: 1 }
                    }}
                />

                {/* Bento Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">

                    {/* Intro Card */}
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="md:col-span-2 bg-white/50 backdrop-blur-xl p-8 rounded-3xl border border-white/20 shadow-xl relative overflow-hidden"
                    >
                        <motion.img
                            src="/avatar_thumbsup.png"
                            alt="Thumbs Up"
                            className="absolute top-4 right-4 w-20 h-20 opacity-80"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.5, type: "spring" }}
                        />
                        <h3 className="text-2xl font-bold mb-4">Full Stack Developer</h3>
                        <p className="text-gray-600 mb-6">
                            I build modern, responsive, and scalable web applications.
                            Passionate about creating intuitive user experiences and robust backend systems.
                        </p>
                        <div className="flex flex-wrap gap-2">
                            <span className="badge">React</span>
                            <span className="badge">Node.js</span>
                            <span className="badge">TypeScript</span>
                            <span className="badge">Tailwind CSS</span>
                            <span className="badge">MongoDB</span>
                        </div>
                    </motion.div>

                    {/* Projects Card */}
                    <Link to="/projects" className="md:col-span-1">
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="glass-panel p-8 h-64 flex flex-col justify-between relative overflow-hidden group"
                        >
                            <div className="absolute right-0 top-0 w-32 h-32 bg-primary/10 rounded-full -mr-10 -mt-10 blur-2xl transition-all group-hover:bg-primary/20" />

                            <div className="relative z-10">
                                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-4">
                                    <Code size={24} />
                                </div>
                                <h3 className="text-2xl font-bold mb-2">Projects</h3>
                                <p className="text-gray-500">Explore my latest work and experiments.</p>
                            </div>

                            <div className="flex items-center gap-2 text-primary font-medium">
                                View All <ArrowRight size={16} />
                            </div>
                        </motion.div>
                    </Link>

                    {/* Experience Card */}
                    <Link to="/experience" className="md:col-span-1">
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="glass-panel p-8 h-64 flex flex-col justify-between relative overflow-hidden group"
                        >
                            <div className="absolute right-0 top-0 w-32 h-32 bg-secondary/10 rounded-full -mr-10 -mt-10 blur-2xl transition-all group-hover:bg-secondary/20" />

                            <div className="relative z-10">
                                <div className="w-12 h-12 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary mb-4">
                                    <Briefcase size={24} />
                                </div>
                                <h3 className="text-2xl font-bold mb-2">Experience</h3>
                            </div>

                            <div className="flex items-center gap-2 text-secondary font-medium">
                                Timeline <ArrowRight size={16} />
                            </div>
                        </motion.div>
                    </Link>

                    {/* Contact Card */}
                    <Link to="/contact" className="md:col-span-1">
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="glass-panel p-8 h-64 flex flex-col justify-between relative overflow-hidden group"
                        >
                            <div className="absolute right-0 top-0 w-32 h-32 bg-accent/10 rounded-full -mr-10 -mt-10 blur-2xl transition-all group-hover:bg-accent/20" />

                            <div className="relative z-10">
                                <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center text-accent mb-4">
                                    <Mail size={24} />
                                </div>
                                <h3 className="text-2xl font-bold mb-2">Contact</h3>
                            </div>

                            <div className="flex items-center gap-2 text-accent font-medium">
                                Say Hi <ArrowRight size={16} />
                            </div>
                        </motion.div>
                    </Link>

                    {/* Resume Card */}
                    <a
                        href={portfolioData.personal.social.find(s => s.name === 'Resume')?.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="md:col-span-2"
                    >
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="glass-panel p-8 h-64 flex flex-col justify-center items-center text-center relative overflow-hidden group"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                            <h3 className="text-3xl font-bold mb-4">Download Resume</h3>
                            <p className="text-gray-500 mb-6 max-w-md">
                                Get a detailed overview of my skills, experience, and education in PDF format.
                            </p>
                            <span className="btn-primary">Download PDF</span>
                        </motion.div>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Home;
