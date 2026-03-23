import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolio';
import { Mail, FileText } from 'lucide-react';
import ZoomParallax from '../components/UI/ZoomParallax';
import AppleScrollSection from '../components/UI/AppleScrollSection';
import ProjectShowcase from '../components/UI/ProjectShowcase';

const About = () => {
    return (
        <div className="bg-background min-h-screen overflow-x-hidden">

            <ZoomParallax>
                <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-black dark:bg-gray-950">
                    <img
                        src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1920"
                        alt="Space Background"
                        className="absolute inset-0 w-full h-full object-cover opacity-50 dark:opacity-40"
                    />
                    <div className="relative z-10 text-center text-white px-4">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="text-7xl md:text-9xl font-bold mb-6 tracking-tighter"
                        >
                            Beyond <br /> Limits.
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 1 }}
                            className="text-2xl md:text-3xl font-light text-gray-300 max-w-2xl mx-auto"
                        >
                            Architecting the future of AI.
                        </motion.p>
                    </div>
                </div>
            </ZoomParallax>

            <div className="relative z-10 bg-background">
                <div className="py-16 md:py-24">
                    <div className="text-center mb-20 md:mb-32 px-4 relative">
                        <h2 className="text-4xl md:text-7xl font-bold mb-6 md:mb-8 text-text">The Journey.</h2>
                        <div className="flex flex-col md:flex-row items-center justify-center gap-12 mb-12">
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                                className="w-40 h-40 md:w-64 md:h-64 flex-shrink-0 relative group"
                            >
                                <div className="absolute -inset-4 bg-gradient-to-tr from-blue-500/30 to-purple-500/30 rounded-[1.5rem] blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <div className="relative w-full h-full rounded-[1.5rem] overflow-hidden border border-white/10 shadow-2xl -rotate-2 group-hover:rotate-0 transition-transform duration-500">
                                    <img
                                        src="/profile.jpg"
                                        alt="Profile"
                                        className="w-full h-full object-cover transform scale-105 group-hover:scale-110 transition-transform duration-700"
                                    />
                                </div>
                            </motion.div>
                            <p className="text-lg md:text-xl text-text-secondary max-w-xl leading-relaxed text-left">
                                From a single line of code to complex autonomous agents. I've always been fascinated by the intersection of creativity and logic. My journey has been driven by a relentless curiosity to understand how things work and how to make them better.
                            </p>
                        </div>

                        {/* Verified Timeline */}
                        <div className="max-w-3xl mx-auto mt-20">
                            <div className="space-y-12 border-l-2 border-border/50 ml-4 md:ml-0 pl-8 md:pl-12 relative">
                                {portfolioData.timeline.map((item, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        className="relative"
                                    >
                                        <div className="absolute -left-[43px] md:-left-[59px] top-1 w-6 h-6 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center">
                                            <div className="w-2 h-2 rounded-full bg-primary" />
                                        </div>

                                        <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 mb-2">
                                            <h3 className="text-2xl font-bold text-text">{item.title}</h3>
                                            <span className="text-sm font-mono text-primary px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
                                                {item.year}
                                            </span>
                                        </div>

                                        <p className="text-text-secondary text-lg mb-4 leading-relaxed">
                                            {item.description}
                                        </p>

                                        {item.proof === 'restricted' ? (
                                            <a
                                                href="/contact"
                                                className="inline-flex items-center gap-2 text-sm font-medium text-secondary hover:text-primary transition-colors group"
                                            >
                                                <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 group-hover:bg-primary/10 transition-colors">
                                                    <Mail size={16} />
                                                </div>
                                                Hire Me to View
                                            </a>
                                        ) : item.proof ? (
                                            <a
                                                href={item.proof}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors group"
                                            >
                                                <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 group-hover:bg-gray-200 dark:group-hover:bg-gray-700 transition-colors">
                                                    <FileText size={16} />
                                                </div>
                                                View Verified Proof
                                            </a>
                                        ) : null}
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Real Story Narrative */}
                        <div className="mt-20 space-y-0">
                            {portfolioData.story.map((chapter, index) => (
                                <AppleScrollSection
                                    key={index}
                                    title={chapter.title}
                                    description={chapter.description}
                                    image={chapter.image}
                                    align={index % 2 === 0 ? 'left' : 'right'}
                                />
                            ))}
                        </div>


                    </div>
                </div>


            </div>

            <section className="py-16 md:py-32 bg-black dark:bg-gray-950 text-white overflow-hidden">
                <div className="container mx-auto px-4 md:px-6 mb-12 md:mb-16 text-center md:text-left">
                    <h2 className="text-3xl md:text-5xl lg:text-7xl font-bold">Achievements.</h2>
                    <p className="text-lg md:text-xl text-gray-400 mt-4 max-w-3xl">Recognition and impact in AI development</p>
                </div>

                <div className="flex overflow-x-auto pb-12 px-4 md:px-6 gap-6 md:gap-8 snap-x snap-mandatory hide-scrollbar">
                    {portfolioData.achievements.map((achievement) => (
                        <motion.div
                            key={achievement.id}
                            whileHover={{ scale: 1.02 }}
                            className="min-w-[280px] sm:min-w-[350px] md:min-w-[450px] bg-gray-900 dark:bg-gray-800 rounded-2xl md:rounded-3xl overflow-hidden snap-center border border-gray-800 dark:border-gray-700 relative group"
                        >
                            {/* Background Image with Overlay */}
                            <div className="absolute inset-0">
                                <img
                                    src={achievement.image}
                                    alt={achievement.title}
                                    className="w-full h-full object-cover opacity-40 group-hover:opacity-50 transition-opacity duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent" />
                            </div>

                            <div className="relative z-10 p-6 md:p-10 h-full flex flex-col justify-end">
                                <div className="w-12 h-12 md:w-16 md:h-16 bg-white/10 dark:bg-white/20 rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6 text-white backdrop-blur-md">
                                    <achievement.icon size={24} className="md:w-8 md:h-8" />
                                </div>
                                <h3 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4 text-white">{achievement.title}</h3>
                                <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                                    {achievement.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            <section className="py-16 md:py-32 px-4 max-w-7xl mx-auto">
                <div className="text-center mb-16 md:mb-24">
                    <h2 className="text-3xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-6 text-text">Featured Work.</h2>
                    <p className="text-lg md:text-xl text-text-secondary">Innovation in action.</p>
                </div>

                <ProjectShowcase projects={portfolioData.projects} />
            </section>

            <section className="min-h-screen flex items-center justify-center bg-black dark:bg-gray-950 text-white relative overflow-hidden py-20 px-4">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-800 via-black to-black opacity-50" />
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1920')] bg-cover bg-center opacity-10" />
                <div className="relative z-10 text-center flex flex-col items-center max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="mb-8"
                    >
                        <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                            <Mail className="w-10 h-10 md:w-12 md:h-12 text-white" />
                        </div>
                    </motion.div>
                    <h2 className="text-4xl md:text-6xl lg:text-8xl font-bold mb-8 md:mb-12 tracking-tighter">
                        Let's Create.
                    </h2>
                    <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl">
                        Ready to build something amazing? Let's connect and bring your AI ideas to life.
                    </p>
                    <a
                        href="mailto:ubheshubham.37@gmail.com"
                        className="inline-block px-8 py-4 md:px-12 md:py-5 bg-white text-black dark:bg-primary dark:text-white rounded-full text-lg md:text-xl font-medium hover:scale-105 transition-transform duration-300"
                    >
                        Get in Touch
                    </a>
                </div>
            </section>
        </div>

    );
};

export default About;
