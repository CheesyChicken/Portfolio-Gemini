import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolio';
import ExperienceScene from '../components/3d/ExperienceScene';

const Experience = () => {
    return (
        <div className="relative min-h-screen pt-32 pb-20">
            <ExperienceScene />

            <div className="section-container px-4 md:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12 md:mb-16 text-center"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4 text-text">Experience</h2>
                    <p className="text-text-secondary max-w-2xl mx-auto text-base md:text-lg px-4">
                        My professional journey and career milestones.
                    </p>
                    <motion.img
                        src="/landed_avatar.png"
                        alt="Just Landed"
                        className="w-24 h-24 md:w-32 md:h-32 mx-auto mt-6 md:mt-8 drop-shadow-xl"
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ type: "spring", bounce: 0.5 }}
                    />
                </motion.div>

                <div className="max-w-3xl mx-auto relative">
                    <div className="absolute left-[15px] md:left-[27px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-transparent hidden sm:block" />

                    {portfolioData.experience.map((exp, index) => (
                        <motion.div
                            key={exp.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="mb-8 md:mb-12 last:mb-0 relative sm:pl-16 md:pl-20"
                        >
                            <div className="absolute left-0 top-0 w-10 h-10 md:w-14 md:h-14 rounded-full bg-white dark:bg-surface border-4 border-gray-100 dark:border-border flex items-center justify-center shadow-sm z-10 hidden sm:flex">
                                <span className="text-base md:text-xl font-bold text-primary">{portfolioData.experience.length - index}</span>
                            </div>

                            <div className="glass-panel p-5 md:p-8 relative hover:border-primary/30 transition-colors">
                                <div className="absolute -left-2 md:-left-3 top-4 md:top-6 w-2 h-2 md:w-3 md:h-3 bg-white dark:bg-surface border border-gray-200 dark:border-border rotate-45 hidden sm:block" />

                                <div className="flex flex-col sm:flex-row sm:flex-wrap sm:justify-between sm:items-start gap-3 md:gap-0 mb-3 md:mb-4">
                                    <div>
                                        <h3 className="text-xl md:text-2xl font-bold text-text">{exp.role}</h3>
                                        <p className="text-primary font-medium text-base md:text-lg">{exp.company}</p>
                                    </div>
                                    <span className="px-3 py-1 md:px-4 bg-primary/10 text-primary rounded-full text-xs md:text-sm font-medium self-start">
                                        {exp.period}
                                    </span>
                                </div>
                                <p className="text-text-secondary leading-relaxed text-sm md:text-base">
                                    {exp.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Experience;
