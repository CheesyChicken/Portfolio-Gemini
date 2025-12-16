import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Github, ExternalLink } from 'lucide-react';

const ProjectShowcase = ({ projects }) => {
    const [activeProject, setActiveProject] = useState(0);

    return (
        <div className="flex flex-col lg:flex-row gap-12 min-h-[600px]">
            {/* Sticky Image Section */}
            <div className="lg:w-1/2 relative h-[400px] lg:h-auto">
                <div className="sticky top-32 w-full aspect-video rounded-3xl overflow-hidden shadow-2xl">
                    <AnimatePresence mode="wait">
                        <motion.img
                            key={activeProject}
                            src={projects[activeProject].image}
                            alt={projects[activeProject].title}
                            initial={{ opacity: 0, scale: 1.1 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="w-full h-full object-cover"
                        />
                    </AnimatePresence>

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                        <div className="flex gap-4">
                            <a
                                href={projects[activeProject].link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-black transition-all"
                            >
                                <Github size={24} />
                            </a>
                            <a
                                href={projects[activeProject].link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-black transition-all"
                            >
                                <ExternalLink size={24} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scrollable Description Section */}
            <div className="lg:w-1/2 flex flex-col gap-24 py-12 lg:py-32">
                {projects.map((project, index) => (
                    <motion.div
                        key={project.id}
                        initial={{ opacity: 0.3 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ margin: "-20% 0px -20% 0px" }}
                        onViewportEnter={() => setActiveProject(index)}
                        className="flex flex-col justify-center min-h-[300px] px-6"
                    >
                        <span className="text-6xl font-bold text-gray-200 mb-4">0{index + 1}</span>
                        <h3 className="text-4xl font-bold mb-4">{project.title}</h3>
                        <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                            {project.description}
                        </p>
                        <div className="flex flex-wrap gap-3">
                            {project.tags.map(tag => (
                                <span key={tag} className="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-gray-600">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default ProjectShowcase;
