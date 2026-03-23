import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolio';
import { FileText, Award, Layers, Code, Zap, Mail } from 'lucide-react';
import ZoomParallax from '../components/UI/ZoomParallax';

const Certifications = () => {
    const categories = ["All", ...new Set(portfolioData.certifications.map(c => c.category))];
    const [activeCategory, setActiveCategory] = useState("All");

    const filteredCerts = activeCategory === "All"
        ? portfolioData.certifications
        : portfolioData.certifications.filter(c => c.category === activeCategory);

    return (
        <div className="bg-background min-h-screen overflow-x-hidden pb-32">
            <ZoomParallax>
                <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-black dark:bg-gray-950">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20" />
                    <div className="relative z-10 text-center text-white px-4">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-6xl md:text-8xl font-bold mb-6 tracking-tighter"
                        >
                            Wall of <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Excellence.</span>
                        </motion.h1>
                        <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto">
                            A showcase of technical mastery and continuous learning.
                        </p>
                    </div>
                </div>
            </ZoomParallax>

            <div className="container mx-auto px-4 py-20 relative z-10 bg-background">
                {/* Category Filter */}
                <div className="flex flex-wrap justify-center gap-4 mb-16">
                    {categories.map((cat, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === cat
                                ? 'bg-primary text-white shadow-lg shadow-primary/25 scale-105'
                                : 'bg-secondary text-text-secondary hover:bg-secondary/80'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCerts.map((cert, index) => (
                        <motion.a
                            href={cert.fileName === 'restricted' ? '/contact' : `/certificates/${cert.fileName}`}
                            target={cert.fileName === 'restricted' ? '_self' : '_blank'}
                            rel={cert.fileName === 'restricted' ? '' : 'noopener noreferrer'}
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            whileHover={{ y: -5, scale: 1.02 }}
                            className={`group relative rounded-2xl p-6 border transition-all duration-300 shadow-sm hover:shadow-2xl flex flex-col justify-between overflow-hidden
                                ${cert.category === 'LTIMindtree'
                                    ? 'bg-white dark:bg-gradient-to-br dark:from-gray-900 dark:to-blue-950/20 border-border dark:border-blue-500/20 hover:shadow-blue-500/10'
                                    : cert.category === 'Personal'
                                        ? 'bg-white dark:bg-gradient-to-br dark:from-gray-900 dark:to-purple-950/20 border-border dark:border-purple-500/20 hover:shadow-purple-500/10'
                                        : 'bg-white dark:bg-gradient-to-br dark:from-gray-900 dark:to-green-950/20 border-border dark:border-green-500/20 hover:shadow-green-500/10'
                                }
                            `}
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-5 bg-clip-text text-transparent bg-gradient-to-br from-white to-gray-500 dark:opacity-10 group-hover:opacity-20 transition-opacity">
                                <Award size={100} className={
                                    cert.category === 'LTIMindtree' ? 'text-blue-500' :
                                        cert.category === 'Personal' ? 'text-purple-500' : 'text-green-500'
                                } />
                            </div>

                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className={`p-3 rounded-xl backdrop-blur-md ${cert.category === 'LTIMindtree' ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400' :
                                            cert.category === 'Personal' ? 'bg-purple-500/10 text-purple-600 dark:text-purple-400' : 'bg-green-500/10 text-green-600 dark:text-green-400'
                                        }`}>
                                        {cert.category === 'LTIMindtree' ? <BriefcaseIcon /> : <Zap size={20} />}
                                    </div>
                                    <span className={`text-xs font-bold font-mono px-2 py-1 rounded uppercase tracking-wider ${cert.category === 'LTIMindtree' ? 'bg-blue-100 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300' :
                                            cert.category === 'Personal' ? 'bg-purple-100 dark:bg-purple-500/10 text-purple-700 dark:text-purple-300' : 'bg-green-100 dark:bg-green-500/10 text-green-700 dark:text-green-300'
                                        }`}>
                                        {cert.category}
                                    </span>
                                </div>

                                <h3 className={`text-xl font-bold mb-2 line-clamp-2 transition-colors ${cert.category === 'LTIMindtree' ? 'text-gray-900 dark:text-blue-100 group-hover:text-blue-600 dark:group-hover:text-blue-300' :
                                        cert.category === 'Personal' ? 'text-gray-900 dark:text-purple-100 group-hover:text-purple-600 dark:group-hover:text-purple-300' : 'text-gray-900 dark:text-green-100'
                                    }`}>
                                    {cert.title}
                                </h3>
                            </div>

                            <div className={`mt-6 flex items-center justify-between pt-6 border-t ${cert.category === 'LTIMindtree' ? 'border-gray-100 dark:border-blue-500/20' :
                                    cert.category === 'Personal' ? 'border-gray-100 dark:border-purple-500/20' : 'border-gray-100 dark:border-green-500/20'
                                }`}>
                                {cert.fileName === 'restricted' ? (
                                    <>
                                        <span className="text-sm font-medium flex items-center gap-2 text-gray-500 dark:text-gray-400">
                                            <Mail size={14} />
                                            Access Required
                                        </span>
                                        <div className="text-xs px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
                                            Contact Me
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <span className={`text-sm font-medium flex items-center gap-2 ${cert.category === 'LTIMindtree' ? 'text-blue-600/70 dark:text-blue-400/70' :
                                                cert.category === 'Personal' ? 'text-purple-600/70 dark:text-purple-400/70' : 'text-green-600/70 dark:text-green-400/70'
                                            }`}>
                                            <FileText size={14} />
                                            Verified Document
                                        </span>
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${cert.category === 'LTIMindtree' ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 group-hover:bg-blue-500 group-hover:text-white' :
                                                cert.category === 'Personal' ? 'bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 group-hover:bg-purple-500 group-hover:text-white' : 'bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400 group-hover:bg-green-500 group-hover:text-white'
                                            }`}>
                                            →
                                        </div>
                                    </>
                                )}
                            </div>
                        </motion.a>
                    ))}
                </div>
            </div>
        </div>
    );
};

const BriefcaseIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
    </svg>
);

export default Certifications;
