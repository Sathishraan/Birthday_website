import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowLeft, Heart, Sparkles, Video, Wifi, Monitor, Smartphone, Signal } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useRef, useEffect, memo } from 'react';
import FloatingHearts from '../components/FloatingHearts';
import WireLights from '../components/WireLights';
import LazyImage from '../components/LazyImage';
import { getMemoryUrl } from '../config/imageConfig';

const images = [
    {
        src: 'Screenshot_2022-04-15-19-08-13-035_com.whatsapp.jpg',
        caption: 'Distance only makes my heart grow fonder for you, Srimathi',
        note: 'Midnight Calls',
        poem: 'Miles crumbled into mere numbers on a map,',
        poemEnd: 'when your voice crossed the distance to whisper goodnight in my lap.',
        color: '#1a0f1f'
    },
    {
        src: 'Screenshot_2022-09-24-10-21-12-802_com.whatsapp.jpg',
        caption: 'Your smile on my screen is the highlight of my day',
        note: 'Daily Connection',
        poem: 'A pixelated smile, a high-definition feeling so real,',
        poemEnd: 'making my heart race faster than the data stream\'s appeal.',
        color: '#1f1225'
    },
    {
        src: 'Screenshot_2022-04-16-17-13-26-727_com.whatsapp.jpg',
        caption: 'Hours felt like seconds when talking to you',
        note: 'Timeless',
        poem: 'The clock on the wall mocked us with its ticking sound,',
        poemEnd: 'moving too fast whenever our souls online were found.',
        color: '#1a121f'
    },
    {
        src: 'Screenshot_2022-05-05-22-09-57-284_lockscreen.jpg',
        caption: 'You are the wallpaper of my heart',
        note: 'Always There',
        poem: 'I unlock my phone just to see your radiant face,',
        poemEnd: 'and unlock my heart to let your love flood every space.',
        color: '#1f0f25'
    },
    {
        src: 'Screenshot_2022-05-20-13-04-10-362_lockscreen.jpg',
        caption: 'Keeping you close, even when far',
        note: 'Closeness',
        poem: 'In a digital world of fleeting updates and posts,',
        poemEnd: 'my love for you remains the constant I cherish most.',
        color: '#1a0f20'
    },
    {
        src: 'Screenshot_2022-05-20-13-08-34-074_lockscreen.jpg',
        caption: 'Every notification from you is a gift',
        note: 'Ping',
        poem: 'My phone buzzes, and my spirit takes flight and soars,',
        poemEnd: 'knowing that somewhere, you\'re thinking of me, opening new doors.',
        color: '#1f1530'
    },
    {
        src: 'Screenshot_2022-04-16-17-17-39-810_com.whatsapp.jpg',
        caption: 'Connection stronger than any wifi signal',
        note: 'Strong Bond',
        poem: 'Through the glitch and the lag, my heart sees clear,',
        poemEnd: 'holding onto the promise that soon you\'ll be near.',
        color: '#1a0f25'
    },
    {
        src: 'Screenshot_2022-10-04-17-21-40-821_lockscreen.jpg',
        caption: 'A digital window to my favorite soul',
        note: 'Window',
        poem: 'Screens may divide us in the physical plane,',
        poemEnd: 'but our love flows freely like digital rain.',
        color: '#1f1230'
    },
    {
        src: 'Screenshot_2023-01-01-15-22-10-038_lockscreen.jpg',
        caption: 'New Year, same timeless love',
        note: 'New Beginnings',
        poem: 'Another year turns on the calendar screen,',
        poemEnd: 'and you\'re still the most beautiful sight I\'ve seen.',
        color: '#1a0f2a'
    },
    {
        src: 'Screenshot_2023-01-01-15-22-17-874_lockscreen.jpg',
        caption: 'Celebrating us, pixel by pixel',
        note: 'Celebration',
        poem: 'No distance can dim the sparkle in your eyes,',
        poemEnd: 'a virtual celebration under the same vast skies.',
        color: '#1f1535'
    }
];

const VC = () => {
    const containerRef = useRef(null);
    const audioRef = useRef(null);

    useEffect(() => {
        // Initialize audio
        audioRef.current = new Audio('/audio/Indru Netru Naalai.mp3');
        audioRef.current.loop = true;
        audioRef.current.volume = 0.5;

        // Play audio
        const playAudio = () => {
            audioRef.current.play().catch(err => {
                console.log("Audio play failed, user interaction needed:", err);
            });
        };

        playAudio();

        // Cleanup on unmount
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const frameStyles = [
        // Frame 0: Polaroid Style
        {
            containerClass: "bg-white p-4 sm:p-6 shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500",
            imageClass: "border-4 border-gray-100",
            decorTop: <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-16 h-8 bg-gradient-to-b from-purple-200/80 to-transparent rounded-t-xl backdrop-blur-sm" />,
            decorBottom: <div className="mt-4 text-center font-handwriting text-purple-900 text-lg italic">Our Virtual Love 💜</div>
        },
        // Frame 1: Gradient Border
        {
            containerClass: "p-1 bg-gradient-to-br from-purple-500 via-pink-500 to-violet-500 rounded-3xl shadow-2xl hover:shadow-purple-500/50 transition-all duration-500",
            imageClass: "rounded-[1.4rem] border-4 border-white",
            decorTop: <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-pink-400 to-purple-600 rounded-full animate-pulse shadow-lg" />,
            decorBottom: null
        },
        // Frame 2: Neon Glow
        {
            containerClass: "p-2 bg-black rounded-2xl shadow-[0_0_30px_rgba(147,51,234,0.6),0_0_60px_rgba(168,85,247,0.4)] hover:shadow-[0_0_50px_rgba(147,51,234,0.8),0_0_100px_rgba(168,85,247,0.6)] transition-all duration-500",
            imageClass: "rounded-xl border-2 border-purple-400/50",
            decorTop: <div className="absolute -top-2 left-1/2 -translate-x-1/2 flex gap-2">
                {[...Array(3)].map((_, i) => <div key={i} className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />)}
            </div>,
            decorBottom: <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent" />
        },
        // Frame 3: Film Strip
        {
            containerClass: "bg-gradient-to-b from-gray-800 via-gray-900 to-gray-800 p-6 rounded-lg shadow-2xl border-4 border-gray-700",
            imageClass: "border-8 border-black rounded-sm",
            decorTop: <div className="absolute -top-3 left-0 right-0 flex justify-around">
                {[...Array(8)].map((_, i) => <div key={i} className="w-4 h-6 bg-gray-600 rounded-sm" />)}
            </div>,
            decorBottom: <div className="absolute -bottom-3 left-0 right-0 flex justify-around">
                {[...Array(8)].map((_, i) => <div key={i} className="w-4 h-6 bg-gray-600 rounded-sm" />)}
            </div>
        },
        // Frame 4: Vintage Gold
        {
            containerClass: "p-6 bg-gradient-to-br from-yellow-600 via-yellow-500 to-yellow-700 rounded-2xl shadow-2xl border-4 border-yellow-800 hover:scale-105 transition-transform duration-500",
            imageClass: "border-8 border-yellow-900/50 rounded-lg",
            decorTop: <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-20 h-12 bg-gradient-to-b from-yellow-400 to-yellow-600 rounded-t-full border-4 border-yellow-800" />,
            decorBottom: <div className="absolute -bottom-4 left-0 right-0 flex justify-center gap-2">
                {[...Array(5)].map((_, i) => <div key={i} className="w-2 h-2 rounded-full bg-yellow-800" />)}
            </div>
        },
        // Frame 5: Modern Minimalist
        {
            containerClass: "p-8 bg-gradient-to-br from-slate-100 to-slate-200 rounded-3xl shadow-2xl hover:shadow-purple-300/50 transition-all duration-500",
            imageClass: "rounded-2xl border border-slate-300 shadow-inner",
            decorTop: <div className="absolute -top-4 -left-4 w-16 h-16 border-4 border-purple-400 rounded-full" />,
            decorBottom: <div className="absolute -bottom-4 -right-4 w-20 h-20 border-4 border-pink-400 rounded-full opacity-50" />
        }
    ];

    return (
        <div ref={containerRef} className="bg-gradient-to-b from-[#0f0a15] via-[#1a0f25] to-[#0f0a15] text-white overflow-x-hidden">
            {/* LED Wire Lights */}
            <WireLights color="rainbow" position="top" />

            {/* Floating Hearts */}
            <FloatingHearts side="both" color="purple" count={10} />
            {/* Animated Background Elements */}
            <div className="fixed inset-0 pointer-events-none opacity-20 z-0">
                {[...Array(25)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute text-purple-300/20"
                        initial={{
                            x: Math.random() * window.innerWidth,
                            y: Math.random() * window.innerHeight
                        }}
                        animate={{
                            y: [0, -120, 0],
                            x: [0, Math.random() * 60 - 30, 0],
                            rotate: [0, 360]
                        }}
                        transition={{
                            duration: 18 + Math.random() * 12,
                            repeat: Infinity,
                            delay: Math.random() * 6,
                            ease: "linear"
                        }}
                    >
                        {i % 4 === 0 ? <Video size={20 + Math.random() * 30} /> :
                            i % 4 === 1 ? <Wifi size={20 + Math.random() * 30} /> :
                                i % 4 === 2 ? <Monitor size={20 + Math.random() * 30} /> :
                                    <Smartphone size={20 + Math.random() * 30} />}
                    </motion.div>
                ))}
            </div>

            {/* Fixed Header */}
            <motion.div
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className="fixed top-0 left-0 w-full p-4 sm:p-6 z-50 flex justify-between items-center bg-gradient-to-b from-black/70 via-black/40 to-transparent backdrop-blur-sm pointer-events-none"
            >
                <Link to="/roadmap" className="pointer-events-auto bg-gradient-to-br from-purple-500/20 to-violet-500/20 backdrop-blur-md p-2 sm:p-3 rounded-full hover:from-purple-500/30 hover:to-violet-500/30 transition-all duration-300 border border-purple-400/30">
                    <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-purple-300" />
                </Link>
                <motion.div
                    className="flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-violet-500/20 backdrop-blur-md px-3 sm:px-4 py-2 rounded-full border border-purple-400/30"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400 fill-current" />
                    <span className="font-serif italic text-sm sm:text-lg tracking-wider">Virtual Love</span>
                </motion.div>
            </motion.div>

            {/* Hero Section */}
            <section className="min-h-screen flex flex-col items-center justify-center relative px-4 sm:px-6 text-center py-20">
                <motion.div
                    className="absolute inset-0 z-0"
                    style={{
                        opacity: useTransform(smoothProgress, [0, 0.1], [1, 0])
                    }}
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-[#0f0a15]/90 via-[#1a0f25]/50 to-[#0f0a15]/90" />
                    <motion.div
                        className="absolute inset-0"
                        animate={{
                            background: [
                                'radial-gradient(circle at 20% 50%, rgba(147, 51, 234, 0.15) 0%, transparent 50%)',
                                'radial-gradient(circle at 80% 50%, rgba(168, 85, 247, 0.15) 0%, transparent 50%)',
                                'radial-gradient(circle at 20% 50%, rgba(147, 51, 234, 0.15) 0%, transparent 50%)'
                            ]
                        }}
                        transition={{ duration: 10, repeat: Infinity }}
                    />
                </motion.div>

                <div className="relative z-10 max-w-5xl">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <Video className="w-12 h-12 sm:w-16 sm:h-16 text-purple-400 mx-auto mb-6 animate-pulse" />
                        <h2 className="text-purple-400 uppercase tracking-[0.3em] sm:tracking-[0.5em] font-bold text-xs sm:text-sm mb-4">Bridging The Distance</h2>
                        <h1 className="text-4xl sm:text-6xl md:text-8xl font-serif font-bold mb-6 bg-gradient-to-r from-purple-200 via-violet-200 to-purple-200 bg-clip-text text-transparent">
                            Pixels of Love
                        </h1>
                        <motion.p
                            className="text-lg sm:text-xl md:text-2xl text-gray-300 italic font-serif max-w-3xl mx-auto leading-relaxed px-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 1 }}
                        >
                            Miles apart, but never in heart, Srimathi.<br className="hidden sm:block" />
                            Every pixel carries my love to you,<br className="hidden sm:block" />
                            <span className="text-purple-300">through screens and signals, forever true.</span>
                        </motion.p>
                    </motion.div>
                </div>

                <motion.div
                    animate={{
                        y: [0, 15, 0],
                        opacity: [0.5, 1, 0.5]
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 2,
                        ease: "easeInOut"
                    }}
                    className="absolute bottom-8 sm:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                >
                    <Signal className="w-6 h-6 text-purple-400" />
                    <div className="w-[1px] h-12 sm:h-16 bg-gradient-to-b from-purple-500 to-transparent" />
                </motion.div>
            </section>

            {/* Image Gallery with Parallax */}
            <div className="relative">
                {images.map((item, index) => {
                    const isEven = index % 2 === 0;
                    const currentFrame = frameStyles[index % frameStyles.length];

                    return (
                        <motion.div
                            key={index}
                            className="min-h-screen w-full relative overflow-hidden flex items-center justify-center py-12 sm:py-20"
                            style={{
                                backgroundColor: item.color
                            }}
                        >
                            {/* Parallax Image Background - Blurred */}
                            <motion.div
                                className="absolute inset-0 z-0"
                                style={{
                                    y: useTransform(
                                        smoothProgress,
                                        [index / images.length, (index + 1) / images.length],
                                        ['0%', '30%']
                                    )
                                }}
                            >
                                <div className="absolute inset-0 overflow-hidden">
                                    <LazyImage
                                        src={getMemoryUrl('vc', item.src)}
                                        alt={item.caption}
                                        className="w-full h-full object-cover blur-2xl opacity-30"
                                    />
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70" />
                                <div className={`absolute inset-0 bg-gradient-to-${isEven ? 'r' : 'l'} from-transparent via-transparent to-black/60`} />
                            </motion.div>

                            {/* Instagram-Style Framed Image */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8, x: isEven ? -100 : 100, y: 50 }}
                                whileInView={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                viewport={{ once: true }}
                                className={`absolute top-1/2 -translate-y-1/2 z-30 ${isEven
                                    ? 'left-[5%] sm:left-[10%] md:left-[15%]'
                                    : 'right-[5%] sm:right-[10%] md:right-[15%]'
                                    }`}
                            >
                                <div className={`relative ${currentFrame.containerClass}`}>
                                    {currentFrame.decorTop}
                                    <div className="w-[280px] h-[400px] sm:w-[320px] sm:h-[480px] md:w-[360px] md:h-[540px]">
                                        <LazyImage
                                            src={getMemoryUrl('vc', item.src)}
                                            alt={item.caption}
                                            className={`w-full h-full object-cover ${currentFrame.imageClass}`}
                                        />
                                    </div>
                                    {currentFrame.decorBottom}
                                </div>
                            </motion.div>

                            {/* Floating Hearts & Digital Elements Animation */}
                            <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
                                {[...Array(15)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{
                                            opacity: 0,
                                            y: "120%",
                                            x: `${i * 7 + Math.random() * 15}%`,
                                            rotate: Math.random() * 360
                                        }}
                                        animate={{
                                            opacity: [0, 0.7, 0.9, 0],
                                            y: "-20%",
                                            x: `${i * 7 + Math.random() * 15 + (Math.sin(i) * 12)}%`,
                                            rotate: Math.random() * 360 + 180,
                                            scale: [0.3, 1.2, 1.3, 0.4]
                                        }}
                                        transition={{
                                            duration: 7 + Math.random() * 5,
                                            repeat: Infinity,
                                            delay: Math.random() * 7,
                                            ease: "easeInOut"
                                        }}
                                        className="absolute"
                                    >
                                        {i % 4 === 0 ? (
                                            <Heart size={15 + Math.random() * 40} className="text-purple-400/40 fill-current drop-shadow-lg" />
                                        ) : i % 4 === 1 ? (
                                            <Video size={15 + Math.random() * 35} className="text-violet-400/40 drop-shadow-lg" />
                                        ) : i % 4 === 2 ? (
                                            <Wifi size={15 + Math.random() * 35} className="text-purple-300/40 drop-shadow-lg" />
                                        ) : (
                                            <Signal size={15 + Math.random() * 35} className="text-violet-300/40 drop-shadow-lg" />
                                        )}
                                    </motion.div>
                                ))}
                            </div>

                            {/* Content */}
                            <div className={`relative z-20 w-full max-w-7xl px-4 sm:px-8 ${!isEven ? 'text-left' : 'text-right'}`}>
                                <motion.div
                                    initial={{ opacity: 0, x: !isEven ? -50 : 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.8, delay: 0.4 }}
                                    viewport={{ once: true }}
                                    className={`inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/30 to-violet-500/30 backdrop-blur-xl px-4 sm:px-6 py-2 sm:py-3 rounded-full border border-purple-400/40 mb-4 sm:mb-6 shadow-lg`}
                                >
                                    <Video className="w-3 h-3 sm:w-4 sm:h-4 text-purple-300" />
                                    <span className="uppercase tracking-[0.2em] sm:tracking-[0.3em] font-bold text-[10px] sm:text-xs text-purple-200">
                                        {item.note}
                                    </span>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.6 }}
                                    viewport={{ once: true }}
                                    className="mb-3 sm:mb-6 max-w-2xl"
                                    style={{ marginLeft: !isEven ? 0 : 'auto' }}
                                >
                                    <div className="relative inline-block">
                                        <p className="text-base sm:text-xl md:text-2xl font-serif italic text-purple-200 leading-relaxed drop-shadow-2xl px-2 sm:px-0">
                                            {item.poem}
                                        </p>
                                        <motion.div
                                            className={`absolute ${!isEven ? '-left-4' : '-right-4'} top-0 text-purple-400/30 text-4xl sm:text-6xl font-serif`}
                                            animate={{ opacity: [0.3, 0.6, 0.3] }}
                                            transition={{ duration: 3, repeat: Infinity }}
                                        >
                                            "
                                        </motion.div>
                                    </div>
                                </motion.div>

                                <motion.h3
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 1, delay: 0.8 }}
                                    viewport={{ once: true }}
                                    className="text-2xl sm:text-4xl md:text-6xl font-serif font-bold text-white leading-tight drop-shadow-2xl mb-3 sm:mb-6 max-w-3xl px-2 sm:px-0"
                                    style={{
                                        marginLeft: !isEven ? 0 : 'auto',
                                        textShadow: '0 0 30px rgba(0,0,0,0.8), 0 0 60px rgba(147,51,234,0.3)'
                                    }}
                                >
                                    "{item.caption}"
                                </motion.h3>

                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 1 }}
                                    viewport={{ once: true }}
                                    className="max-w-2xl"
                                    style={{ marginLeft: !isEven ? 0 : 'auto' }}
                                >
                                    <p className="text-sm sm:text-lg md:text-xl font-serif italic text-gray-200 leading-relaxed drop-shadow-xl bg-black/30 backdrop-blur-sm px-3 sm:px-6 py-2 sm:py-4 rounded-2xl border border-white/10">
                                        {item.poemEnd}
                                    </p>
                                </motion.div>

                                {/* Signal Indicator Animation */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ duration: 1, delay: 1.2 }}
                                    className={`flex items-center gap-2 mt-6 sm:mt-8 text-purple-400/60 text-xs sm:text-sm`}
                                    style={{ justifyContent: !isEven ? 'flex-start' : 'flex-end' }}
                                >
                                    <motion.div
                                        animate={{ opacity: [0.3, 1, 0.3] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    >
                                        <Signal className="w-4 h-4" />
                                    </motion.div>
                                    <span className="font-mono">Connected • Always</span>
                                </motion.div>

                                {/* Decorative Elements */}
                                <motion.div
                                    className={`absolute ${!isEven ? 'left-0' : 'right-0'} top-1/2 -translate-y-1/2 text-purple-400/10`}
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                                >
                                    <Monitor size={window.innerWidth < 640 ? 150 : 200} />
                                </motion.div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Final Section */}
            <section className="min-h-screen flex flex-col items-center justify-center text-center px-4 sm:px-6 py-12 relative overflow-hidden">
                {/* Animated Background Gradient */}
                <motion.div
                    className="absolute inset-0 z-0"
                    animate={{
                        background: [
                            'radial-gradient(circle at 30% 50%, rgba(147, 51, 234, 0.15) 0%, transparent 70%)',
                            'radial-gradient(circle at 70% 50%, rgba(168, 85, 247, 0.15) 0%, transparent 70%)',
                            'radial-gradient(circle at 30% 50%, rgba(147, 51, 234, 0.15) 0%, transparent 70%)'
                        ]
                    }}
                    transition={{ duration: 10, repeat: Infinity }}
                />

                <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 50 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                    className="relative z-10 p-6 sm:p-12 rounded-[2rem] sm:rounded-[3rem] bg-gradient-to-br from-purple-500/10 via-violet-500/10 to-purple-500/10 backdrop-blur-2xl border border-purple-400/30 max-w-3xl shadow-2xl"
                >
                    <motion.div
                        animate={{
                            rotate: [0, 10, -10, 0],
                            scale: [1, 1.1, 1]
                        }}
                        transition={{ duration: 4, repeat: Infinity }}
                    >
                        <Sparkles className="w-10 h-10 sm:w-12 sm:h-12 text-yellow-400 mx-auto mb-6" />
                    </motion.div>

                    <h3 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mb-4 sm:mb-6 bg-gradient-to-r from-purple-200 via-violet-200 to-purple-200 bg-clip-text text-transparent">
                        Together Everywhere
                    </h3>

                    <p className="text-gray-300 text-base sm:text-lg md:text-xl mb-6 sm:mb-10 leading-relaxed font-serif italic px-2">
                        No matter where we are, Srimathi,<br className="hidden sm:block" />
                        the screen is just a window to your beautiful soul.<br />
                        <span className="text-purple-300">Distance measured in miles, connection measured in heartbeats.</span>
                    </p>

                    <Link to="/roadmap">
                        <motion.button
                            whileHover={{ scale: 1.05, boxShadow: "0 20px 60px rgba(147,51,234,0.4)" }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white font-bold py-3 sm:py-4 px-8 sm:px-12 rounded-2xl transition-all shadow-[0_10px_40px_rgba(147,51,234,0.3)] border border-purple-400/30 text-sm sm:text-base"
                        >
                            Back to Roadmap
                        </motion.button>
                    </Link>
                </motion.div>

                {/* Floating Digital Elements in Final Section */}
                <div className="absolute inset-0 pointer-events-none z-0">
                    {[...Array(20)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute text-purple-400/20"
                            initial={{
                                x: `${Math.random() * 100}%`,
                                y: '100%',
                                scale: 0
                            }}
                            animate={{
                                y: '-10%',
                                scale: [0, 1, 1, 0],
                                opacity: [0, 0.8, 0.8, 0]
                            }}
                            transition={{
                                duration: 9 + Math.random() * 5,
                                repeat: Infinity,
                                delay: Math.random() * 9,
                                ease: "easeOut"
                            }}
                        >
                            {i % 4 === 0 ? (
                                <Heart size={20 + Math.random() * 40} fill="currentColor" />
                            ) : i % 4 === 1 ? (
                                <Video size={20 + Math.random() * 40} />
                            ) : i % 4 === 2 ? (
                                <Wifi size={20 + Math.random() * 40} />
                            ) : (
                                <Signal size={20 + Math.random() * 40} />
                            )}
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default memo(VC);