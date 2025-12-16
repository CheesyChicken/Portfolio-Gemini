import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { portfolioData } from '../../data/portfolio';

const Dock = () => {
    const mouseX = useMotionValue(null);
    const location = useLocation();

    return (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
            <motion.div
                onMouseMove={(e) => mouseX.set(e.pageX)}
                onMouseLeave={() => mouseX.set(null)}
                className="glass px-4 py-3 rounded-full flex items-end gap-4 h-16 border border-black/10"
            >
                {portfolioData.dockItems.map((item) => (
                    <DockIcon key={item.id} mouseX={mouseX} item={item} isActive={location.pathname === item.to} />
                ))}
            </motion.div>
        </div>
    );
};

const DockIcon = ({ mouseX, item, isActive }) => {
    const ref = React.useRef(null);

    const distance = useTransform(mouseX, (val) => {
        const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
        return val - bounds.x - bounds.width / 2;
    });

    const widthSync = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
    const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

    return (
        <Link to={item.to}>
            <motion.div
                ref={ref}
                style={{ width }}
                className={`aspect-square rounded-full flex items-center justify-center relative group transition-colors ${isActive ? 'bg-black text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
            >
                <item.icon className="w-1/2 h-1/2" />

                <span className="absolute -top-12 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    {item.label}
                </span>
            </motion.div>
        </Link>
    );
};

export default Dock;
