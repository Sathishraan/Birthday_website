import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

/**
 * Wire Lights Component - Creates flowing LED light wire effect
 * Simulates decorative string lights with flowing animation
 */
const WireLights = ({ color = 'warm', position = 'top' }) => {
    const [lightCount] = useState(12);

    const colorSchemes = {
        warm: {
            wire: '#4a4a4a',
            lights: ['#fbbf24', '#f59e0b', '#fde047', '#facc15', '#fb923c'],
            glow: 'rgba(251, 191, 36, 0.6)'
        },
        cool: {
            wire: '#4a4a4a',
            lights: ['#60a5fa', '#3b82f6', '#93c5fd', '#bfdbfe', '#38bdf8'],
            glow: 'rgba(96, 165, 250, 0.6)'
        },
        pink: {
            wire: '#4a4a4a',
            lights: ['#ec4899', '#f472b6', '#fb7185', '#f9a8d4', '#fda4af'],
            glow: 'rgba(236, 72, 153, 0.6)'
        },
        rainbow: {
            wire: '#4a4a4a',
            lights: ['#ef4444', '#f97316', '#fbbf24', '#22c55e', '#3b82f6', '#8b5cf6', '#ec4899'],
            glow: 'rgba(139, 92, 246, 0.6)'
        }
    };

    const scheme = colorSchemes[color] || colorSchemes.warm;

    const positions = {
        top: 'top-0 left-0 right-0',
        bottom: 'bottom-0 left-0 right-0'
    };

    return (
        <div className={`fixed ${positions[position]} h-12 sm:h-16 md:h-20 pointer-events-none z-50 overflow-hidden`}>
            {/* Wire/Cable */}
            <svg
                className="w-full h-full"
                viewBox="0 0 1200 80"
                preserveAspectRatio="none"
                style={{ position: 'absolute', top: 0 }}
            >
                <motion.path
                    d="M0,40 Q150,20 300,40 T600,40 T900,40 T1200,40"
                    stroke={scheme.wire}
                    strokeWidth="2"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, ease: 'easeInOut' }}
                />
            </svg>

            {/* LED Lights */}
            <div className="relative w-full h-full flex justify-around items-center px-4">
                {[...Array(lightCount)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute"
                        style={{
                            left: `${(i / lightCount) * 100}%`,
                            top: '50%'
                        }}
                        initial={{ y: '-50%', scale: 0, opacity: 0 }}
                        animate={{
                            y: ['-50%', '-45%', '-50%'],
                            scale: [0, 1, 0.95, 1],
                            opacity: [0, 1, 0.9, 1]
                        }}
                        transition={{
                            duration: 0.8,
                            delay: i * 0.1,
                            repeat: 0
                        }}
                    >
                        {/* Light Bulb */}
                        <motion.div
                            className="relative"
                            animate={{
                                scale: [1, 1.1, 1],
                            }}
                            transition={{
                                duration: 1.5 + (i % 3) * 0.5,
                                repeat: Infinity,
                                delay: i * 0.2,
                                ease: 'easeInOut'
                            }}
                        >
                            {/* Glow Effect */}
                            <motion.div
                                className="absolute inset-0 rounded-full blur-md"
                                style={{
                                    width: '20px',
                                    height: '20px',
                                    backgroundColor: scheme.lights[i % scheme.lights.length],
                                    transform: 'translate(-50%, -50%)',
                                    left: '50%',
                                    top: '50%'
                                }}
                                animate={{
                                    opacity: [0.4, 0.8, 0.4],
                                    scale: [1, 1.3, 1]
                                }}
                                transition={{
                                    duration: 2 + (i % 4) * 0.5,
                                    repeat: Infinity,
                                    delay: i * 0.15,
                                    ease: 'easeInOut'
                                }}
                            />

                            {/* Bulb */}
                            <motion.div
                                className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 rounded-full relative"
                                style={{
                                    backgroundColor: scheme.lights[i % scheme.lights.length],
                                    boxShadow: `0 0 10px ${scheme.glow}, 0 0 20px ${scheme.glow}`
                                }}
                                animate={{
                                    boxShadow: [
                                        `0 0 10px ${scheme.glow}, 0 0 20px ${scheme.glow}`,
                                        `0 0 15px ${scheme.glow}, 0 0 30px ${scheme.glow}`,
                                        `0 0 10px ${scheme.glow}, 0 0 20px ${scheme.glow}`
                                    ]
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    delay: i * 0.2,
                                    ease: 'easeInOut'
                                }}
                            />

                            {/* Reflection */}
                            <div
                                className="absolute top-0.5 left-0.5 w-1 h-1 sm:w-1.5 sm:h-1.5 bg-white rounded-full opacity-60"
                                style={{ transform: 'translate(0, 0)' }}
                            />
                        </motion.div>

                        {/* Wire to bulb */}
                        <div
                            className="absolute top-0 left-1/2 w-px h-2 sm:h-3 bg-gray-600"
                            style={{ transform: 'translateX(-50%) translateY(-100%)' }}
                        />
                    </motion.div>
                ))}
            </div>

            {/* Flowing light animation along wire */}
            <motion.div
                className="absolute top-1/2 left-0 w-full h-0.5"
                style={{
                    background: `linear-gradient(90deg, transparent, ${scheme.glow}, transparent)`,
                    transform: 'translateY(-50%)',
                    filter: 'blur(2px)'
                }}
                animate={{
                    x: ['-100%', '200%']
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'linear'
                }}
            />
        </div>
    );
};

export default WireLights;
