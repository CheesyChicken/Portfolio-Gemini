import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const AppleScrollSection = ({ image, title, description, align = 'left' }) => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [0, 1, 1, 0]);

    return (
        <div ref={containerRef} className="min-h-screen flex items-center justify-center py-24 relative overflow-hidden">
            <div className={`container mx-auto px-6 flex flex-col md:flex-row items-center gap-12 ${align === 'right' ? 'md:flex-row-reverse' : ''}`}>

                {/* Image Section */}
                <motion.div
                    style={{ y }}
                    className="w-full md:w-1/2"
                >
                    <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                        <img
                            src={image}
                            alt={title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>
                </motion.div>

                {/* Text Section */}
                <motion.div
                    style={{ opacity }}
                    className="w-full md:w-1/2 text-center md:text-left"
                >
                    <h2 className="text-5xl md:text-7xl font-bold mb-8 leading-tight tracking-tight">
                        {title}
                    </h2>
                    <p className="text-xl md:text-2xl text-gray-500 font-medium leading-relaxed max-w-lg mx-auto md:mx-0">
                        {description}
                    </p>
                </motion.div>

            </div>
        </div>
    );
};

export default AppleScrollSection;
