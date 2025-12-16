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
                    className="mb-12 max-w-3xl relative"
                >
                    <h2 className="text-primary font-semibold mb-3 tracking-wide uppercase text-sm md:text-base">
                        {portfolioData.personal.title}
                    </h2>
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                        Hello, I'm <br />
                        <span className="text-gradient">
                            {portfolioData.personal.name}
                        </span>
                    </h1>
                    <p className="text-xl md:text-2xl text-text-secondary leading-relaxed">
                        {portfolioData.personal.bio}
                    </p>
                </motion.div>

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

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto">

                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="md:col-span-2 glass-panel p-6 md:p-8 relative overflow-hidden"
                    >
                        <motion.img
                            src="/avatar_thumbsup.png"
                            alt="Thumbs Up"
                            className="absolute top-2 right-2 md:top-4 md:right-4 w-16 h-16 md:w-20 md:h-20 opacity-80"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.5, type: "spring" }}
                        />
                        <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-text">AI Agent Architect</h3>
                        <p className="text-text-secondary mb-4 md:mb-6 leading-relaxed text-sm md:text-base">
                            I build intelligent systems with LLMs and GenAI.
                            Passionate about creating autonomous agents and scalable data pipelines.
                        </p>
                        <div className="flex flex-wrap gap-2">
                            <span className="badge">Python</span>
                            <span className="badge">LangChain</span>
                            <span className="badge">GenAI</span>
                            <span className="badge">AWS</span>
                            <span className="badge">React</span>
                        </div>
                    </motion.div>

                    <Link to="/projects" className="md:col-span-1">
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="glass-panel p-6 md:p-8 h-56 md:h-64 flex flex-col justify-between relative overflow-hidden group"
                        >
                            <div className="absolute right-0 top-0 w-24 h-24 md:w-32 md:h-32 bg-primary/10 rounded-full -mr-8 md:-mr-10 -mt-8 md:-mt-10 blur-2xl transition-all group-hover:bg-primary/20" />

                            <div className="relative z-10">
                                <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 dark:bg-primary/20 rounded-2xl flex items-center justify-center text-primary mb-3 md:mb-4">
                                    <Code size={20} className="md:w-6 md:h-6" />
                                </div>
                                <h3 className="text-xl md:text-2xl font-bold mb-2 text-text">Projects</h3>
                                <p className="text-text-secondary text-sm md:text-base">Explore my latest work and experiments.</p>
                            </div>

                            <div className="flex items-center gap-2 text-primary font-medium text-sm md:text-base">
                                View All <ArrowRight size={16} />
                            </div>
                        </motion.div>
                    </Link>

                    <Link to="/experience" className="md:col-span-1">
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="glass-panel p-6 md:p-8 h-56 md:h-64 flex flex-col justify-between relative overflow-hidden group"
                        >
                            <div className="absolute right-0 top-0 w-24 h-24 md:w-32 md:h-32 bg-secondary/10 rounded-full -mr-8 md:-mr-10 -mt-8 md:-mt-10 blur-2xl transition-all group-hover:bg-secondary/20" />

                            <div className="relative z-10">
                                <div className="w-10 h-10 md:w-12 md:h-12 bg-secondary/10 dark:bg-secondary/20 rounded-2xl flex items-center justify-center text-secondary mb-3 md:mb-4">
                                    <Briefcase size={20} className="md:w-6 md:h-6" />
                                </div>
                                <h3 className="text-xl md:text-2xl font-bold mb-2 text-text">Experience</h3>
                            </div>

                            <div className="flex items-center gap-2 text-secondary font-medium text-sm md:text-base">
                                Timeline <ArrowRight size={16} />
                            </div>
                        </motion.div>
                    </Link>

                    <Link to="/contact" className="md:col-span-1">
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="glass-panel p-6 md:p-8 h-56 md:h-64 flex flex-col justify-between relative overflow-hidden group"
                        >
                            <div className="absolute right-0 top-0 w-24 h-24 md:w-32 md:h-32 bg-accent/10 rounded-full -mr-8 md:-mr-10 -mt-8 md:-mt-10 blur-2xl transition-all group-hover:bg-accent/20" />

                            <div className="relative z-10">
                                <div className="w-10 h-10 md:w-12 md:h-12 bg-accent/10 dark:bg-accent/20 rounded-2xl flex items-center justify-center text-accent mb-3 md:mb-4">
                                    <Mail size={20} className="md:w-6 md:h-6" />
                                </div>
                                <h3 className="text-xl md:text-2xl font-bold mb-2 text-text">Contact</h3>
                            </div>

                            <div className="flex items-center gap-2 text-accent font-medium text-sm md:text-base">
                                Say Hi <ArrowRight size={16} />
                            </div>
                        </motion.div>
                    </Link>

                    <a
                        href={portfolioData.personal.social.find(s => s.name === 'Resume')?.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="md:col-span-2"
                    >
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="glass-panel p-6 md:p-8 h-56 md:h-64 flex flex-col justify-center items-center text-center relative overflow-hidden group"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                            <h3 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4 text-text">Download Resume</h3>
                            <p className="text-text-secondary mb-4 md:mb-6 max-w-md leading-relaxed text-sm md:text-base px-4">
                                Get a detailed overview of my skills, experience, and education in PDF format.
                            </p>
                            <span className="btn-primary text-sm md:text-base">Download PDF</span>
                        </motion.div>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Home;
