import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolio';
import { Mail } from 'lucide-react';
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
                        <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed px-4">
                            From a single line of code to complex autonomous agents.
                        </p>
                    </div>
                </div>

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
                            className="min-w-[280px] sm:min-w-[350px] md:min-w-[450px] bg-gray-900 dark:bg-gray-800 rounded-2xl md:rounded-3xl p-6 md:p-10 snap-center border border-gray-800 dark:border-gray-700"
                        >
                            <div className="w-12 h-12 md:w-16 md:h-16 bg-white/10 dark:bg-white/20 rounded-xl md:rounded-2xl flex items-center justify-center mb-6 md:mb-8 text-white">
                                <achievement.icon size={24} className="md:w-8 md:h-8" />
                            </div>
                            <h3 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">{achievement.title}</h3>
                            <p className="text-gray-400 dark:text-gray-300 text-base md:text-lg leading-relaxed">
                                {achievement.description}
                            </p>
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
