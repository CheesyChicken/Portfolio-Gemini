import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ZoomParallax = ({ children, className = "" }) => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const scale = useTransform(scrollYProgress, [0, 1], [1, 4]);
    const opacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 1, 0]);

    return (
        <div ref={containerRef} className={`h-[200vh] relative ${className}`}>
            <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
                <motion.div
                    style={{ scale, opacity }}
                    className="w-full h-full flex items-center justify-center"
                >
                    {children}
                </motion.div>
            </div>
        </div>
    );
};

export default ZoomParallax;
