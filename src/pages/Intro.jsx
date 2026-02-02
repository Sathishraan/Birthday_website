import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useMemo, useRef, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Sparkles, Star, Music, Volume2, VolumeX } from 'lucide-react';
import Confetti from 'react-confetti';

// Enhanced star background with more stars and better animation
const StarsBackground = memo(() => (
    <div className="absolute inset-0 z-0 overflow-hidden">
        {[...Array(150)].map((_, i) => (
            <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                    width: Math.random() * 3 + 'px',
                    height: Math.random() * 3 + 'px',
                    top: Math.random() * 100 + '%',
                    left: Math.random() * 100 + '%',
                    backgroundColor: Math.random() > 0.2 ? 'white' : '#f472b6'
                }}
                animate={{
                    opacity: [0, Math.random() * 0.5 + 0.3, 0],
                    scale: [0, Math.random() + 0.5, 0]
                }}
                transition={{
                    duration: 2 + Math.random() * 3,
                    repeat: Infinity,
                    delay: Math.random() * 5
                }}
            />
        ))}
    </div>
));

// New floating hearts component
const FloatingHearts = memo(() => {
    // Create an array of hearts with different sizes and positions
    const hearts = useMemo(() => Array.from({ length: 20 }, (_, i) => ({
        id: i,
        size: Math.random() * 20 + 10,
        left: Math.random() * 100,
        delay: Math.random() * 10,
        duration: Math.random() * 15 + 10
    })), []);

    return (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            {hearts.map((heart) => (
                <motion.div
                    key={heart.id}
                    initial={{ y: '110vh', x: `${heart.left}vw` }}
                    animate={{ y: '-20vh' }}
                    transition={{
                        duration: heart.duration,
                        delay: heart.delay,
                        repeat: Infinity,
                        ease: 'linear'
                    }}
                    className="absolute"
                    style={{ left: `${heart.left}vw` }}
                >
                    <motion.div
                        animate={{
                            x: [0, 10, -10, 0],
                            rotate: [0, 10, -10, 0]
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: 'easeInOut'
                        }}
                    >
                        <Heart
                            size={heart.size}
                            className="text-pink-500/20 fill-pink-500/20"
                            fill="currentColor"
                        />
                    </motion.div>
                </motion.div>
            ))}
        </div>
    );
});

// Shooting stars component
const ShootingStars = memo(() => {
    return (
        <div className="absolute inset-0 z-0 overflow-hidden">
            {[...Array(5)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute h-[1px] bg-gradient-to-r from-transparent via-pink-400 to-transparent"
                    style={{
                        width: Math.random() * 150 + 50 + 'px',
                        top: Math.random() * 70 + '%',
                        left: '-100px',
                        rotate: Math.random() * 20 - 10 + 'deg'
                    }}
                    animate={{
                        x: ['0vw', '120vw'],
                        opacity: [0, 1, 0]
                    }}
                    transition={{
                        duration: Math.random() * 2 + 1,
                        delay: Math.random() * 10 + i * 5,
                        repeat: Infinity,
                        ease: 'easeOut'
                    }}
                />
            ))}
        </div>
    );
});

const Intro = () => {
    const navigate = useNavigate();
    const [phase, setPhase] = useState('interaction'); // 'interaction', 'birthday', 'days', 'poem', 'candle', 'blown'
    const [daysLived, setDaysLived] = useState(0);
    const [currentLine, setCurrentLine] = useState(0);
    const [musicPlaying, setMusicPlaying] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const audioRef = useRef(null);

    const totalDays = useMemo(() => {
        const birthDate = new Date('2004-02-04');
        const today = new Date();
        return Math.floor((today - birthDate) / (1000 * 60 * 60 * 24));
    }, []);

    const poemLines = useMemo(() => [
        "In the tapestry of time, one name shines bright,",
        "Srimathi, my heart's guiding light.",
        "Since Sep 4, my world found its grace,",
        "In the warmth of your smile and your sweet embrace.",
        "Today is the day the stars celebrate you,",
        "And I celebrate the love that is pure and true."
    ], []);

    useEffect(() => {
        setDimensions({
            width: window.innerWidth,
            height: window.innerHeight
        });
    }, []);

    const startExperience = () => {
        if (audioRef.current) {
            audioRef.current.volume = 0.5;
            audioRef.current.play().then(() => {
                setMusicPlaying(true);
            }).catch(err => console.log("Audio failed:", err));
        }
        setPhase('birthday');
    };

    useEffect(() => {
        if (phase === 'birthday') {
            const timer = setTimeout(() => setPhase('days'), 3000);
            return () => clearTimeout(timer);
        }

        if (phase === 'days') {
            const duration = 2500;
            const startTime = Date.now();
            const timer = setInterval(() => {
                const now = Date.now();
                const progress = Math.min((now - startTime) / duration, 1);
                setDaysLived(Math.floor(progress * totalDays));
                if (progress === 1) {
                    clearInterval(timer);
                    setTimeout(() => setPhase('poem'), 1500);
                }
            }, 16);
            return () => clearInterval(timer);
        }

        if (phase === 'poem') {
            const timer = setInterval(() => {
                setCurrentLine(prev => {
                    if (prev < poemLines.length) return prev + 1;
                    clearInterval(timer);
                    setTimeout(() => setPhase('candle'), 1500);
                    return prev;
                });
            }, 1200);
            return () => clearInterval(timer);
        }

        if (phase === 'blown') {
            setShowConfetti(true);
            const timer = setTimeout(() => {
                navigate('/home');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [phase, totalDays, navigate, poemLines.length]);

    const toggleMusic = () => {
        if (audioRef.current) {
            if (musicPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setMusicPlaying(!musicPlaying);
        }
    };

    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 sm:p-12 overflow-hidden relative">
            {/* Background Music */}
            <audio ref={audioRef} loop>
                <source src="/audio/Happy-Birthday-Song-mp3.mp3" type="audio/mp3" />
                Your browser does not support the audio element.
            </audio>

            {/* Music Controls */}
            <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                onClick={toggleMusic}
                className="fixed top-5 right-5 z-50 bg-pink-600/30 hover:bg-pink-600/50 rounded-full p-3 transition-all"
            >
                {musicPlaying ? <Volume2 size={18} className="text-white" /> : <VolumeX size={18} className="text-white" />}
            </motion.button>

            {/* Confetti Effect */}
            {showConfetti && (
                <Confetti
                    width={dimensions.width}
                    height={dimensions.height}
                    recycle={false}
                    numberOfPieces={200}
                    colors={['#ec4899', '#f472b6', '#fb7185', '#f9a8d4', '#fce7f3']}
                />
            )}

            {/* Background Stars */}
            <StarsBackground />

            {/* Animated Hearts */}
            <FloatingHearts />

            {/* Shooting Stars */}
            <ShootingStars />

            <AnimatePresence mode="wait">
                <motion.div
                    key={phase}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
                    transition={{ duration: 1 }}
                    className="relative z-10 text-center max-w-4xl"
                >
                    {phase === 'interaction' && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex flex-col items-center gap-8"
                        >
                            <motion.div
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="w-24 h-24 bg-pink-500/20 rounded-full flex items-center justify-center border border-pink-500/50"
                            >
                                <Heart size={48} className="text-pink-500 fill-pink-500" />
                            </motion.div>
                            <div className="text-center space-y-4">
                                <h1 className="text-3xl sm:text-5xl font-bold text-white tracking-widest font-serif">
                                    A Special Gift for Srimathi
                                </h1>
                                <p className="text-pink-300/60 uppercase tracking-[0.3em] text-sm font-bold">
                                    Turn on volume for the best experience
                                </p>
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={startExperience}
                                className="mt-8 px-10 py-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-full font-bold text-lg shadow-[0_0_20px_rgba(236,72,153,0.4)] hover:shadow-[0_0_30px_rgba(236,72,153,0.6)] transition-all flex items-center gap-3"
                            >
                                <Music size={20} />
                                Start the Magic
                            </motion.button>
                        </motion.div>
                    )}

                    {phase === 'birthday' && (
                        <div className="space-y-8">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="text-pink-400 uppercase tracking-[0.4em] text-sm font-bold"
                            >
                                It all began on
                            </motion.div>
                            <motion.h1
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ type: "spring", delay: 0.8 }}
                                className="text-6xl sm:text-8xl font-bold text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]"
                            >
                                Feb 4, 2004
                            </motion.h1>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.5 }}
                                className="text-white/60 text-xl font-serif italic"
                            >
                                The day the stars aligned...
                            </motion.div>
                        </div>
                    )}

                    {phase === 'days' && (
                        <div className="space-y-6 sm:space-y-10">
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-pink-400 uppercase tracking-[0.4em] text-xs sm:text-sm font-bold"
                            >
                                You have blessed this earth for
                            </motion.h2>
                            <div className="text-7xl sm:text-9xl font-bold bg-gradient-to-r from-pink-400 via-rose-300 to-purple-500 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(236,72,153,0.3)]">
                                {daysLived.toLocaleString()}
                            </div>
                            <motion.h2
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="text-white/80 text-3xl sm:text-5xl font-serif italic"
                            >
                                Beautiful Days
                            </motion.h2>
                        </div>
                    )}

                    {phase === 'poem' && (
                        <div className="space-y-4 sm:space-y-8 min-h-[450px] flex flex-col justify-center">
                            <AnimatePresence>
                                {poemLines.slice(0, currentLine).map((line, index) => (
                                    <motion.p
                                        key={index}
                                        initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                        className="text-xl sm:text-3xl md:text-4xl font-serif italic text-pink-100/90 leading-relaxed"
                                    >
                                        {line}
                                    </motion.p>
                                ))}
                            </AnimatePresence>
                            {currentLine >= poemLines.length && (
                                <motion.h1
                                    initial={{ opacity: 0, scale: 0.5, letterSpacing: "0.5em" }}
                                    animate={{ opacity: 1, scale: 1, letterSpacing: "0.2em" }}
                                    className="text-6xl sm:text-8xl font-bold bg-gradient-to-r from-pink-400 to-white bg-clip-text text-transparent mt-12 drop-shadow-2xl"
                                >
                                    Srimathi
                                </motion.h1>
                            )}
                        </div>
                    )}

                    {phase === 'candle' && (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex flex-col items-center"
                        >
                            <motion.h2
                                initial={{ opacity: 0 }}
                                animate={{
                                    opacity: [0, 1, 0.5, 1],
                                    textShadow: [
                                        "0 0 10px rgba(244, 114, 182, 0.5)",
                                        "0 0 20px rgba(244, 114, 182, 0.8)",
                                        "0 0 10px rgba(244, 114, 182, 0.5)",
                                        "0 0 20px rgba(244, 114, 182, 0.8)"
                                    ]
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                                className="text-pink-400 uppercase tracking-[0.4em] text-sm font-bold mb-16"
                            >
                                Make a wish...
                            </motion.h2>

                            <motion.div
                                onClick={() => setPhase('blown')}
                                className="relative cursor-pointer group"
                                whileHover={{ scale: 1.05 }}
                            >
                                {/* Candle Glow Effect */}
                                <motion.div
                                    animate={{
                                        scale: [1, 1.2, 1],
                                        opacity: [0.4, 0.6, 0.4]
                                    }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 bg-orange-500/30 rounded-full blur-[20px]"
                                />

                                {/* Candle Body */}
                                <div className="w-8 h-40 bg-gradient-to-r from-pink-300 via-white to-pink-300 rounded-lg shadow-xl relative mt-16">
                                    <div className="absolute top-0 left-0 w-full h-4 bg-black/10 rounded-t-lg" />
                                    {/* Dripping Wax */}
                                    <div className="absolute top-4 left-2 w-2 h-8 bg-white/80 rounded-full" />
                                    <div className="absolute top-8 right-2 w-1.5 h-12 bg-white/60 rounded-full" />
                                </div>

                                {/* Wick */}
                                <div className="w-1 h-4 bg-gray-600 mx-auto -mt-44 mb-4" />

                                {/* Flame */}
                                <motion.div
                                    animate={{
                                        scale: [1, 1.1, 0.9, 1.2, 1],
                                        rotate: [-2, 2, -2, 3, -2],
                                        opacity: [0.8, 1, 0.9, 1, 0.8]
                                    }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                    className="w-8 h-14 bg-gradient-to-t from-orange-500 via-yellow-400 to-transparent rounded-full blur-[2px] mx-auto absolute -top-10 left-1/2 -translate-x-1/2 shadow-[0_0_30px_rgba(251,146,60,0.8)]"
                                />

                                {/* Interaction Prompt */}
                                <motion.div
                                    animate={{
                                        y: [0, 5, 0],
                                        opacity: [0.7, 1, 0.7]
                                    }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="absolute -bottom-20 left-1/2 -translate-x-1/2 whitespace-nowrap"
                                >
                                    <span className="text-pink-300/70 text-sm uppercase tracking-widest flex items-center gap-2">
                                        Click to blow 🌬️
                                    </span>
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    )}

                    {phase === 'blown' && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex flex-col items-center"
                        >
                            <div className="relative">
                                {/* Candle Body (Blown) */}
                                <div className="w-8 h-40 bg-gradient-to-r from-pink-300 via-white to-pink-300 rounded-lg shadow-xl relative opacity-40">
                                    <div className="absolute top-0 left-0 w-full h-4 bg-black/10 rounded-t-lg" />
                                </div>
                                {/* Smoke Effect */}
                                <motion.div
                                    initial={{ y: -20, opacity: 0, scale: 0.5 }}
                                    animate={{
                                        y: [-20, -60, -100],
                                        opacity: [0, 0.7, 0],
                                        scale: [1, 2, 3],
                                        x: [-5, 5, -10]
                                    }}
                                    transition={{ duration: 2 }}
                                    className="absolute -top-10 left-1/2 -translate-x-1/2 text-white/60"
                                >
                                    <div className="w-8 h-8 bg-white/20 rounded-full blur-[8px]"></div>
                                </motion.div>

                                <motion.div
                                    initial={{ y: -20, opacity: 0, scale: 0.5 }}
                                    animate={{
                                        y: [-20, -70, -120],
                                        opacity: [0, 0.5, 0],
                                        scale: [0.5, 1.5, 2.5],
                                        x: [5, -5, 10]
                                    }}
                                    transition={{ duration: 2.5, delay: 0.3 }}
                                    className="absolute -top-10 left-1/2 -translate-x-1/2 text-white/50"
                                >
                                    <div className="w-6 h-6 bg-white/20 rounded-full blur-[6px]"></div>
                                </motion.div>
                            </div>
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                    textShadow: [
                                        "0 0 20px rgba(244, 114, 182, 0.5)",
                                        "0 0 40px rgba(244, 114, 182, 0.8)",
                                        "0 0 20px rgba(244, 114, 182, 0.5)"
                                    ]
                                }}
                                transition={{
                                    delay: 0.5,
                                    textShadow: {
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }
                                }}
                                className="text-white text-4xl font-serif italic mt-12"
                            >
                                Your wish is granted...
                            </motion.h2>
                        </motion.div>
                    )}
                </motion.div>
            </AnimatePresence>

            {/* Bottom Icons Decoration */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="absolute bottom-10 flex gap-8 text-pink-400/50"
            >
                <Heart size={28} className="animate-pulse" />
                <Sparkles size={28} className="animate-bounce" />
                <Star size={28} className="animate-spin-slow" />
            </motion.div>
        </div>
    );
};

export default memo(Intro);
