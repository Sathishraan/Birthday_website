import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowLeft, Heart, Sparkles, MapPin, Leaf, Flower, TreePine, Sprout } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useRef, useEffect, memo } from 'react';
import FloatingHearts from '../components/FloatingHearts';
import WireLights from '../components/WireLights';
import LazyImage from '../components/LazyImage';
import { getMemoryUrl, getAudioUrl } from '../config/imageConfig';

const images = [
    {
        src: 'Snapchat-1417678720.jpg',
        caption: 'In the industrial heart of NLC, our love found its beat',
        note: 'NLC Walks',
        poem: 'Amidst the steel giants and smoky skies above,',
        poemEnd: 'we built a sanctuary of soft whispers, tenderness, and love.',
        color: '#0e1f14'
    },
    {
        src: 'Snapchat-1666608363.jpg',
        caption: 'Every road in this town reminds me of you, Srimathi',
        note: 'Daily Magic',
        poem: 'The dusty paths transformed to golden avenues bright,',
        poemEnd: 'simply because your footprints walked beside me in the light.',
        color: '#131f18'
    },
    {
        src: 'Snapchat-1679658939.jpg',
        caption: 'Your presence turns the ordinary into extraordinary',
        note: 'Industrial Charm',
        poem: 'Even the greyest factory walls burst into vibrant hue,',
        poemEnd: 'when reflected in the joy and laughter that comes from you.',
        color: '#0f1f15'
    },
    {
        src: 'Snapchat-507239231.jpg',
        caption: 'Holding onto moments that stay forever',
        note: 'Captured',
        poem: 'We froze time in the heat of the afternoon sun,',
        poemEnd: 'preserving the warmth of our bond, two hearts beating as one.',
        color: '#121f17'
    },
    {
        src: 'Snapchat-70491622.jpg',
        caption: 'Srimathi, you are my favorite view in NLC',
        note: 'Forever',
        poem: 'Let the chimneys rise high and the sirens wail loud,',
        poemEnd: 'my world is silent and perfect when you\'re around, wrapped in our cloud.',
        color: '#0d1f13'
    }
];

const NLC = () => {
    const containerRef = useRef(null);
    const audioRef = useRef(null);

    useEffect(() => {
        // Initialize audio
        audioRef.current = new Audio(getAudioUrl('poove-sempoove-male-ilaiyaraaja-k-j-yesudas_nftezGNe (1).mp3'));
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
        <div ref={containerRef} className="bg-gradient-to-b from-[#0a1410] via-[#0f1f15] to-[#0a1410] text-white overflow-x-hidden">
            {/* LED Wire Lights */}
            <WireLights color="cool" position="top" />

            {/* Floating Hearts */}
            <FloatingHearts side="both" color="pink" count={10} />
            {/* Animated Background Elements */}
            <div className="fixed inset-0 pointer-events-none opacity-20 z-0">
                {[...Array(30)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute text-emerald-300/20"
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
                        {i % 4 === 0 ? <Leaf size={20 + Math.random() * 30} /> :
                            i % 4 === 1 ? <Flower size={20 + Math.random() * 30} /> :
                                i % 4 === 2 ? <TreePine size={20 + Math.random() * 30} /> :
                                    <Sprout size={20 + Math.random() * 30} />}
                    </motion.div>
                ))}
            </div>

            {/* Fixed Header */}
            <motion.div
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className="fixed top-0 left-0 w-full p-4 sm:p-6 z-50 flex justify-between items-center bg-gradient-to-b from-black/70 via-black/40 to-transparent backdrop-blur-sm pointer-events-none"
            >
                <Link to="/roadmap" className="pointer-events-auto bg-gradient-to-br from-emerald-500/20 to-green-500/20 backdrop-blur-md p-2 sm:p-3 rounded-full hover:from-emerald-500/30 hover:to-green-500/30 transition-all duration-300 border border-emerald-400/30">
                    <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-300" />
                </Link>
                <motion.div
                    className="flex items-center gap-2 bg-gradient-to-r from-emerald-500/20 to-green-500/20 backdrop-blur-md px-3 sm:px-4 py-2 rounded-full border border-emerald-400/30"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 fill-current" />
                    <span className="font-serif italic text-sm sm:text-lg tracking-wider">NLC Memories</span>
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
                    <div className="absolute inset-0 bg-gradient-to-b from-[#0a1410]/90 via-[#0f1f15]/50 to-[#0a1410]/90" />
                    <motion.div
                        className="absolute inset-0"
                        animate={{
                            background: [
                                'radial-gradient(circle at 20% 50%, rgba(16, 185, 129, 0.12) 0%, transparent 50%)',
                                'radial-gradient(circle at 80% 50%, rgba(5, 150, 105, 0.12) 0%, transparent 50%)',
                                'radial-gradient(circle at 20% 50%, rgba(16, 185, 129, 0.12) 0%, transparent 50%)'
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
                        <Flower className="w-12 h-12 sm:w-16 sm:h-16 text-emerald-400 mx-auto mb-6 animate-pulse" />
                        <h2 className="text-emerald-400 uppercase tracking-[0.3em] sm:tracking-[0.5em] font-bold text-xs sm:text-sm mb-4">Where Steel Met Nature</h2>
                        <h1 className="text-4xl sm:text-6xl md:text-8xl font-serif font-bold mb-6 bg-gradient-to-r from-emerald-200 via-green-200 to-emerald-200 bg-clip-text text-transparent">
                            Wildflowers
                        </h1>
                        <motion.p
                            className="text-lg sm:text-xl md:text-2xl text-gray-300 italic font-serif max-w-3xl mx-auto leading-relaxed px-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 1 }}
                        >
                            In the land of iron and steam, Srimathi,<br className="hidden sm:block" />
                            our love bloomed like a wildflower—<br className="hidden sm:block" />
                            <span className="text-emerald-300">unstoppable, beautiful, eternally ours.</span>
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
                    <Sprout className="w-6 h-6 text-emerald-400" />
                    <div className="w-[1px] h-12 sm:h-16 bg-gradient-to-b from-emerald-500 to-transparent" />
                </motion.div>
            </section>

            {/* Image Gallery with Instagram Frames */}
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
                                        src={getMemoryUrl('nlc', item.src)}
                                        alt={item.caption}
                                        className="w-full h-full object-cover blur-2xl opacity-30"
                                    />
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70" />
                                <div className={`absolute inset-0 bg-gradient-to-${isEven ? 'r' : 'l'} from-transparent via-transparent to-black/60`} />
                            </motion.div>

                            {/* Floating Hearts & Nature Elements Animation */}
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
                                            <Heart size={15 + Math.random() * 35} className="text-emerald-400/40 fill-current drop-shadow-lg" />
                                        ) : i % 3 === 1 ? (
                                            <Leaf size={15 + Math.random() * 35} className="text-green-400/40 drop-shadow-lg" />
                                        ) : (
                                            <Flower size={15 + Math.random() * 35} className="text-emerald-300/40 drop-shadow-lg" />
                                        )}
                                    </motion.div>
                                ))}
                            </div>

                            {/* Instagram-Style Framed Image */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8, x: isEven ? -100 : 100, y: 50 }}
                                whileInView={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                viewport={{ once: true }}
                                className={`absolute top-1/2 -translate-y-1/2 z-30 ${isEven
                                    ? 'left-[5%] sm:left-[8%] md:left-[12%]'
                                    : 'right-[5%] sm:right-[8%] md:right-[12%]'
                                    }`}
                            >
                                {/* Industrial Nature Frame */}
                                <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-emerald-900/80 to-green-900/80 p-3">
                                    {/* Image */}
                                    <div className="w-[280px] h-[400px] sm:w-[300px] sm:h-[450px] md:w-[320px] md:h-[480px]">
                                        <LazyImage
                                            src={getMemoryUrl('nlc', item.src)}
                                            alt={item.caption}
                                            className="w-full h-full object-cover rounded-2xl"
                                        />
                                    </div>

                                    {/* Top Gradient Overlay */}
                                    <div className="absolute top-3 left-3 right-3 h-32 bg-gradient-to-b from-black/70 to-transparent rounded-t-2xl pointer-events-none" />

                                    {/* Bottom Gradient Overlay */}
                                    <div className="absolute bottom-3 left-3 right-3 h-40 bg-gradient-to-t from-black/80 to-transparent rounded-b-2xl pointer-events-none" />

                                    {/* Top Bar - Industrial Nature Style */}
                                    <div className="absolute top-6 left-6 right-6 flex items-center justify-between pointer-events-none">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center border-2 border-white">
                                                <Leaf className="w-5 h-5 text-white fill-white" />
                                            </div>
                                            <div>
                                                <p className="text-white font-bold text-sm">NLC Memories</p>
                                                <p className="text-white/80 text-xs">{item.note}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Nature Badge */}
                                    <motion.div
                                        className="absolute top-24 right-6 bg-gradient-to-br from-emerald-500 to-green-600 px-4 py-2 rounded-full flex items-center gap-2 shadow-xl pointer-events-none"
                                        initial={{ x: 50, opacity: 0 }}
                                        whileInView={{ x: 0, opacity: 1 }}
                                        transition={{ delay: 0.3 }}
                                        viewport={{ once: true }}
                                    >
                                        <Flower className="w-4 h-4 text-white" />
                                        <span className="text-white font-bold text-xs">Wildflower</span>
                                    </motion.div>

                                    {/* Bottom Content on Image */}
                                    <div className="absolute bottom-6 left-6 right-6 pointer-events-none">
                                        <div className="flex items-center gap-2 mb-2">
                                            <MapPin className="w-4 h-4 text-emerald-300" />
                                            <span className="text-emerald-200 text-xs font-bold uppercase tracking-wider">
                                                NLC Industrial Area
                                            </span>
                                        </div>
                                    </div>

                                    {/* Border Frame Effect */}
                                    <div className="absolute inset-3 rounded-2xl border-2 border-emerald-400/30 pointer-events-none" />

                                    {/* Decorative corners */}
                                    <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-emerald-400/50 rounded-tl-2xl" />
                                    <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-emerald-400/50 rounded-tr-2xl" />
                                    <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-emerald-400/50 rounded-bl-2xl" />
                                    <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-emerald-400/50 rounded-br-2xl" />

                                    {/* Industrial Pattern Overlay */}
                                    <svg className="absolute inset-3 w-[calc(100%-1.5rem)] h-[calc(100%-1.5rem)] opacity-10 pointer-events-none" viewBox="0 0 100 100">
                                        {/* Gear pattern */}
                                        <circle cx="10" cy="10" r="3" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-emerald-400" />
                                        <circle cx="90" cy="10" r="3" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-emerald-400" />
                                        <circle cx="10" cy="90" r="3" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-emerald-400" />
                                        <circle cx="90" cy="90" r="3" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-emerald-400" />

                                        {/* Nature vines */}
                                        <path d="M0,50 Q25,30 50,50 T100,50" fill="none" stroke="currentColor" strokeWidth="0.3" className="text-green-400" />
                                        <path d="M50,0 Q30,25 50,50 T50,100" fill="none" stroke="currentColor" strokeWidth="0.3" className="text-green-400" />
                                    </svg>
                                </div>
                            </motion.div>

                            {/* Content - Opposite Side */}
                            <div className={`relative z-20 w-full max-w-7xl px-4 sm:px-8 ${!isEven ? 'text-left' : 'text-right'}`}>
                                <motion.div
                                    initial={{ opacity: 0, x: !isEven ? -50 : 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.8, delay: 0.4 }}
                                    viewport={{ once: true }}
                                    className={`inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500/30 to-green-500/30 backdrop-blur-xl px-4 sm:px-6 py-2 sm:py-3 rounded-full border border-emerald-400/40 mb-4 sm:mb-6 shadow-lg`}
                                >
                                    <Leaf className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-300" />
                                    <span className="uppercase tracking-[0.2em] sm:tracking-[0.3em] font-bold text-[10px] sm:text-xs text-emerald-200">
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
                                        <p className="text-base sm:text-xl md:text-2xl font-serif italic text-emerald-200 leading-relaxed drop-shadow-2xl px-2 sm:px-0">
                                            {item.poem}
                                        </p>
                                        <motion.div
                                            className={`absolute ${!isEven ? '-left-4' : '-right-4'} top-0 text-emerald-400/30 text-4xl sm:text-6xl font-serif`}
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
                                        textShadow: '0 0 30px rgba(0,0,0,0.8), 0 0 60px rgba(16,185,129,0.3)'
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

                                {/* Decorative Leaves */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ duration: 1, delay: 1.2 }}
                                    className={`flex items-center gap-2 mt-6 sm:mt-8`}
                                    style={{ justifyContent: !isEven ? 'flex-start' : 'flex-end' }}
                                >
                                    {[...Array(5)].map((_, i) => (
                                        <motion.div
                                            key={i}
                                            animate={{
                                                scale: [1, 1.2, 1],
                                                opacity: [0.5, 1, 0.5],
                                                rotate: [0, 10, 0]
                                            }}
                                            transition={{
                                                duration: 2,
                                                repeat: Infinity,
                                                delay: i * 0.2
                                            }}
                                        >
                                            <Leaf className="w-3 h-3 md:w-4 md:h-4 text-emerald-300" />
                                        </motion.div>
                                    ))}
                                </motion.div>

                                {/* Decorative Elements */}
                                <motion.div
                                    className={`absolute ${!isEven ? 'left-0' : 'right-0'} top-1/2 -translate-y-1/2 text-emerald-400/10`}
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                >
                                    <TreePine size={window.innerWidth < 640 ? 150 : 200} />
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
                            'radial-gradient(circle at 30% 50%, rgba(16, 185, 129, 0.15) 0%, transparent 70%)',
                            'radial-gradient(circle at 70% 50%, rgba(5, 150, 105, 0.15) 0%, transparent 70%)',
                            'radial-gradient(circle at 30% 50%, rgba(16, 185, 129, 0.15) 0%, transparent 70%)'
                        ]
                    }}
                    transition={{ duration: 10, repeat: Infinity }}
                />

                <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 50 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                    className="relative z-10 p-6 sm:p-12 rounded-[2rem] sm:rounded-[3rem] bg-gradient-to-br from-emerald-500/10 via-green-500/10 to-emerald-500/10 backdrop-blur-2xl border border-emerald-400/30 max-w-3xl shadow-2xl"
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

                    <h3 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mb-4 sm:mb-6 bg-gradient-to-r from-emerald-200 via-green-200 to-emerald-200 bg-clip-text text-transparent">
                        Bloom Forever
                    </h3>

                    <p className="text-gray-300 text-base sm:text-lg md:text-xl mb-6 sm:mb-10 leading-relaxed font-serif italic px-2">
                        NLC will always hold the scent of our early laughter,<br className="hidden sm:block" />
                        the echoes of our steps, the whispers of our dreams.<br />
                        <span className="text-emerald-300">Like wildflowers in industrial soil—we thrived, we bloomed.</span>
                    </p>

                    <Link to="/roadmap">
                        <motion.button
                            whileHover={{ scale: 1.05, boxShadow: "0 20px 60px rgba(16,185,129,0.4)" }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-bold py-3 sm:py-4 px-8 sm:px-12 rounded-2xl transition-all shadow-[0_10px_40px_rgba(16,185,129,0.3)] border border-emerald-400/30 text-sm sm:text-base"
                        >
                            Next Stop
                        </motion.button>
                    </Link>
                </motion.div>

                {/* Floating Nature Elements in Final Section */}
                <div className="absolute inset-0 pointer-events-none z-0">
                    {[...Array(15)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute text-emerald-400/20"
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
                            {i % 4 === 0 ? (
                                <Heart size={20 + Math.random() * 40} fill="currentColor" />
                            ) : i % 4 === 1 ? (
                                <Leaf size={20 + Math.random() * 40} />
                            ) : i % 4 === 2 ? (
                                <Flower size={20 + Math.random() * 40} />
                            ) : (
                                <Sprout size={20 + Math.random() * 40} />
                            )}
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default memo(NLC);