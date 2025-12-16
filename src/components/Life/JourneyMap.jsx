import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const JourneyMap = () => {
    const { scrollYProgress } = useScroll();

    // Path drawing animation
    const pathLength = useTransform(scrollYProgress, [0, 0.9], [0, 1]);

    // Arrow movement along the path (simplified for visual effect)
    // We'll use a separate transform for the arrow's position based on key percentages
    const arrowX = useTransform(scrollYProgress,
        [0, 0.2, 0.5, 0.8, 1],
        ["10%", "30%", "60%", "40%", "80%"]
    );
    const arrowY = useTransform(scrollYProgress,
        [0, 0.2, 0.5, 0.8, 1],
        ["10%", "40%", "50%", "80%", "90%"]
    );
    const arrowRotate = useTransform(scrollYProgress,
        [0, 0.2, 0.5, 0.8, 1],
        [45, 90, 135, 180, 45]
    );

    return (
        <div className="fixed inset-0 pointer-events-none z-0 opacity-30 md:opacity-50">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                {/* The Path */}
                <motion.path
                    d="M10,10 Q30,40 60,50 T40,80 T80,90"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.5"
                    strokeDasharray="1 1"
                    className="text-white/50"
                />
                <motion.path
                    d="M10,10 Q30,40 60,50 T40,80 T80,90"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    className="text-white"
                    style={{ pathLength }}
                />
            </svg>

            {/* The Traveling Arrow/Plane */}
            <motion.div
                className="absolute w-8 h-8 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                style={{
                    left: arrowX,
                    top: arrowY,
                    rotate: arrowRotate,
                    translateX: "-50%",
                    translateY: "-50%"
                }}
            >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                    <path d="M21 12L3 2L6 12L3 22L21 12Z" />
                </svg>
            </motion.div>
        </div>
    );
};

export default JourneyMap;
