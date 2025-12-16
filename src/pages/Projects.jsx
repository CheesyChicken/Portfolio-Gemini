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
                    className="mb-16 text-center"
                >
                    <div className="flex items-center justify-center gap-4 mb-4">
                        <h2 className="text-5xl font-bold text-text">Selected Work</h2>
                        <motion.img
                            src="/thinking_avatar.png"
                            alt="Thinking"
                            className="w-24 h-24 -mt-8"
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 5, repeat: Infinity }}
                        />
                    </div>
                    <p className="text-text-secondary max-w-2xl mx-auto text-lg leading-relaxed">
                        A collection of projects that demonstrate my passion for interactive design and clean code.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {portfolioData.projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="glass-panel overflow-hidden group"
                        >
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 backdrop-blur-sm">
                                    <a href={project.link} className="p-3 bg-white dark:bg-surface rounded-full hover:bg-primary hover:text-white transition-colors">
                                        <Github size={20} />
                                    </a>
                                    <a href={project.link} className="p-3 bg-white dark:bg-surface rounded-full hover:bg-primary hover:text-white transition-colors">
                                        <ExternalLink size={20} />
                                    </a>
                                </div>
                            </div>

                            <div className="p-6">
                                <h3 className="text-xl font-bold mb-2 text-text group-hover:text-primary transition-colors">{project.title}</h3>
                                <p className="text-text-secondary mb-4 text-sm line-clamp-3 leading-relaxed">
                                    {project.description}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {project.tags.map(tag => (
                                        <span key={tag} className="badge">
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
