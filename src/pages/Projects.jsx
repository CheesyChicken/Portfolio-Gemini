import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolio';
import { ExternalLink, Github } from 'lucide-react';
import ProjectScene from '../components/3d/ProjectScene';

const Projects = () => {
    return (
        <div className="relative min-h-screen pt-32 pb-20">
            <ProjectScene />

            <div className="section-container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12 md:mb-16 text-center px-4"
                >
                    <div className="flex items-center justify-center gap-3 md:gap-4 mb-3 md:mb-4">
                        <h2 className="text-3xl md:text-5xl font-bold text-text">Selected Work</h2>
                        <motion.img
                            src="/thinking_avatar.png"
                            alt="Thinking"
                            className="w-16 h-16 md:w-24 md:h-24 -mt-6 md:-mt-8"
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 5, repeat: Infinity }}
                        />
                    </div>
                    <p className="text-text-secondary max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
                        A collection of projects that demonstrate my passion for AI and data engineering.
                    </p>
                </motion.div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {portfolioData.projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="glass-panel overflow-hidden group"
                        >
                            <div className="relative h-40 md:h-48 overflow-hidden">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 md:gap-4 backdrop-blur-sm">
                                    <a href={project.link} className="p-2 md:p-3 bg-white dark:bg-surface rounded-full hover:bg-primary hover:text-white transition-colors">
                                        <Github size={18} className="md:w-5 md:h-5" />
                                    </a>
                                    <a href={project.link} className="p-2 md:p-3 bg-white dark:bg-surface rounded-full hover:bg-primary hover:text-white transition-colors">
                                        <ExternalLink size={18} className="md:w-5 md:h-5" />
                                    </a>
                                </div>
                            </div>

                            <div className="p-5 md:p-6">
                                <h3 className="text-lg md:text-xl font-bold mb-2 text-text group-hover:text-primary transition-colors">{project.title}</h3>
                                <p className="text-text-secondary mb-3 md:mb-4 text-xs md:text-sm line-clamp-3 leading-relaxed">
                                    {project.description}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {project.tags.map(tag => (
                                        <span key={tag} className="badge text-xs">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Projects;
