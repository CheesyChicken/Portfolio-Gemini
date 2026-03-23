import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { portfolioData } from '../data/portfolio';
import ZoomParallax from '../components/UI/ZoomParallax';
import AppleScrollSection from '../components/UI/AppleScrollSection';
import ProjectShowcase from '../components/UI/ProjectShowcase';
import { Award, Star, Zap } from 'lucide-react';

const About = () => {
    return (
        <div className="bg-background min-h-screen overflow-x-hidden">

            {/* Zoom Hero Section */}
            <ZoomParallax>
                <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-black">
                    <img
                        src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1920"
                        alt="Space Background"
                        className="absolute inset-0 w-full h-full object-cover opacity-50"
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

            {/* Story Sections - Apple Style */}
            <div className="relative z-10 bg-background -mt-[100vh] pt-[100vh]">
                <div className="py-24">
                    <div className="text-center mb-32 px-4 relative">
                        <motion.img
                            src="/avatar_coffee_holding.png"
                            alt="Coffee Time"
                            className="w-32 h-32 absolute top-0 right-[20%] hidden md:block"
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 4, repeat: Infinity }}
                        />
                        <h2 className="text-5xl md:text-7xl font-bold mb-8">The Journey.</h2>
                        <p className="text-xl text-gray-500 max-w-2xl mx-auto">
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

            {/* Achievements - Horizontal Scroll */}
            <section className="py-32 bg-black text-white overflow-hidden">
                <div className="container mx-auto px-6 mb-16 flex items-center gap-6">
                    <h2 className="text-5xl md:text-7xl font-bold">Achievements.</h2>
                    <motion.img
                        src="/avatar_nice.png"
                        alt="Nice"
                        className="w-24 h-24"
                        animate={{ rotate: [0, 15, -15, 0] }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                    />
                </div>

                <div className="flex overflow-x-auto pb-12 px-6 gap-8 snap-x snap-mandatory hide-scrollbar">
                    {portfolioData.achievements.map((achievement) => (
                        <motion.div
                            key={achievement.id}
                            whileHover={{ scale: 1.02 }}
                            className="min-w-[350px] md:min-w-[450px] bg-gray-900 rounded-3xl p-10 snap-center border border-gray-800"
                        >
                            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-8 text-white">
                                <achievement.icon size={32} />
                            </div>
                            <h3 className="text-3xl font-bold mb-4">{achievement.title}</h3>
                            <p className="text-gray-400 text-lg leading-relaxed">
                                {achievement.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Project Showcase */}
            <section className="py-32 px-4 max-w-7xl mx-auto">
                <div className="text-center mb-24">
                    <h2 className="text-5xl md:text-7xl font-bold mb-6">Featured Work.</h2>
                    <p className="text-xl text-gray-500">Innovation in action.</p>
                </div>

                <ProjectShowcase projects={portfolioData.projects} />
            </section>

            {/* Footer Call to Action */}
            <section className="h-screen flex items-center justify-center bg-black text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-800 via-black to-black opacity-50" />
                <div className="relative z-10 text-center flex flex-col items-center">
                    <motion.img
                        src="/yesno_avatar.png"
                        alt="Yes or No"
                        className="w-40 h-40 mb-8"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                    <h2 className="text-6xl md:text-8xl font-bold mb-12 tracking-tighter">
                        Let's Create.
                    </h2>
                    <a
                        href="mailto:ubheshubham.37@gmail.com"
                        className="inline-block px-12 py-5 bg-white text-black rounded-full text-xl font-medium hover:scale-105 transition-transform duration-300"
                    >
                        Get in Touch
                    </a>
                </div>
            </section>
        </div>

    );
};

export default About;
