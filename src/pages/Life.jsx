import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { portfolioData } from '../data/portfolio';
import { MapPin, Camera, Mountain, Waves, User } from 'lucide-react';

// --- Components ---

const HorizontalScrollSection = ({ location }) => {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);

    return (
        <section ref={targetRef} className="relative h-[300vh] bg-neutral-900">
            <div className="sticky top-0 flex h-screen items-center overflow-hidden">
                <motion.div style={{ x }} className="flex gap-4 p-4 md:gap-12 md:p-12">
                    {/* Title Card */}
                    <div className="relative h-[60vh] w-[80vw] md:h-[80vh] md:w-[40vw] shrink-0 overflow-hidden rounded-3xl bg-white/5 p-8 backdrop-blur-sm border border-white/10 flex flex-col justify-center">
                        <h2 className="text-6xl md:text-8xl font-black text-white/20 mb-4 uppercase tracking-tighter">
                            {location.title}
                        </h2>
                        <h3 className="text-4xl md:text-6xl font-bold text-white mb-6">
                            {location.title}
                        </h3>
                        <p className="text-xl text-white/80 max-w-md leading-relaxed">
                            {location.description}
                        </p>
                        <div className="mt-12 flex items-center gap-2 text-accent">
                            <MapPin className="animate-bounce" />
                            <span className="font-mono text-sm tracking-widest uppercase">Explore the Journey</span>
                        </div>
                    </div>

                    {/* Images */}
                    {location.images.map((img, idx) => (
                        <div key={idx} className="group relative h-[60vh] w-[80vw] md:h-[80vh] md:w-[60vw] shrink-0 overflow-hidden rounded-3xl bg-neutral-800">
                            <img
                                src={img.src}
                                alt={img.caption}
                                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                                <span className="text-2xl font-bold text-white">{img.caption}</span>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

const StackSection = ({ location }) => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end']
    });

    return (
        <div ref={containerRef} className="h-[300vh] relative bg-neutral-950">
            <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
                <div className="relative w-[300px] h-[400px] md:w-[400px] md:h-[600px]">
                    {/* Background Text */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-0 w-full">
                        <h2 className="text-[120px] md:text-[200px] font-black text-white/5 leading-none tracking-tighter">
                            PEOPLE
                        </h2>
                    </div>

                    {location.images.map((img, i) => {
                        const cardOffset = i * 25;
                        const scale = useTransform(scrollYProgress,
                            [0, 1],
                            [1 - i * 0.05, 1]
                        );
                        const rotate = useTransform(scrollYProgress,
                            [0, 1],
                            [i % 2 === 0 ? -5 : 5, 0] // Random rotation that straightens out
                        );
                        const y = useTransform(scrollYProgress,
                            [0, 1],
                            [i * 20, -i * 400 + 100] // Fan out vertically
                        );
                        const opacity = useTransform(scrollYProgress,
                            [0, 0.2 + i * 0.05],
                            [1, 1]
                        );

                        return (
                            <motion.div
                                key={i}
                                style={{
                                    scale,
                                    rotate,
                                    y,
                                    zIndex: location.images.length - i
                                }}
                                className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10 bg-neutral-900"
                            >
                                <img
                                    src={img.src}
                                    alt={img.caption}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/50 backdrop-blur-sm">
                                    <p className="text-white font-medium text-center">{img.caption}</p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

const MapNavigation = ({ activeSection }) => {
    const navItems = [
        { id: 'mountains', icon: Mountain, label: 'Mountains' },
        { id: 'beaches', icon: Waves, label: 'Beaches' },
        { id: 'portraits', icon: User, label: 'Portraits' },
    ];

    return (
        <div className="fixed left-6 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-8">
            {navItems.map((item) => (
                <div
                    key={item.id}
                    className={`flex items-center gap-4 transition-all duration-300 ${activeSection === item.id ? 'opacity-100 translate-x-2' : 'opacity-40 hover:opacity-80'}`}
                >
                    <div className={`p-3 rounded-full ${activeSection === item.id ? 'bg-white text-black' : 'bg-white/10 text-white'}`}>
                        <item.icon size={20} />
                    </div>
                    <span className={`text-sm font-bold tracking-widest uppercase ${activeSection === item.id ? 'text-white' : 'text-transparent'}`}>
                        {item.label}
                    </span>
                </div>
            ))}
            <div className="absolute left-[22px] top-0 bottom-0 w-px bg-white/10 -z-10" />
        </div>
    );
};

const Life = () => {
    const [activeSection, setActiveSection] = useState('mountains');

    useEffect(() => {
        const handleScroll = () => {
            const sections = ['mountains', 'beaches', 'portraits'];
            const scrollPosition = window.scrollY + window.innerHeight / 2;

            // Simple logic to determine active section based on page height
            // Since each section is 300vh, we can calculate roughly
            const vh = window.innerHeight;
            if (scrollPosition < 3 * vh) setActiveSection('mountains');
            else if (scrollPosition < 6 * vh) setActiveSection('beaches');
            else setActiveSection('portraits');
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="bg-black min-h-screen text-white">
            <MapNavigation activeSection={activeSection} />

            {/* Intro Collage */}
            <div className="h-screen flex items-center justify-center relative overflow-hidden bg-black">
                {/* Collage Grid */}
                <div className="absolute inset-0 grid grid-cols-3 gap-1 opacity-60">
                    <div className="relative h-full overflow-hidden bg-neutral-900">
                        <img
                            src="/instagram_images/rajasthan_1.jpg"
                            alt="Rajasthan"
                            className="w-full h-full object-cover animate-pulse-slow"
                        />
                    </div>
                    <div className="relative h-full overflow-hidden bg-neutral-900 flex flex-col gap-1">
                        <div className="h-1/2 relative overflow-hidden">
                            <img
                                src="/instagram_images/snow_1.jpg"
                                alt="Snow"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="h-1/2 relative overflow-hidden">
                            <img
                                src="/instagram_images/ghibli.jpg"
                                alt="Ghibli Vibes"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                    <div className="relative h-full overflow-hidden bg-neutral-900">
                        <img
                            src="/instagram_images/midnight.jpg"
                            alt="Midnight"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

                {/* Gradient Overlay for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/80" />

                <div className="z-10 text-center mix-blend-overlay">
                    <h1 className="text-8xl md:text-[12rem] font-black tracking-tighter mb-4 text-white">
                        LIFE
                    </h1>
                    <p className="text-xl md:text-2xl font-light tracking-[1em] uppercase text-white">
                        The Journey
                    </p>
                </div>
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/50"
                >
                    <div className="w-px h-24 bg-gradient-to-b from-white/0 via-white to-white/0" />
                </motion.div>
            </div>


            {/* Sections */}
            {portfolioData.lifeLocations.map((location) => {
                if (location.type === 'horizontal') {
                    return <HorizontalScrollSection key={location.id} location={location} />;
                } else if (location.type === 'stack') {
                    return <StackSection key={location.id} location={location} />;
                }
                return null;
            })}

            {/* Footer */}
            <div className="h-[50vh] flex items-center justify-center bg-neutral-900 border-t border-white/10">
                <p className="text-white/40 font-mono text-sm">
                    © 2025 Shubham Ubhe • Life in Motion
                </p>
            </div>
        </div>
    );
};

export default Life;
