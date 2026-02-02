import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowLeft, Heart, Sparkles, MapPin, Waves, Shell, Anchor } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useRef, useEffect, memo } from 'react';
import FloatingHearts from '../components/FloatingHearts';
import WireLights from '../components/WireLights';
import LazyImage from '../components/LazyImage';
import { getMemoryUrl, getAudioUrl } from '../config/imageConfig';

const images = [
    {
        src: 'IMG20240609053921.jpg',
        caption: 'The ocean waves may fade, but my love for you, Srimathi, is eternal',
        note: 'Morning Shore',
        poem: 'Like the faithful tides that kiss the shore each dawn,',
        poemEnd: 'my heart returns to you, again and again, forever drawn.',
        color: '#1a4d4d'
    },
    {
        src: 'IMG20240609053642.jpg',
        caption: 'Srimathi, you are my favorite sunset',
        note: 'Golden Sands',
        poem: 'The sky painted itself in shades of gold and rose,',
        poemEnd: 'yet no sunset could ever match the warmth your presence bestows.',
        color: '#2d3d5c'
    },
    {
        src: 'IMG20240609053356.jpg',
        caption: 'Walking beside you is the only path I want to take',
        note: 'Footprints',
        poem: 'Our footprints intertwined upon the yielding sand,',
        poemEnd: 'a temporary trail of our eternal dance, hand in hand.',
        color: '#1f3d3d'
    },
    {
        src: 'IMG20240609060905.jpg',
        caption: 'Your laughter competes with the sound of the ocean',
        note: 'Joy',
        poem: 'The ocean roared its ancient symphony of power and grace,',
        poemEnd: 'but your laughter—oh, your laughter—put the whole world in its place.',
        color: '#2a4a5a'
    },
    {
        src: 'IMG20240609061147.jpg',
        caption: 'To many more sunsets by the sea, My Love',
        note: 'Eternal',
        poem: 'As waves write love letters on the shore then fade away,',
        poemEnd: 'my love for you, Srimathi, deepens with each passing day.',
        color: '#1a3d52'
    },
    {
        src: 'Snapchat-1048524265.jpg',
        caption: 'Capturing moments in the breeze',
        note: 'Breezy',
        poem: 'The ocean breeze whispered secrets through your hair,',
        poemEnd: 'while I whispered mine—that I\'ll love you anywhere.',
        color: '#254d4d'
    },
    {
        src: 'Snapchat-2082546751.jpg',
        caption: 'Colors of the sea, colors of us',
        note: 'Vibrant',
        poem: 'Azure waters mirrored the depths of endless skies,',
        poemEnd: 'but nothing compares to the universe I see within your eyes.',
        color: '#1f4d5c'
    },
    {
        src: 'Snapchat-275298968.jpg',
        caption: 'A snapshot of pure bliss',
        note: 'Bliss',
        poem: 'In the vastness where ocean meets the endless blue above,',
        poemEnd: 'I found my infinity—wrapped in the warmth of your love.',
        color: '#2a3d4d'
    }
];

const Beach = () => {
    const containerRef = useRef(null);
    const audioRef = useRef(null);

    useEffect(() => {
        // Initialize audio
        audioRef.current = new Audio(getAudioUrl('nenjukkule-shakthisree-gopalan_7x9aNrcr.mp3'));
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

    return (
        <div ref={containerRef} className="bg-gradient-to-b from-[#0d1f26] via-[#1a3a47] to-[#0d1f26] text-white overflow-x-hidden">
            {/* LED Wire Lights */}
            <WireLights color="cool" position="top" />

            {/* Floating Hearts */}
            <FloatingHearts side="both" color="pink" count={10} />
            {/* Animated Background Elements */}
            <div className="fixed inset-0 pointer-events-none opacity-20 z-0">
                {[...Array(30)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute text-cyan-300/20"
                        initial={{
                            x: Math.random() * window.innerWidth,
                            y: Math.random() * window.innerHeight
                        }}
                        animate={{
                            y: [0, -100, 0],
                            x: [0, Math.random() * 50 - 25, 0],
                            rotate: [0, 360]
                        }}
                        transition={{
                            duration: 15 + Math.random() * 10,
                            repeat: Infinity,
                            delay: Math.random() * 5,
                            ease: "linear"
                        }}
                    >
                        {i % 3 === 0 ? <Shell size={20 + Math.random() * 30} /> :
                            i % 3 === 1 ? <Waves size={20 + Math.random() * 30} /> :
                                <Heart size={20 + Math.random() * 30} />}
                    </motion.div>
                ))}
            </div>

            {/* Fixed Header */}
            <motion.div
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className="fixed top-0 left-0 w-full p-4 sm:p-6 z-50 flex justify-between items-center bg-gradient-to-b from-black/70 via-black/40 to-transparent backdrop-blur-sm pointer-events-none"
            >
                <Link to="/roadmap" className="pointer-events-auto bg-gradient-to-br from-cyan-500/20 to-blue-500/20 backdrop-blur-md p-2 sm:p-3 rounded-full hover:from-cyan-500/30 hover:to-blue-500/30 transition-all duration-300 border border-cyan-400/30">
                    <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-300" />
                </Link>
                <motion.div
                    className="flex items-center gap-2 bg-gradient-to-r from-rose-500/20 to-pink-500/20 backdrop-blur-md px-3 sm:px-4 py-2 rounded-full border border-rose-400/30"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-rose-400 fill-current" />
                    <span className="font-serif italic text-sm sm:text-lg tracking-wider">Beach Memories</span>
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
                    <div className="absolute inset-0 bg-gradient-to-b from-[#0d1f26]/90 via-[#1a3a47]/50 to-[#0d1f26]/90" />
                    <motion.div
                        className="absolute inset-0"
                        animate={{
                            background: [
                                'radial-gradient(circle at 20% 50%, rgba(6, 182, 212, 0.1) 0%, transparent 50%)',
                                'radial-gradient(circle at 80% 50%, rgba(34, 211, 238, 0.1) 0%, transparent 50%)',
                                'radial-gradient(circle at 20% 50%, rgba(6, 182, 212, 0.1) 0%, transparent 50%)'
                            ]
                        }}
                        transition={{ duration: 8, repeat: Infinity }}
                    />
                </motion.div>

                <div className="relative z-10 max-w-5xl">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <Anchor className="w-12 h-12 sm:w-16 sm:h-16 text-cyan-400 mx-auto mb-6 animate-pulse" />
                        <h2 className="text-cyan-400 uppercase tracking-[0.3em] sm:tracking-[0.5em] font-bold text-xs sm:text-sm mb-4">Where Ocean Meets Eternity</h2>
                        <h1 className="text-4xl sm:text-6xl md:text-8xl font-serif font-bold mb-6 bg-gradient-to-r from-cyan-200 via-blue-200 to-cyan-200 bg-clip-text text-transparent">
                            Ocean of Love
                        </h1>
                        <motion.p
                            className="text-lg sm:text-xl md:text-2xl text-gray-300 italic font-serif max-w-3xl mx-auto leading-relaxed px-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 1 }}
                        >
                            The sea whispered your name to the sands, Srimathi.<br className="hidden sm:block" />
                            <span className="text-cyan-300">Every wave carries a memory, every breeze sings our story.</span>
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
                    <Waves className="w-6 h-6 text-cyan-400" />
                    <div className="w-[1px] h-12 sm:h-16 bg-gradient-to-b from-cyan-500 to-transparent" />
                </motion.div>
            </section>

            {/* Image Gallery with Landscape Instagram Frames */}
            <div className="relative">
                {images.map((item, index) => {
                    const isEven = index % 2 === 0;

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
                                        src={getMemoryUrl('beach', item.src)}
                                        alt={item.caption}
                                        className="w-full h-full object-cover blur-2xl opacity-30"
                                    />
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70" />
                                <div className={`absolute inset-0 bg-gradient-to-${isEven ? 'r' : 'l'} from-transparent via-transparent to-black/60`} />
                            </motion.div>

                            {/* Floating Hearts & Shells Animation */}
                            <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
                                {[...Array(12)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{
                                            opacity: 0,
                                            y: "120%",
                                            x: `${i * 8 + Math.random() * 15}%`,
                                            rotate: Math.random() * 360
                                        }}
                                        animate={{
                                            opacity: [0, 0.6, 0.8, 0],
                                            y: "-20%",
                                            x: `${i * 8 + Math.random() * 15 + (Math.sin(i) * 10)}%`,
                                            rotate: Math.random() * 360 + 180,
                                            scale: [0.3, 1, 1.2, 0.5]
                                        }}
                                        transition={{
                                            duration: 6 + Math.random() * 4,
                                            repeat: Infinity,
                                            delay: Math.random() * 6,
                                            ease: "easeInOut"
                                        }}
                                        className="absolute"
                                    >
                                        {i % 3 === 0 ? (
                                            <Heart size={15 + Math.random() * 35} className="text-rose-400/40 fill-current drop-shadow-lg" />
                                        ) : i % 3 === 1 ? (
                                            <Shell size={15 + Math.random() * 35} className="text-cyan-400/40 drop-shadow-lg" />
                                        ) : (
                                            <Waves size={15 + Math.random() * 35} className="text-blue-400/40 drop-shadow-lg" />
                                        )}
                                    </motion.div>
                                ))}
                            </div>

                            {/* Landscape Instagram-Style Framed Image */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8, y: 80 }}
                                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                viewport={{ once: true }}
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30"
                            >
                                {/* Coastal Landscape Frame */}
                                <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-cyan-900/80 to-blue-900/80 p-3">
                                    {/* Landscape Image with Lazy Loader */}
                                    <div className="w-[320px] h-[240px] sm:w-[480px] sm:h-[320px] md:w-[560px] md:h-[360px]">
                                        <LazyImage
                                            src={getMemoryUrl('beach', item.src)}
                                            alt={item.caption}
                                            className="w-full h-full object-contain rounded-2xl bg-black/20"
                                        />
                                    </div>

                                    {/* Top Gradient Overlay */}
                                    <div className="absolute top-3 left-3 right-3 h-28 bg-gradient-to-b from-black/70 to-transparent rounded-t-2xl pointer-events-none" />

                                    {/* Bottom Gradient Overlay */}
                                    <div className="absolute bottom-3 left-3 right-3 h-32 bg-gradient-to-t from-black/80 to-transparent rounded-b-2xl pointer-events-none" />

                                    {/* Top Bar - Beach Style */}
                                    <div className="absolute top-6 left-6 right-6 flex items-center justify-between pointer-events-none">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center border-2 border-white">
                                                <Waves className="w-5 h-5 text-white" />
                                            </div>
                                            <div>
                                                <p className="text-white font-bold text-sm">Beach Memories</p>
                                                <p className="text-white/80 text-xs">{item.note}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Ocean Badge */}
                                    <motion.div
                                        className="absolute top-20 right-6 bg-gradient-to-br from-cyan-500 to-blue-600 px-4 py-2 rounded-full flex items-center gap-2 shadow-xl pointer-events-none"
                                        initial={{ x: 50, opacity: 0 }}
                                        whileInView={{ x: 0, opacity: 1 }}
                                        transition={{ delay: 0.3 }}
                                        viewport={{ once: true }}
                                    >
                                        <Shell className="w-4 h-4 text-white" />
                                        <span className="text-white font-bold text-xs">Ocean Love</span>
                                    </motion.div>

                                    {/* Bottom Content on Image */}
                                    <div className="absolute bottom-6 left-6 right-6 pointer-events-none">
                                        <div className="flex items-center gap-2 mb-2">
                                            <MapPin className="w-4 h-4 text-cyan-300" />
                                            <span className="text-cyan-200 text-xs font-bold uppercase tracking-wider">
                                                Coastal Paradise
                                            </span>
                                        </div>
                                    </div>

                                    {/* Border Frame Effect */}
                                    <div className="absolute inset-3 rounded-2xl border-2 border-cyan-400/30 pointer-events-none" />

                                    {/* Decorative corners */}
                                    <div className="absolute top-3 left-3 w-10 h-10 border-t-2 border-l-2 border-cyan-400/50 rounded-tl-2xl" />
                                    <div className="absolute top-3 right-3 w-10 h-10 border-t-2 border-r-2 border-cyan-400/50 rounded-tr-2xl" />
                                    <div className="absolute bottom-3 left-3 w-10 h-10 border-b-2 border-l-2 border-cyan-400/50 rounded-bl-2xl" />
                                    <div className="absolute bottom-3 right-3 w-10 h-10 border-b-2 border-r-2 border-cyan-400/50 rounded-br-2xl" />

                                    {/* Wave Pattern Overlay */}
                                    <svg className="absolute inset-3 w-[calc(100%-1.5rem)] h-[calc(100%-1.5rem)] opacity-10 pointer-events-none" viewBox="0 0 100 100">
                                        {/* Wave patterns */}
                                        <path d="M0,50 Q10,45 20,50 T40,50 T60,50 T80,50 T100,50" fill="none" stroke="currentColor" strokeWidth="0.3" className="text-cyan-400" />
                                        <path d="M0,60 Q10,55 20,60 T40,60 T60,60 T80,60 T100,60" fill="none" stroke="currentColor" strokeWidth="0.3" className="text-blue-400" />
                                        <path d="M0,70 Q10,65 20,70 T40,70 T60,70 T80,70 T100,70" fill="none" stroke="currentColor" strokeWidth="0.3" className="text-cyan-400" />

                                        {/* Shell decorations */}
                                        <circle cx="15" cy="15" r="2" fill="none" stroke="currentColor" strokeWidth="0.4" className="text-cyan-400" />
                                        <circle cx="85" cy="15" r="2" fill="none" stroke="currentColor" strokeWidth="0.4" className="text-cyan-400" />
                                        <circle cx="15" cy="85" r="2" fill="none" stroke="currentColor" strokeWidth="0.4" className="text-cyan-400" />
                                        <circle cx="85" cy="85" r="2" fill="none" stroke="currentColor" strokeWidth="0.4" className="text-cyan-400" />
                                    </svg>

                                    {/* Animated wave effect */}
                                    <motion.div
                                        className="absolute bottom-3 left-3 right-3 h-1 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent rounded-full"
                                        animate={{
                                            opacity: [0.3, 0.7, 0.3],
                                            scaleX: [0.8, 1, 0.8]
                                        }}
                                        transition={{
                                            duration: 3,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }}
                                    />
                                </div>
                            </motion.div>

                            {/* Content - Below Frame */}
                            <div className="absolute bottom-[5%] left-0 right-0 z-20 px-4 sm:px-8 text-center">
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.4 }}
                                    viewport={{ once: true }}
                                    className="max-w-4xl mx-auto"
                                >
                                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 backdrop-blur-xl px-4 sm:px-6 py-2 sm:py-3 rounded-full border border-cyan-400/40 mb-4 shadow-lg">
                                        <Waves className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-300" />
                                        <span className="uppercase tracking-[0.2em] sm:tracking-[0.3em] font-bold text-[10px] sm:text-xs text-cyan-200">
                                            {item.note}
                                        </span>
                                    </div>

                                    <motion.h3
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 1, delay: 0.6 }}
                                        viewport={{ once: true }}
                                        className="text-xl sm:text-3xl md:text-4xl font-serif font-bold text-white leading-tight drop-shadow-2xl mb-3 px-2"
                                        style={{
                                            textShadow: '0 0 30px rgba(0,0,0,0.8), 0 0 60px rgba(6,182,212,0.3)'
                                        }}
                                    >
                                        "{item.caption}"
                                    </motion.h3>

                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.8, delay: 0.8 }}
                                        viewport={{ once: true }}
                                        className="max-w-2xl mx-auto"
                                    >
                                        <p className="text-sm sm:text-base md:text-lg font-serif italic text-cyan-200 leading-relaxed drop-shadow-xl bg-black/30 backdrop-blur-sm px-4 sm:px-6 py-2 sm:py-3 rounded-2xl border border-white/10 inline-block">
                                            {item.poem} {item.poemEnd}
                                        </p>
                                    </motion.div>

                                    {/* Decorative Waves */}
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        transition={{ duration: 1, delay: 1 }}
                                        className="flex items-center justify-center gap-2 mt-4"
                                    >
                                        {[...Array(5)].map((_, i) => (
                                            <motion.div
                                                key={i}
                                                animate={{
                                                    y: [0, -5, 0],
                                                    opacity: [0.5, 1, 0.5]
                                                }}
                                                transition={{
                                                    duration: 2,
                                                    repeat: Infinity,
                                                    delay: i * 0.2
                                                }}
                                            >
                                                <Waves className="w-3 h-3 md:w-4 md:h-4 text-cyan-300" />
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                </motion.div>

                                {/* Decorative Shell Element */}
                                <motion.div
                                    className="absolute left-[10%] top-1/2 -translate-y-1/2 text-cyan-400/10 hidden lg:block"
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                                >
                                    <Shell size={120} />
                                </motion.div>

                                <motion.div
                                    className="absolute right-[10%] top-1/2 -translate-y-1/2 text-blue-400/10 hidden lg:block"
                                    animate={{ rotate: -360 }}
                                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                                >
                                    <Anchor size={120} />
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
                            'radial-gradient(circle at 30% 50%, rgba(6, 182, 212, 0.15) 0%, transparent 70%)',
                            'radial-gradient(circle at 70% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 70%)',
                            'radial-gradient(circle at 30% 50%, rgba(6, 182, 212, 0.15) 0%, transparent 70%)'
                        ]
                    }}
                    transition={{ duration: 10, repeat: Infinity }}
                />

                <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 50 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                    className="relative z-10 p-6 sm:p-12 rounded-[2rem] sm:rounded-[3rem] bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-cyan-500/10 backdrop-blur-2xl border border-cyan-400/30 max-w-3xl shadow-2xl"
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

                    <h3 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mb-4 sm:mb-6 bg-gradient-to-r from-cyan-200 via-blue-200 to-cyan-200 bg-clip-text text-transparent">
                        Eternal Waves of Love
                    </h3>

                    <p className="text-gray-300 text-base sm:text-lg md:text-xl mb-6 sm:mb-10 leading-relaxed font-serif italic px-2">
                        Like the endless ocean that stretches beyond the horizon,<br className="hidden sm:block" />
                        my love for you, Srimathi, knows no bounds.<br />
                        <span className="text-cyan-300">Forever and always, by your side.</span>
                    </p>

                    <Link to="/roadmap">
                        <motion.button
                            whileHover={{ scale: 1.05, boxShadow: "0 20px 60px rgba(6,182,212,0.4)" }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold py-3 sm:py-4 px-8 sm:px-12 rounded-2xl transition-all shadow-[0_10px_40px_rgba(6,182,212,0.3)] border border-cyan-400/30 text-sm sm:text-base"
                        >
                            Continue Our Journey
                        </motion.button>
                    </Link>
                </motion.div>

                {/* Floating Hearts in Final Section */}
                <div className="absolute inset-0 pointer-events-none z-0">
                    {[...Array(15)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute text-rose-400/20"
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
                                duration: 8 + Math.random() * 4,
                                repeat: Infinity,
                                delay: Math.random() * 8,
                                ease: "easeOut"
                            }}
                        >
                            <Heart size={20 + Math.random() * 40} fill="currentColor" />
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default memo(Beach);