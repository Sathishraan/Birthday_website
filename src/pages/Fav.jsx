import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowLeft, Heart, Sparkles, Star, Flower2, Music } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useRef, useEffect, memo } from 'react';
import FloatingHearts from '../components/FloatingHearts';
import WireLights from '../components/WireLights';
import LazyImage from '../components/LazyImage';
import { getMemoryUrl } from '../config/imageConfig';

const images = [
    {
        src: '441b5db9e56d520ccab7003f191bdff3.jpg',
        caption: 'You are the masterpiece my heart painted',
        note: 'Soul Connection',
        poem: 'In a world full of temporary things,',
        poemEnd: 'you are my forever feeling, my eternal spring.',
        bgColor: 'from-rose-900/40 via-pink-800/30 to-purple-900/40',
        accentColor: 'rose'
    },
    {
        src: 'IMG-20220930-WA0009.jpg',
        caption: 'Every laugh with you is a treasure',
        note: 'Pure Joy',
        poem: 'Your laughter is the melody that plays in my soul,',
        poemEnd: 'a symphony of happiness that makes me whole.',
        bgColor: 'from-amber-900/40 via-orange-800/30 to-red-900/40',
        accentColor: 'amber'
    },
    {
        src: 'IMG-20220930-WA0016.jpg',
        caption: 'My universe exists in your eyes',
        note: 'Infinite Love',
        poem: 'When I look into your eyes, I see tomorrow,',
        poemEnd: 'a future where joy outweighs every sorrow.',
        bgColor: 'from-violet-900/40 via-fuchsia-800/30 to-pink-900/40',
        accentColor: 'violet'
    },
    {
        src: 'IMG-20220930-WA0018.jpg',
        caption: 'Authentic, raw, beautifully us',
        note: 'Real Love',
        poem: 'No masks, no pretense, just two hearts beating,',
        poemEnd: 'in perfect rhythm, our love story completing.',
        bgColor: 'from-pink-900/40 via-rose-800/30 to-red-900/40',
        accentColor: 'pink'
    },
    {
        src: 'IMG20230524180222.jpg',
        caption: 'Your smile is my favorite sunrise',
        note: 'Radiance',
        poem: 'You carry sunshine in your smile,',
        poemEnd: 'making every moment with you worthwhile.',
        bgColor: 'from-yellow-900/40 via-amber-800/30 to-orange-900/40',
        accentColor: 'yellow'
    },
    {
        src: 'IMG20250608142516.jpg',
        caption: 'Building forever, one moment at a time',
        note: 'Our Future',
        poem: 'Every second with you writes our story,',
        poemEnd: 'a tale of love, laughter, and endless glory.',
        bgColor: 'from-sky-900/40 via-blue-800/30 to-indigo-900/40',
        accentColor: 'sky'
    },
    {
        src: 'IMG_20211231_204507.jpg',
        caption: 'Counting down to forever with you',
        note: 'Timeless',
        poem: 'As one year ends and another begins,',
        poemEnd: 'my love for you eternally spins.',
        bgColor: 'from-indigo-900/40 via-purple-800/30 to-pink-900/40',
        accentColor: 'indigo'
    },
    {
        src: 'IMG_20220115_173605.jpg',
        caption: 'Every day feels like a celebration',
        note: 'Festival of Love',
        poem: 'Life is a festival when you are near,',
        poemEnd: 'filling every moment with joy and cheer.',
        bgColor: 'from-red-900/40 via-orange-800/30 to-yellow-900/40',
        accentColor: 'red'
    },
    {
        src: 'Screenshot_2022-10-08-07-32-38-727_com.miui.home.jpg',
        caption: 'You are my home, my everything',
        note: 'Home',
        poem: 'Home is not a place, it is a feeling,',
        poemEnd: 'and with you, my heart is always healing.',
        bgColor: 'from-emerald-900/40 via-teal-800/30 to-cyan-900/40',
        accentColor: 'emerald'
    },
    {
        src: 'Snapchat-952806695.jpg',
        caption: 'Love wrapped in laughter and silly moments',
        note: 'Playful Hearts',
        poem: 'We don\'t need perfection to be perfect,',
        poemEnd: 'our imperfect moments make love worth it.',
        bgColor: 'from-fuchsia-900/40 via-pink-800/30 to-rose-900/40',
        accentColor: 'fuchsia'
    },
    {
        src: 'f099f2055ce2df0d098d240b385d5472.jpg',
        caption: 'You are poetry in motion',
        note: 'Living Art',
        poem: 'If beauty were a language, you\'d be the words,',
        poemEnd: 'a masterpiece more precious than anything heard.',
        bgColor: 'from-purple-900/40 via-violet-800/30 to-fuchsia-900/40',
        accentColor: 'purple'
    },
    {
        src: 'kmc_20220108_093437.jpg',
        caption: 'In focus: you. Always you.',
        note: 'Crystal Clear',
        poem: 'The world may blur, but you remain sharp,',
        poemEnd: 'the melody to which my heart will always harp.',
        bgColor: 'from-cyan-900/40 via-blue-800/30 to-indigo-900/40',
        accentColor: 'cyan'
    }
];

const accentColors = {
    rose: { border: 'border-rose-400/40', text: 'text-rose-300', bg: 'bg-rose-500/20', glow: 'shadow-rose-500/30' },
    amber: { border: 'border-amber-400/40', text: 'text-amber-300', bg: 'bg-amber-500/20', glow: 'shadow-amber-500/30' },
    violet: { border: 'border-violet-400/40', text: 'text-violet-300', bg: 'bg-violet-500/20', glow: 'shadow-violet-500/30' },
    pink: { border: 'border-pink-400/40', text: 'text-pink-300', bg: 'bg-pink-500/20', glow: 'shadow-pink-500/30' },
    yellow: { border: 'border-yellow-400/40', text: 'text-yellow-300', bg: 'bg-yellow-500/20', glow: 'shadow-yellow-500/30' },
    sky: { border: 'border-sky-400/40', text: 'text-sky-300', bg: 'bg-sky-500/20', glow: 'shadow-sky-500/30' },
    indigo: { border: 'border-indigo-400/40', text: 'text-indigo-300', bg: 'bg-indigo-500/20', glow: 'shadow-indigo-500/30' },
    red: { border: 'border-red-400/40', text: 'text-red-300', bg: 'bg-red-500/20', glow: 'shadow-red-500/30' },
    emerald: { border: 'border-emerald-400/40', text: 'text-emerald-300', bg: 'bg-emerald-500/20', glow: 'shadow-emerald-500/30' },
    fuchsia: { border: 'border-fuchsia-400/40', text: 'text-fuchsia-300', bg: 'bg-fuchsia-500/20', glow: 'shadow-fuchsia-500/30' },
    purple: { border: 'border-purple-400/40', text: 'text-purple-300', bg: 'bg-purple-500/20', glow: 'shadow-purple-500/30' },
    cyan: { border: 'border-cyan-400/40', text: 'text-cyan-300', bg: 'bg-cyan-500/20', glow: 'shadow-cyan-500/30' }
};

const ImageSection = memo(({ item, index, colors }) => {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
    const opacityTransform = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);

    const isEven = index % 2 === 0;

    return (
        <div ref={sectionRef} className="min-h-screen w-full relative overflow-hidden flex items-center justify-center py-20">
            {/* Parallax Background - Blurred */}
            <motion.div
                style={{ scale, y }}
                className="absolute inset-0 z-0"
            >
                <div className="absolute inset-0 w-full h-full">
                    <LazyImage
                        src={getMemoryUrl('fav', item.src)}
                        alt={item.caption}
                        className="w-full h-full object-cover blur-2xl opacity-20"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-b ${item.bgColor} opacity-40`} />
                    <div className="absolute inset-0 bg-black/60" />
                </div>
            </motion.div>

            {/* Floating Hearts Animation */}
            <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
                {[...Array(12)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: "110%", x: `${i * 8 + Math.random() * 10}%` }}
                        animate={{
                            opacity: [0, 0.6, 0],
                            y: "-20%",
                            x: `${i * 8 + Math.random() * 10 + (Math.random() - 0.5) * 20}%`,
                            rotate: [0, 360],
                            scale: [0.3, 1, 0.5]
                        }}
                        transition={{
                            duration: 6 + Math.random() * 6,
                            repeat: Infinity,
                            delay: Math.random() * 6,
                            ease: "easeInOut"
                        }}
                        className={`absolute ${colors.text}`}
                    >
                        <Heart size={15 + Math.random() * 40} fill="currentColor" />
                    </motion.div>
                ))}
            </div>

            {/* Content Container */}
            <div className={`relative z-20 w-full max-w-7xl px-4 sm:px-8 flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center justify-between gap-12`}>

                {/* Instagram-Style Framed Image */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, x: isEven ? -100 : 100 }}
                    whileInView={{ opacity: 1, scale: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="w-full md:w-1/2 flex justify-center"
                >
                    <div className={`relative rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-pink-900/40 to-purple-900/40 p-3 border border-white/10 group`}>
                        {/* Image */}
                        <div className="w-[280px] h-[380px] sm:w-[320px] sm:h-[420px] md:w-[350px] md:h-[480px]">
                            <LazyImage
                                src={getMemoryUrl('fav', item.src)}
                                alt={item.caption}
                                className="w-full h-full object-cover rounded-2xl transition-transform duration-300 group-hover:scale-102"
                            />
                        </div>

                        {/* Top Gradient Overlay */}
                        <div className="absolute top-3 left-3 right-3 h-24 bg-gradient-to-b from-black/60 to-transparent rounded-t-2xl pointer-events-none" />

                        {/* Bottom Gradient Overlay */}
                        <div className="absolute bottom-3 left-3 right-3 h-32 bg-gradient-to-t from-black/70 to-transparent rounded-b-2xl pointer-events-none" />

                        {/* Top Bar */}
                        <div className="absolute top-6 left-6 right-6 flex items-center justify-between pointer-events-none">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center border-2 border-white shadow-lg">
                                    <Heart className="w-4 h-4 text-white fill-current" />
                                </div>
                                <div>
                                    <p className="text-white font-bold text-xs">Favorite Moment</p>
                                    <p className="text-white/70 text-[10px]">{item.note}</p>
                                </div>
                            </div>
                        </div>

                        {/* Special Badge */}
                        <motion.div
                            className="absolute top-20 right-6 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1.5 border border-white/30 shadow-xl pointer-events-none"
                            initial={{ x: 30, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            <Sparkles className="w-3 h-3 text-yellow-300" />
                            <span className="text-white font-bold text-[10px]">Cherished</span>
                        </motion.div>

                        {/* Bottom Tag */}
                        <div className="absolute bottom-6 left-6 right-6 pointer-events-none">
                            <div className="flex items-center gap-2">
                                <Star className={`w-3 h-3 ${colors.text} fill-current`} />
                                <span className="text-white text-[10px] font-bold uppercase tracking-[0.2em]">
                                    My Universe
                                </span>
                            </div>
                        </div>

                        {/* Decorative Frames */}
                        <div className="absolute inset-3 rounded-2xl border border-white/20 pointer-events-none group-hover:border-white/40 transition-colors" />
                        <div className="absolute top-6 right-6 w-2 h-2 rounded-full bg-pink-500 animate-pulse pointer-events-none" />
                    </div>
                </motion.div>

                {/* Text Content */}
                <motion.div
                    style={{ opacity: opacityTransform }}
                    className={`w-full md:w-1/2 flex flex-col ${isEven ? 'md:items-start text-center md:text-left' : 'md:items-end text-center md:text-right'}`}
                >
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-xl px-5 py-2.5 rounded-full border border-white/20 mb-6"
                    >
                        <Star className={`w-3.5 h-3.5 ${colors.text}`} />
                        <span className={`uppercase tracking-[0.2em] font-bold text-[10px] ${colors.text}`}>
                            {item.note}
                        </span>
                    </motion.div>

                    {/* Poem Section */}
                    <div className="mb-6 space-y-4">
                        <motion.p
                            initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className={`text-lg sm:text-xl md:text-2xl font-serif italic ${colors.text} leading-relaxed drop-shadow-2xl`}
                        >
                            <span className="text-4xl text-white/20 mr-2">"</span>
                            {item.poem}
                        </motion.p>

                        <motion.h3
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                            className="text-3xl sm:text-4xl md:text-6xl font-serif font-bold text-white leading-tight drop-shadow-2xl"
                        >
                            {item.caption}
                        </motion.h3>

                        <motion.p
                            initial={{ opacity: 0, x: isEven ? 30 : -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.7 }}
                            className="text-sm sm:text-lg md:text-xl font-serif italic text-gray-300 leading-relaxed max-w-lg"
                        >
                            {item.poemEnd}
                            <span className="text-4xl text-white/20 ml-2">"</span>
                        </motion.p>
                    </div>

                    {/* Decorative Elements */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.9 }}
                        className="flex gap-2"
                    >
                        {[...Array(5)].map((_, i) => (
                            <motion.div
                                key={i}
                                animate={{
                                    scale: [1, 1.2, 1],
                                    opacity: [0.3, 0.7, 0.3]
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    delay: i * 0.2
                                }}
                            >
                                <Heart className={`w-3 h-3 ${colors.text}`} fill="currentColor" />
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
});

const Fav = () => {
    const containerRef = useRef(null);
    const audioRef = useRef(null);

    useEffect(() => {
        // Initialize audio
        audioRef.current = new Audio('/audio/unnaivida_eEhCNxT1.mp3');
        audioRef.current.loop = true;
        audioRef.current.volume = 0.5;

        // Play audio (handle browser autocomplete/autoplay restrictions)
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

    return (
        <div ref={containerRef} className="bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white overflow-x-hidden">
            {/* LED Wire Lights */}
            <WireLights color="rainbow" position="top" />

            {/* Floating Hearts */}
            <FloatingHearts side="both" color="multi" count={12} />
            {/* Floating Header */}
            <motion.div
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className="fixed top-0 left-0 w-full p-4 md:p-6 z-50 flex justify-between items-center"
            >
                <Link to="/roadmap" className="bg-white/10 backdrop-blur-xl p-2 md:p-3 rounded-full hover:bg-white/20 transition-all hover:scale-110 border border-white/20">
                    <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 text-white" />
                </Link>
                <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="flex items-center gap-2 bg-gradient-to-r from-pink-500/20 to-rose-500/20 backdrop-blur-xl px-4 md:px-6 py-2 md:py-3 rounded-full border border-pink-400/30"
                >
                    <Heart className="w-4 h-4 md:w-5 md:h-5 text-pink-400 fill-current" />
                    <span className="font-serif italic text-sm md:text-lg tracking-wider">My Favorites</span>
                </motion.div>
            </motion.div>

            {/* Hero Section with Parallax */}
            <section className="min-h-screen flex flex-col items-center justify-center relative px-4 md:px-6 text-center overflow-hidden">
                {/* Animated Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    {[...Array(20)].map((_, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{
                                opacity: [0, 0.5, 0],
                                scale: [0, 1.5, 0],
                                x: Math.random() * window.innerWidth,
                                y: Math.random() * window.innerHeight
                            }}
                            transition={{
                                duration: 3 + Math.random() * 4,
                                repeat: Infinity,
                                delay: Math.random() * 5
                            }}
                            className="absolute"
                        >
                            <Heart className="text-pink-500/20" size={20 + Math.random() * 60} fill="currentColor" />
                        </motion.div>
                    ))}
                </div>

                <div className="relative z-10 max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <motion.h2
                            animate={{ letterSpacing: ['0.3em', '0.4em', '0.3em'] }}
                            transition={{ duration: 3, repeat: Infinity }}
                            className="text-pink-400 uppercase font-bold text-xs md:text-sm mb-4 md:mb-6"
                        >
                            The Favorite Chapter
                        </motion.h2>
                        <h1 className="text-4xl sm:text-6xl md:text-8xl font-serif font-bold mb-4 md:mb-8 leading-tight">
                            <motion.span
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                The Best
                            </motion.span>{' '}
                            <motion.span
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, delay: 0.3 }}
                                className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-rose-400 to-purple-400"
                            >
                                of Us
                            </motion.span>
                        </h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                            className="text-lg sm:text-xl md:text-2xl text-gray-300 italic font-serif leading-relaxed px-4"
                        >
                            A collection of moments that define the "Us" in us. <br className="hidden sm:block" />
                            <span className="text-pink-300">Srimathi, you are my favorite person in every universe.</span>
                        </motion.p>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    animate={{ y: [0, 20, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                >
                    <span className="text-xs text-gray-400 uppercase tracking-widest">Scroll</span>
                    <div className="w-[2px] h-12 md:h-16 bg-gradient-to-b from-pink-500 via-rose-500 to-transparent" />
                </motion.div>
            </section>

            {/* Image Gallery with Parallax */}
            <div className="mx-auto">
                {images.map((item, index) => {
                    const colors = accentColors[item.accentColor];

                    return (
                        <ImageSection
                            key={index}
                            item={item}
                            index={index}
                            colors={colors}
                        />
                    );
                })}
            </div>

            {/* Closing Section */}
            <section className="min-h-screen flex flex-col items-center justify-center text-center px-4 md:px-6 py-12 md:py-20 relative overflow-hidden">
                {/* Background Animation */}
                <div className="absolute inset-0">
                    {[...Array(30)].map((_, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: '100%' }}
                            animate={{
                                opacity: [0, 1, 0],
                                y: '-100%',
                                x: `${Math.random() * 100}%`
                            }}
                            transition={{
                                duration: 5 + Math.random() * 5,
                                repeat: Infinity,
                                delay: Math.random() * 5
                            }}
                            className="absolute"
                        >
                            <Sparkles className="text-yellow-500/30" size={15 + Math.random() * 25} />
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="relative p-8 md:p-12 rounded-3xl md:rounded-[3rem] bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-rose-500/10 backdrop-blur-2xl border border-white/20 max-w-2xl shadow-2xl"
                >
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 rounded-3xl md:rounded-[3rem] bg-gradient-to-r from-pink-500/20 via-transparent to-purple-500/20 blur-xl"
                    />

                    <div className="relative">
                        <Sparkles className="w-10 h-10 md:w-12 md:h-12 text-yellow-400 mx-auto mb-4 md:mb-6" />
                        <h3 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mb-4 md:mb-6 leading-tight">
                            Always <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-400">You</span>
                        </h3>
                        <p className="text-gray-300 text-base md:text-lg mb-8 md:mb-10 leading-relaxed px-2">
                            Every moment with you becomes my new favorite. <br className="hidden sm:block" />
                            Every heartbeat whispers your name. <br className="hidden sm:block" />
                            <span className="text-pink-300 font-serif italic">Happy Birthday, Srimathi!</span>
                        </p>
                        <Link to="/roadmap">
                            <motion.button
                                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(219,39,119,0.4)" }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white font-bold py-3 md:py-4 px-8 md:px-12 rounded-2xl transition-all shadow-[0_10px_30px_rgba(219,39,119,0.3)] text-sm md:text-base"
                            >
                                Back to Roadmap
                            </motion.button>
                        </Link>
                    </div>
                </motion.div>
            </section>
        </div>
    );
};

export default memo(Fav);