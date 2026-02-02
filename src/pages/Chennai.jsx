import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowLeft, Heart, MapPin, Camera, Star, Flower2, Bus, MapPinned, Navigation } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useRef, useEffect, memo } from 'react';
import FloatingHearts from '../components/FloatingHearts';
import WireLights from '../components/WireLights';
import LazyImage from '../components/LazyImage';
import { getMemoryUrl, getAudioUrl } from '../config/imageConfig';

const busStops = [
    {
        src: 'IMG20250906192022.jpg',
        stopName: 'First Glance Station',
        stopNumber: '01',
        time: '6:00 PM',
        caption: 'The way you look at the world makes everything brighter',
        location: 'Chennai Central',
        poem: 'In the city of lights and endless dreams,',
        poemEnd: 'you became the brightest star my heart has ever seen.',
        color: '#1a0e1f',
        accentColor: '#db2777'
    },
    {
        src: 'IMG20250906200041.jpg',
        stopName: 'Crowded Hearts Stop',
        stopNumber: '02',
        time: '8:00 PM',
        caption: 'In every crowd, my eyes only search for you',
        location: 'Marina Beach',
        poem: 'Thousands of faces passed by like fleeting shadows,',
        poemEnd: 'but yours was the only one that made time stand still.',
        color: '#1f1520',
        accentColor: '#ec4899'
    },
    {
        src: 'IMG20260107170809.jpg',
        stopName: 'Golden Memories Junction',
        stopNumber: '03',
        time: '5:30 PM',
        caption: 'You are the magic in my everyday life',
        location: 'T. Nagar',
        poem: 'The sun dipped low, painting the sky in gold,',
        poemEnd: 'yet your smile outshone every color the evening could hold.',
        color: '#251a1f',
        accentColor: '#f472b6'
    },
    {
        src: 'IMG20260107180559.jpg',
        stopName: 'Hand-in-Hand Boulevard',
        stopNumber: '04',
        time: '6:05 PM',
        caption: 'Holding your hand is my favorite place to be',
        location: 'Besant Nagar',
        poem: 'Our fingers intertwined, a perfect fit,',
        poemEnd: 'two souls woven together, refusing to split.',
        color: '#1f1225',
        accentColor: '#db2777'
    },
    {
        src: 'IMG20260107180624.jpg',
        stopName: 'Laughter Avenue',
        stopNumber: '05',
        time: '6:06 PM',
        caption: 'Your laughter is the only melody I need',
        location: 'Mylapore',
        poem: 'The city hummed its symphony of chaos and sound,',
        poemEnd: 'but your laughter was the sweetest music I ever found.',
        color: '#1a1520',
        accentColor: '#ec4899'
    },
    {
        src: 'IMG20260107180651.jpg',
        stopName: 'Forever Boulevard',
        stopNumber: '06',
        time: '6:06 PM',
        caption: 'Every second with you is a blessing',
        location: 'Adyar',
        poem: 'Time becomes meaningless when you are near,',
        poemEnd: 'every heartbeat whispers: I want you here, always here.',
        color: '#201a25',
        accentColor: '#f472b6'
    },
    {
        src: 'IMG20260107181432.jpg',
        stopName: 'Destination: My Heart',
        stopNumber: '07',
        time: '6:14 PM',
        caption: 'To the girl who owns my heart - Happy Birthday!',
        location: 'ECR Beach Road',
        poem: 'On this day, the universe gifted me perfection,',
        poemEnd: 'you, Srimathi—my love, my light, my everything, my reflection.',
        color: '#1f1630',
        accentColor: '#db2777'
    }
];

const Chennai = () => {
    const containerRef = useRef(null);
    const audioRef = useRef(null);

    useEffect(() => {
        // Initialize audio
        audioRef.current = new Audio(getAudioUrl('aagasa-veeran-santhosh-narayanan-pradeep-kumar_V67QLyU7.mp3'));
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
        <div ref={containerRef} className="bg-gradient-to-b from-[#0f0a15] via-[#1a0e24] to-[#0f0a15] text-white overflow-x-hidden">
            {/* LED Wire Lights */}
            <WireLights color="pink" position="top" />

            {/* Floating Hearts */}
            <FloatingHearts side="both" color="multi" count={12} />

            {/* Fixed Header */}
            <motion.div
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className="fixed top-0 left-0 w-full p-4 sm:p-6 z-50 flex justify-between items-center bg-gradient-to-b from-black/70 via-black/40 to-transparent backdrop-blur-sm pointer-events-none"
            >
                <Link to="/roadmap" className="pointer-events-auto bg-gradient-to-br from-pink-500/20 to-purple-500/20 backdrop-blur-md p-2 sm:p-3 rounded-full hover:from-pink-500/30 hover:to-purple-500/30 transition-all duration-300 border border-pink-400/30">
                    <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-pink-300" />
                </Link>
                <motion.div
                    className="flex items-center gap-2 bg-gradient-to-r from-pink-500/20 to-rose-500/20 backdrop-blur-md px-3 sm:px-4 py-2 rounded-full border border-pink-400/30"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <Bus className="w-4 h-4 sm:w-5 sm:h-5 text-pink-400" />
                    <span className="font-serif italic text-sm sm:text-lg tracking-wider">Route to Srimathi's Heart</span>
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
                    <div className="absolute inset-0 bg-cover bg-center opacity-20 grayscale" style={{ backgroundImage: `url(${getMemoryUrl('chennai', 'IMG20250906192022.jpg')})` }} />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#0f0a15]/90 via-[#1a0e24]/50 to-[#0f0a15]/90" />
                </motion.div>

                <div className="relative z-10 max-w-5xl">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <Bus className="w-12 h-12 sm:w-16 sm:h-16 text-pink-400 mx-auto mb-6 animate-pulse" />
                        <h2 className="text-pink-400 uppercase tracking-[0.3em] sm:tracking-[0.5em] font-bold text-xs sm:text-sm mb-4">Our Love Route</h2>
                        <h1 className="text-4xl sm:text-6xl md:text-8xl font-serif font-bold mb-6 bg-gradient-to-r from-pink-200 via-rose-200 to-pink-200 bg-clip-text text-transparent">
                            Chennai Bus Route
                        </h1>
                        <motion.p
                            className="text-lg sm:text-xl md:text-2xl text-gray-300 italic font-serif max-w-3xl mx-auto leading-relaxed px-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 1 }}
                        >
                            Every stop on this route leads me closer to you, Srimathi.<br className="hidden sm:block" />
                            <span className="text-pink-300">A journey through our most precious moments.</span>
                        </motion.p>
                    </motion.div>
                </div>

                {/* Bus Route Progress */}
                <motion.div
                    className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-2"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 }}
                >
                    {busStops.map((stop, i) => (
                        <motion.div
                            key={i}
                            className="flex items-center gap-3"
                            whileHover={{ scale: 1.1 }}
                        >
                            <span className="text-xs text-pink-300">{stop.stopName}</span>
                            <div className="w-3 h-3 rounded-full bg-pink-500 border-2 border-pink-300" />
                        </motion.div>
                    ))}
                </motion.div>

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
                    <span className="text-[10px] uppercase tracking-widest text-pink-400">Next Stop</span>
                    <div className="w-[1px] h-12 sm:h-16 bg-gradient-to-b from-pink-500 to-transparent" />
                </motion.div>
            </section>

            {/* Bus Stops with Instagram Frames */}
            <div className="relative">
                {busStops.map((stop, index) => {
                    const isEven = index % 2 === 0;

                    return (
                        <motion.div
                            key={index}
                            className="min-h-screen w-full relative overflow-hidden flex items-center justify-center py-12 sm:py-20"
                            style={{
                                backgroundColor: stop.color
                            }}
                        >
                            {/* Animated Route Line */}
                            <motion.div
                                className="absolute left-1/2 top-0 w-1 h-full bg-gradient-to-b from-pink-500/50 via-pink-400/50 to-pink-500/50 hidden lg:block"
                                initial={{ scaleY: 0 }}
                                whileInView={{ scaleY: 1 }}
                                transition={{ duration: 1.5, delay: 0.3 }}
                                viewport={{ once: true }}
                            />

                            {/* Bus Stop Marker - Center */}
                            <motion.div
                                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-40 hidden lg:block"
                                initial={{ scale: 0, rotate: -180 }}
                                whileInView={{ scale: 1, rotate: 0 }}
                                transition={{ duration: 0.6, delay: 0.5 }}
                                viewport={{ once: true }}
                            >
                                <div className="relative">
                                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center border-4 border-white shadow-2xl">
                                        <span className="text-2xl font-bold text-white">{stop.stopNumber}</span>
                                    </div>
                                    <motion.div
                                        className="absolute inset-0 rounded-full border-4 border-pink-400"
                                        animate={{ scale: [1, 1.3, 1], opacity: [1, 0, 1] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    />
                                </div>
                            </motion.div>

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
                                {/* Snapchat-Style Frame */}
                                <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-white p-2">
                                    {/* Image with Lazy Loader */}
                                    <div className="w-[280px] h-[400px] sm:w-[300px] sm:h-[450px] md:w-[320px] md:h-[480px]">
                                        <LazyImage
                                            src={getMemoryUrl('chennai', stop.src)}
                                            alt={stop.caption}
                                            className="w-full h-full object-cover rounded-2xl"
                                        />
                                    </div>

                                    {/* Top Gradient Overlay */}
                                    <div className="absolute top-2 left-2 right-2 h-32 bg-gradient-to-b from-black/70 to-transparent rounded-t-2xl pointer-events-none" />

                                    {/* Bottom Gradient Overlay */}
                                    <div className="absolute bottom-2 left-2 right-2 h-40 bg-gradient-to-t from-black/80 to-transparent rounded-b-2xl pointer-events-none" />

                                    {/* Top Bar - Snapchat Style */}
                                    <div className="absolute top-6 left-6 right-6 flex items-center justify-between pointer-events-none">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center border-2 border-white">
                                                <Heart className="w-5 h-5 text-white fill-white" />
                                            </div>
                                            <div>
                                                <p className="text-white font-bold text-sm">Srimathi & You</p>
                                                <p className="text-white/80 text-xs">{stop.location}</p>
                                            </div>
                                        </div>
                                        <div className="text-white text-xs font-semibold bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm">
                                            {stop.time}
                                        </div>
                                    </div>

                                    {/* Bus Stop Badge */}
                                    <motion.div
                                        className="absolute top-24 right-6 bg-gradient-to-br from-pink-500 to-rose-600 px-4 py-2 rounded-full flex items-center gap-2 shadow-xl pointer-events-none"
                                        initial={{ x: 50, opacity: 0 }}
                                        whileInView={{ x: 0, opacity: 1 }}
                                        transition={{ delay: 0.3 }}
                                        viewport={{ once: true }}
                                    >
                                        <MapPinned className="w-4 h-4 text-white" />
                                        <span className="text-white font-bold text-xs">Stop {stop.stopNumber}</span>
                                    </motion.div>

                                    {/* Bottom Content on Image */}
                                    <div className="absolute bottom-6 left-6 right-6 pointer-events-none">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Navigation className="w-4 h-4 text-pink-400" />
                                            <span className="text-pink-300 text-xs font-bold uppercase tracking-wider">
                                                {stop.stopName}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Border Frame Effect */}
                                    <div className="absolute inset-2 rounded-2xl border-2 border-white/20 pointer-events-none" />
                                </div>
                            </motion.div>

                            {/* Content - Opposite Side */}
                            <div className={`relative z-20 w-full max-w-7xl px-4 sm:px-8 ${!isEven ? 'text-left' : 'text-right'}`}>
                                <motion.div
                                    initial={{ opacity: 0, x: !isEven ? -50 : 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.8, delay: 0.4 }}
                                    viewport={{ once: true }}
                                    className={`inline-flex items-center gap-2 bg-gradient-to-r from-pink-500/30 to-rose-500/30 backdrop-blur-xl px-4 sm:px-6 py-2 sm:py-3 rounded-full border border-pink-400/40 mb-4 sm:mb-6 shadow-lg`}
                                >
                                    <Bus className="w-3 h-3 sm:w-4 sm:h-4 text-pink-300" />
                                    <span className="uppercase tracking-[0.2em] sm:tracking-[0.3em] font-bold text-[10px] sm:text-xs text-pink-200">
                                        {stop.stopName}
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
                                        <p className="text-base sm:text-xl md:text-2xl font-serif italic text-pink-200 leading-relaxed drop-shadow-2xl px-2 sm:px-0">
                                            {stop.poem}
                                        </p>
                                        <motion.div
                                            className={`absolute ${!isEven ? '-left-4' : '-right-4'} top-0 text-pink-400/30 text-4xl sm:text-6xl font-serif`}
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
                                        textShadow: '0 0 30px rgba(0,0,0,0.8), 0 0 60px rgba(219,39,119,0.3)'
                                    }}
                                >
                                    "{stop.caption}"
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
                                        {stop.poemEnd}
                                    </p>
                                </motion.div>

                                {/* Location & Time Info */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ duration: 1, delay: 1.2 }}
                                    className={`flex items-center gap-4 mt-6 sm:mt-8 text-pink-400/80 text-xs sm:text-sm flex-wrap`}
                                    style={{ justifyContent: !isEven ? 'flex-start' : 'flex-end' }}
                                >
                                    <div className="flex items-center gap-2 bg-pink-500/20 px-3 py-1 rounded-full backdrop-blur-sm">
                                        <MapPin className="w-4 h-4" />
                                        <span className="font-mono">{stop.location}</span>
                                    </div>
                                    <div className="flex items-center gap-2 bg-pink-500/20 px-3 py-1 rounded-full backdrop-blur-sm">
                                        <Camera className="w-4 h-4" />
                                        <span className="font-mono">{stop.time}</span>
                                    </div>
                                </motion.div>

                                {/* Decorative Elements */}
                                <motion.div
                                    className={`absolute ${!isEven ? 'left-0' : 'right-0'} top-1/2 -translate-y-1/2 text-pink-400/10`}
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                                >
                                    <Bus size={window.innerWidth < 640 ? 150 : 200} />
                                </motion.div>
                            </div>

                            {/* Mobile Bus Stop Number */}
                            <motion.div
                                className="absolute top-8 left-1/2 -translate-x-1/2 lg:hidden z-50"
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                transition={{ duration: 0.5 }}
                                viewport={{ once: true }}
                            >
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center border-4 border-white shadow-xl">
                                    <span className="text-xl font-bold text-white">{stop.stopNumber}</span>
                                </div>
                            </motion.div>

                            {/* Floating Hearts Animation */}
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
                                            scale: [0.3, 1, 1.2, 0.4]
                                        }}
                                        transition={{
                                            duration: 8 + Math.random() * 4,
                                            repeat: Infinity,
                                            delay: Math.random() * 8,
                                            ease: "easeInOut"
                                        }}
                                        className="absolute"
                                    >
                                        {i % 3 === 0 ? (
                                            <Heart size={15 + Math.random() * 35} className="text-pink-400/40 fill-current drop-shadow-lg" />
                                        ) : i % 3 === 1 ? (
                                            <MapPin size={15 + Math.random() * 30} className="text-rose-400/40 drop-shadow-lg" />
                                        ) : (
                                            <Star size={15 + Math.random() * 30} className="text-pink-300/40 drop-shadow-lg" />
                                        )}
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Final Section */}
            <section className="min-h-screen flex flex-col items-center justify-center text-center px-4 sm:px-6 py-12 relative overflow-hidden">
                <motion.div
                    className="absolute inset-0 z-0"
                    animate={{
                        background: [
                            'radial-gradient(circle at 30% 50%, rgba(219, 39, 119, 0.15) 0%, transparent 70%)',
                            'radial-gradient(circle at 70% 50%, rgba(236, 72, 153, 0.15) 0%, transparent 70%)',
                            'radial-gradient(circle at 30% 50%, rgba(219, 39, 119, 0.15) 0%, transparent 70%)'
                        ]
                    }}
                    transition={{ duration: 10, repeat: Infinity }}
                />

                <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 50 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                    className="relative z-10 p-6 sm:p-12 rounded-[2rem] sm:rounded-[3rem] bg-gradient-to-br from-pink-500/10 via-rose-500/10 to-pink-500/10 backdrop-blur-2xl border border-pink-400/30 max-w-3xl shadow-2xl"
                >
                    <motion.div
                        animate={{
                            rotate: [0, 10, -10, 0],
                            scale: [1, 1.1, 1]
                        }}
                        transition={{ duration: 4, repeat: Infinity }}
                    >
                        <Bus className="w-10 h-10 sm:w-12 sm:h-12 text-pink-400 mx-auto mb-6" />
                    </motion.div>

                    <h3 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mb-4 sm:mb-6 bg-gradient-to-r from-pink-200 via-rose-200 to-pink-200 bg-clip-text text-transparent">
                        Final Destination: Forever
                    </h3>

                    <p className="text-gray-300 text-base sm:text-lg md:text-xl mb-6 sm:mb-10 leading-relaxed font-serif italic px-2">
                        This Chennai bus route was just the beginning, Srimathi.<br className="hidden sm:block" />
                        Every stop, every moment brought me closer to you.<br />
                        <span className="text-pink-300">And the journey? It never ends when we're together.</span>
                    </p>

                    <Link to="/roadmap">
                        <motion.button
                            whileHover={{ scale: 1.05, boxShadow: "0 20px 60px rgba(219,39,119,0.4)" }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white font-bold py-3 sm:py-4 px-8 sm:px-12 rounded-2xl transition-all shadow-[0_10px_40px_rgba(219,39,119,0.3)] border border-pink-400/30 text-sm sm:text-base"
                        >
                            Return to Roadmap
                        </motion.button>
                    </Link>
                </motion.div>

                <motion.footer
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-8 sm:mt-12 text-gray-600 flex items-center gap-2"
                >
                    <Camera className="w-4 h-4" />
                    <span className="text-xs uppercase tracking-widest font-bold">Every Route Leads to You</span>
                </motion.footer>
            </section>
        </div>
    );
};

export default memo(Chennai);