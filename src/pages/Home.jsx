import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Calendar, Gift as GiftIcon, ArrowRight, Music, Cake, Stars } from 'lucide-react';
import { Link } from 'react-router-dom';
import Confetti from 'react-confetti';
import LazyImage from '../components/LazyImage';

const FloatingBalloon = React.memo(({ color, delay, left }) => {
    return (
        <motion.div
            initial={{ y: '100vh', x: left }}
            animate={{ y: '-20vh' }}
            transition={{
                duration: 15,
                delay: delay,
                repeat: Infinity,
                repeatType: 'loop',
                ease: 'easeInOut'
            }}
            className={`absolute ${left} z-10 opacity-80`}
        >
            <div className={`w-12 h-16 rounded-full bg-${color}-400 relative`}>
                <div className="absolute bottom-[-5px] left-1/2 transform -translate-x-1/2 w-1 h-10 bg-gray-300"></div>
            </div>
        </motion.div>
    );
});

const Home = () => {
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [showConfetti, setShowConfetti] = useState(true);

    useEffect(() => {
        const { innerWidth, innerHeight } = window;
        setDimensions({ width: innerWidth, height: innerHeight });

        const timer = setTimeout(() => {
            setShowConfetti(false);
        }, 8000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-b from-pink-100 to-purple-100 flex flex-col items-center justify-center p-4 sm:p-6 text-center overflow-hidden relative">
            {/* Confetti Animation */}
            {showConfetti && <Confetti width={dimensions.width} height={dimensions.height} recycle={false} numberOfPieces={300} />}

            {/* Floating Balloons */}
            <FloatingBalloon color="pink" delay={0} left="left-[10%]" />
            <FloatingBalloon color="purple" delay={2} left="left-[20%]" />
            <FloatingBalloon color="red" delay={4} left="right-[15%]" />
            <FloatingBalloon color="blue" delay={1} left="right-[25%]" />
            <FloatingBalloon color="yellow" delay={3} left="left-[80%]" />

            {/* Decorative Elements */}
            <motion.div
                animate={{
                    rotate: [0, 5, 0, -5, 0],
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute top-10 left-10 text-5xl z-10 opacity-70"
            >
                🎈
            </motion.div>

            <motion.div
                animate={{
                    rotate: [0, -5, 0, 5, 0],
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute top-20 right-12 text-5xl z-10 opacity-70"
            >
                🎂
            </motion.div>

            {/* Birthday Banner */}
            <motion.div
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 py-3 px-8 rounded-full shadow-lg z-20"
            >
                <h2 className="text-white font-bold text-xl tracking-wide">Happy Birthday Srimathi❤️🐾✨ </h2>
            </motion.div>

            {/* Main Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="max-w-2xl w-full bg-white rounded-[1.5rem] sm:rounded-[2rem] shadow-2xl overflow-hidden border-4 border-pink-200 z-20 relative mt-16"
            >
                {/* Decorative Ribbons */}
                <div className="absolute -left-6 -top-6 w-24 h-24 bg-pink-400 rotate-45 transform origin-bottom-right"></div>
                <div className="absolute -right-6 -top-6 w-24 h-24 bg-purple-400 rotate-[-45deg] transform origin-bottom-left"></div>

                <div className="relative h-64 sm:h-80 overflow-hidden">
                    <LazyImage
                        src="/gift.png"
                        alt="Romantic Gift"
                        className="w-full h-full object-cover"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-white/80 to-transparent" />

                    {/* Floating Hearts */}
                    {[...Array(5)].map((_, i) => (
                        <motion.div
                            key={i}
                            initial={{ y: 0, x: 20 * i, opacity: 0.3 }}
                            animate={{
                                y: [-15, -30, -15],
                                opacity: [0.3, 0.8, 0.3]
                            }}
                            transition={{
                                duration: 3,
                                delay: i * 0.5,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="absolute bottom-16 right-12"
                        >
                            <Heart
                                className={`text-pink-${400 + (i * 100)} fill-current w-${4 + i} h-${4 + i}`}
                                fill="currentColor"
                            />
                        </motion.div>
                    ))}

                    <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="absolute bottom-4 right-4 bg-pink-500 p-3 rounded-full shadow-lg"
                    >
                        <Heart className="text-white fill-current w-6 h-6" />
                    </motion.div>
                </div>

                <div className="p-6 sm:p-8 relative">
                    {/* Sparkles Animation */}
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.5, 1, 0.5]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="absolute top-4 right-12"
                    >
                        ✨
                    </motion.div>

                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.5, 1, 0.5]
                        }}
                        transition={{
                            duration: 2,
                            delay: 1,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="absolute top-12 left-16"
                    >
                        ✨
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-3xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 mb-3 sm:mb-4 font-serif"
                    >
                        Happy Birthday, My Love!
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                        className="text-lg text-pink-600 font-medium mb-8"
                    >
                        Since Sep 4, every moment has been a dream come true.
                    </motion.p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Link to="/story">
                            <motion.button
                                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(236, 72, 153, 0.4)" }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg shadow-pink-200/50"
                            >
                                <Calendar className="w-5 h-5" />
                                Our Love Story
                                <ArrowRight className="w-4 h-4" />
                            </motion.button>
                        </Link>

                        <Link to="/roadmap">
                            <motion.button
                                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(244, 114, 182, 0.4)" }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-rose-400 to-purple-500 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg shadow-rose-200/50"
                            >
                                <ArrowRight className="rotate-[-45deg] w-4 h-4" />
                                Memories Roadmap
                            </motion.button>
                        </Link>

                        <Link to="/wishes" className="sm:col-span-2">
                            <motion.button
                                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(236, 72, 153, 0.2)" }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full flex items-center justify-center gap-2 bg-white border-2 border-pink-500 text-pink-500 font-bold py-4 px-6 rounded-xl hover:bg-pink-50 transition-all"
                            >
                                <GiftIcon className="w-5 h-5" />
                                Special Wishes
                            </motion.button>
                        </Link>

                      
                    </div>
                </div>
            </motion.div>

            {/* Footer */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="mt-8 text-pink-600 flex items-center gap-2 bg-white/50 py-2 px-4 rounded-full"
            >
                <span>Made with</span>
                <Heart className="w-4 h-4 fill-current text-pink-600" />
                <span>just for you</span>
            </motion.div>

            {/* Birthday Cake */}
            <motion.div
                initial={{ scale: 0, rotate: 0 }}
                animate={{ scale: 1, rotate: [0, 5, 0, -5, 0] }}
                transition={{
                    scale: { delay: 1.5, duration: 0.8, type: "spring" },
                    rotate: { delay: 2, duration: 5, repeat: Infinity, ease: "easeInOut" }
                }}
                className="absolute bottom-8 left-8 text-6xl z-10"
            >
                🎁
            </motion.div>
        </div>
    );
};

export default React.memo(Home);
