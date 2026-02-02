import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

/**
 * Floating Hearts Component - Instagram-style flowing hearts
 * Creates hearts that flow vertically on the sides of the screen
 */
const FloatingHearts = ({ side = 'both', color = 'pink', count = 8 }) => {
    const colors = {
        pink: ['#ec4899', '#f472b6', '#fb7185'],
        red: ['#ef4444', '#f87171', '#dc2626'],
        purple: ['#a855f7', '#c084fc', '#9333ea'],
        multi: ['#ec4899', '#a855f7', '#ef4444', '#f97316', '#fbbf24']
    };

    const heartColors = colors[color] || colors.pink;

    const HeartFlow = ({ position }) => {
        return (
            <div
                className={`fixed ${position === 'left' ? 'left-2 sm:left-4 md:left-6' : 'right-2 sm:right-4 md:right-6'} top-0 bottom-0 pointer-events-none z-40 flex flex-col justify-start items-center`}
                style={{ width: '60px' }}
            >
                {[...Array(count)].map((_, i) => (
                    <motion.div
                        key={`${position}-${i}`}
                        className="absolute"
                        initial={{
                            y: '110vh',
                            x: 0,
                            opacity: 0,
                            scale: 0
                        }}
                        animate={{
                            y: '-20vh',
                            x: [0, (Math.random() - 0.5) * 30, 0],
                            opacity: [0, 1, 1, 1, 0],
                            scale: [0, 1, 1.2, 1, 0.8],
                            rotate: [0, 360]
                        }}
                        transition={{
                            duration: 4 + Math.random() * 3,
                            repeat: Infinity,
                            delay: i * 0.6,
                            ease: 'linear'
                        }}
                        style={{
                            top: `${Math.random() * 100}%`
                        }}
                    >
                        <motion.div
                            animate={{
                                rotate: [0, 10, -10, 0]
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: 'easeInOut'
                            }}
                        >
                            <Heart
                                size={20 + Math.random() * 20}
                                fill={heartColors[i % heartColors.length]}
                                stroke={heartColors[i % heartColors.length]}
                                className="drop-shadow-lg"
                                style={{
                                    filter: `drop-shadow(0 0 8px ${heartColors[i % heartColors.length]})`
                                }}
                            />
                        </motion.div>
                    </motion.div>
                ))}
            </div>
        );
    };

    return (
        <>
            {(side === 'left' || side === 'both') && <HeartFlow position="left" />}
            {(side === 'right' || side === 'both') && <HeartFlow position="right" />}
        </>
    );
};

export default FloatingHearts;
