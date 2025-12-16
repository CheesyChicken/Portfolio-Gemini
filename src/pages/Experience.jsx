import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolio';
import ExperienceScene from '../components/3d/ExperienceScene';

const Experience = () => {
    return (
        <div className="relative min-h-screen pt-32 pb-20">
            <ExperienceScene />

            <div className="section-container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-16 text-center"
                >
                    <h2 className="text-5xl font-bold mb-4">Experience</h2>
                    <p className="text-gray-500 max-w-2xl mx-auto">
                        My professional journey and career milestones.
                    </p>
                    <motion.img
                        src="/landed_avatar.png"
                        alt="Just Landed"
                        className="w-32 h-32 mx-auto mt-8 drop-shadow-xl"
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ type: "spring", bounce: 0.5 }}
                    />
                </motion.div>

                <div className="max-w-3xl mx-auto relative">
                    <div className="absolute left-[27px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-transparent" />

                    {portfolioData.experience.map((exp, index) => (
                        <motion.div
                            key={exp.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="mb-12 last:mb-0 relative pl-20"
                        >
                            <div className="absolute left-0 top-0 w-14 h-14 rounded-full bg-white border-4 border-gray-100 flex items-center justify-center shadow-sm z-10">
                                <span className="text-xl font-bold text-primary">{portfolioData.experience.length - index}</span>
                            </div>

                            <div className="glass-panel p-8 relative hover:border-primary/30 transition-colors">
                                <div className="absolute -left-3 top-6 w-3 h-3 bg-white border border-gray-200 rotate-45" />

                                <div className="flex flex-wrap justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-900">{exp.role}</h3>
                                        <p className="text-primary font-medium text-lg">{exp.company}</p>
                                    </div>
                                    <span className="px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                                        {exp.period}
                                    </span>
                                </div>
                                <p className="text-gray-600 leading-relaxed">
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
