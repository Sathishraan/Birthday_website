import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Heart, ArrowLeft, Camera, Sparkles, ArrowRight, Map, Compass, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect, memo, useMemo } from 'react';
import LazyImage from '../components/LazyImage';

const Roadmap = () => {
    // State for active memory (for animated navigation)
    const [activeMemory, setActiveMemory] = useState(null);
    const [isNavigating, setIsNavigating] = useState(false);
    const [showStickers, setShowStickers] = useState(false);

    // Trigger sticker animation after initial load
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowStickers(true);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    const memories = useMemo(() => [
        {
            id: 1,
            title: 'Diplomo Days',
            location: 'College',
            path: '/diplomo',
            poem: 'Where it all began, Srimathi. Amongst the books and the lectures, I found the only lesson that ever mattered—you.',
            color: 'from-indigo-400 to-indigo-600',
            icon: '🎓',
            visualElements: ['books', 'diploma', 'campus', 'friends'],
            aiImage: '/assets/roadmap/diplomo_ai.jpg',
            sticker: 'Academic Journey'
        },
        {
            id: 2,
            title: 'Divine Blessings',
            location: 'Temple Date',
            path: '/temple-date',
            poem: 'Under the sacred bells and the scent of incense, we promised without words. A love blessed by the heavens.',
            color: 'from-orange-400 to-amber-600',
            icon: '🛕',
            visualElements: ['temple', 'incense', 'bells', 'prayers'],
            aiImage: '/assets/roadmap/temple_ai.jpg',
            sticker: 'Spiritual Connection'
        },
        {
            id: 3,
            title: 'Industrial Charm',
            location: 'NLC',
            path: '/nlc',
            poem: 'Even in the world of iron and earth, our love bloomed like a wildflower. Every path in NLC holds a footprint of us.',
            color: 'from-emerald-400 to-green-600',
            icon: '🏭',
            visualElements: ['factory', 'machinery', 'engineering', 'industry'],
            aiImage: '/assets/roadmap/nlc_ai.jpg',
            sticker: 'Industrial Romance'
        },
        {
            id: 4,
            title: 'Waves of Love',
            location: 'Beach',
            path: '/beach',
            poem: 'The sea whispered secrets to the sand, just as my heart whispered your name to the stars, Srimathi.',
            color: 'from-teal-400 to-cyan-600',
            icon: '🌊',
            visualElements: ['waves', 'shore', 'sunset', 'ocean'],
            aiImage: '/assets/roadmap/beach_ai.jpg',
            sticker: 'Coastal Memories'
        },
        {
            id: 5,
            title: 'Virtual Connection',
            location: 'VC',
            path: '/vc',
            poem: 'Distance is just a test. Every screen-lit smile and late-night laugh bridged the miles between us.',
            color: 'from-purple-400 to-violet-600',
            icon: '📱',
            visualElements: ['screen', 'device', 'video', 'messages'],
            aiImage: '/assets/roadmap/vc_ai.jpg',
            sticker: 'Digital Romance'
        },
        {
            id: 6,
            title: 'Chennai Diaries',
            location: 'Chennai',
            path: '/chennai',
            poem: 'In the heartbeat of the city, amidst the rush, I found a silence that spoke my name. You were the rhythm.',
            color: 'from-blue-400 to-blue-600',
            icon: '🏛️',
            visualElements: ['cityscape', 'buildings', 'streets', 'landmarks'],
            aiImage: '/assets/roadmap/chennai_ai.jpg',
            sticker: 'Urban Adventures'
        },
        {
            id: 7,
            title: 'Favorite Tidbits',
            location: 'Fav',
            path: '/fav',
            poem: 'A treasury of the small things. Each photo a fragment of a joy so deep. You are my favorite place.',
            color: 'from-pink-400 to-rose-600',
            icon: '💖',
            visualElements: ['hearts', 'gifts', 'moments', 'treasures'],
            aiImage: '/assets/roadmap/fav_ai.jpg',
            sticker: 'Cherished Moments'
        }
    ], []);

    // Handler for memory navigation
    const handleNavigate = (memory) => {
        setActiveMemory(memory);
        setIsNavigating(true);
        // Delay actual navigation to allow for animation
        setTimeout(() => {
            window.location.href = memory.path;
        }, 1200);
    };

    // Animation variants
    const staggerContainer = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 50 },
        show: { opacity: 1, y: 0, transition: { duration: 0.8 } }
    };

    // Helper to get emoji icons for visual elements
    const getElementIcon = (element) => {
        const iconMap = {
            books: '📚',
            diploma: '🎓',
            campus: '🏫',
            friends: '👨‍🎓',
            temple: '🛕',
            incense: '🪔',
            bells: '🔔',
            prayers: '🙏',
            factory: '🏭',
            machinery: '⚙️',
            engineering: '🔧',
            industry: '🏗️',
            waves: '🌊',
            shore: '🏖️',
            sunset: '🌅',
            ocean: '🐚',
            screen: '💻',
            device: '📱',
            video: '📹',
            messages: '💬',
            cityscape: '🌃',
            buildings: '🏙️',
            streets: '🛣️',
            landmarks: '🗿',
            hearts: '❤️',
            gifts: '🎁',
            moments: '📸',
            treasures: '💎'
        };

        return iconMap[element] || '✨';
    };

    // Visual elements generator memoized
    const VisualElements = memo(({ elements }) => {
        return (
            <>
                {elements.map((element, index) => {
                    // Using fixed deterministic values for positions to avoid re-renders if parent re-renders
                    // However, we can use a seed or just let it be. For a roadmap, randomness is fine as long as it's not on every frame.
                    const top = 20 + (index * 15) % 60;
                    const left = 20 + (index * 23) % 60;
                    const size = 30 + (index * 7) % 30;
                    const rotation = (index * 13) % 20 - 10;

                    return (
                        <motion.div
                            key={index}
                            className="absolute text-3xl sm:text-4xl opacity-10"
                            style={{
                                top: `${top}%`,
                                left: `${left}%`,
                                transform: `rotate(${rotation}deg)`
                            }}
                            animate={{
                                scale: [1, 1.1, 1],
                                rotate: [rotation, rotation + 5, rotation]
                            }}
                            transition={{
                                repeat: Infinity,
                                duration: 3 + (index % 3),
                                delay: (index % 5) * 0.5
                            }}
                        >
                            {getElementIcon(element)}
                        </motion.div>
                    );
                })}
            </>
        );
    });

    return (
        <>
            {/* Navigation Transition Overlay */}
            <AnimatePresence>
                {isNavigating && (
                    <motion.div
                        initial={{ clipPath: 'circle(0% at 50% 50%)' }}
                        animate={{ clipPath: 'circle(100% at 50% 50%)' }}
                        exit={{ clipPath: 'circle(0% at 50% 50%)' }}
                        transition={{ duration: 1, ease: "easeInOut" }}
                        className={`fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br ${activeMemory?.color}`}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                            className="text-center text-white"
                        >
                            <div className="text-6xl md:text-8xl mb-4">{activeMemory?.icon}</div>
                            <h2 className="text-3xl md:text-5xl font-bold mb-2">{activeMemory?.title}</h2>
                            <p className="text-lg md:text-xl opacity-80">Traveling to our memories...</p>
                            <div className="mt-8 flex justify-center">
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                    className="w-12 h-12 border-4 border-white border-t-transparent rounded-full"
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="min-h-screen bg-gradient-to-b from-rose-50 to-pink-100 p-4 sm:p-8 overflow-hidden">
                {/* Background decoration */}
                <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                    <motion.div
                        className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-pink-200/30 to-rose-200/30 rounded-full blur-3xl"
                        animate={{
                            x: [0, 30, 0],
                            y: [0, -30, 0],
                        }}
                        transition={{
                            repeat: Infinity,
                            duration: 15
                        }}
                    />
                    <motion.div
                        className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-br from-indigo-200/30 to-purple-200/30 rounded-full blur-3xl"
                        animate={{
                            x: [0, -30, 0],
                            y: [0, 30, 0],
                        }}
                        transition={{
                            repeat: Infinity,
                            duration: 18,
                            delay: 5
                        }}
                    />
                </div>

                <div className="max-w-5xl mx-auto relative z-10">
                    <Link to="/home" className="inline-flex items-center gap-2 text-pink-500 font-semibold mb-8 hover:text-pink-600 transition-colors bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </Link>

                    <header className="relative text-center mb-16 md:mb-24">
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="relative z-10"
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2, type: 'spring' }}
                                className="w-24 h-24 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg border-4 border-white"
                            >
                                <Map className="w-12 h-12 text-white" />
                            </motion.div>

                            <h1 className="text-4xl sm:text-6xl font-bold mb-4 font-serif bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-rose-500">
                                Our Journey Map
                            </h1>

                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: '100%' }}
                                transition={{ delay: 0.6, duration: 1 }}
                                className="h-1 bg-gradient-to-r from-transparent via-pink-400 to-transparent max-w-md mx-auto mb-6"
                            />

                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.8 }}
                                className="text-gray-700 font-medium italic"
                            >
                                Tracing the path of our love story with Srimathi
                            </motion.p>
                        </motion.div>

                        {/* Floating compass */}
                        <motion.div
                            initial={{ opacity: 0, rotate: -30 }}
                            animate={{ opacity: 1, rotate: 0 }}
                            transition={{ delay: 1, duration: 1 }}
                            className="absolute right-5 top-10 hidden md:block"
                        >
                            <motion.div
                                animate={{ rotate: [0, 5, 0, -5, 0] }}
                                transition={{ repeat: Infinity, duration: 5 }}
                                className="relative w-20 h-20 bg-white rounded-full shadow-xl p-2 border border-pink-100"
                            >
                                <div className="absolute inset-0 rounded-full overflow-hidden">
                                    <div className="w-full h-full bg-gradient-to-br from-pink-50 to-rose-100 opacity-60"></div>
                                </div>
                                <div className="relative w-full h-full flex items-center justify-center">
                                    <Compass className="w-12 h-12 text-pink-500" />
                                    <motion.div
                                        className="absolute w-1 h-10 bg-gradient-to-b from-pink-500 to-rose-600 rounded-full origin-center"
                                        style={{ transformOrigin: 'center bottom' }}
                                        animate={{ rotate: 360 }}
                                        transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
                                    />
                                </div>
                            </motion.div>
                        </motion.div>
                    </header>

                    {/* Main Journey Timeline */}
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        animate="show"
                        className="relative"
                    >
                        {/* Central Timeline */}
                        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1.5 bg-gradient-to-b from-pink-200 via-rose-400 to-pink-200 hidden md:block rounded-full overflow-hidden">
                            {/* Animated pulse along timeline */}
                            <motion.div
                                className="absolute w-full h-40 bg-gradient-to-b from-transparent via-white to-transparent opacity-30"
                                animate={{ top: ['-10%', '100%'] }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 3,
                                    ease: "linear",
                                    repeatType: "loop"
                                }}
                            />
                        </div>

                        {/* Memory Cards */}
                        <div className="space-y-16 md:space-y-32">
                            {memories.map((memory, index) => (
                                <motion.div
                                    key={memory.id}
                                    variants={itemVariants}
                                    className={`flex flex-col md:flex-row items-center md:items-start gap-8 relative ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                                >
                                    {/* Memory Card */}
                                    <div className="flex-1 w-full relative">
                                        <button
                                            onClick={() => handleNavigate(memory)}
                                            className="block w-full text-left"
                                        >
                                            <motion.div
                                                whileHover={{ scale: 1.03 }}
                                                whileTap={{ scale: 0.98 }}
                                                className="bg-white/80 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-xl border border-pink-50 relative overflow-hidden group"
                                            >
                                                {/* Visual Elements in Background */}
                                                <div className="absolute inset-0 overflow-hidden opacity-70 group-hover:opacity-100 transition-opacity">
                                                    <VisualElements elements={memory.visualElements} />
                                                </div>

                                                {/* Header Gradient */}
                                                <div className={`absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r ${memory.color}`} />

                                                {/* AI Image */}
                                                <div className="absolute -right-10 top-1/2 -translate-y-1/2 w-28 h-28 md:w-32 md:h-32 opacity-10 group-hover:opacity-30 transition-opacity duration-500 rounded-full overflow-hidden">
                                                    <div className="absolute inset-0 bg-gradient-to-br from-transparent to-white mix-blend-overlay"></div>
                                                    <LazyImage
                                                        src={memory.aiImage || "/placeholder.png"}
                                                        alt={memory.title}
                                                        className="w-full h-full"
                                                    />
                                                </div>

                                                {/* Topic Sticker */}
                                                <AnimatePresence>
                                                    {showStickers && (
                                                        <motion.div
                                                            initial={{ opacity: 0, scale: 0, rotate: -10 }}
                                                            animate={{ opacity: 1, scale: 1, rotate: -10 }}
                                                            transition={{
                                                                delay: 0.1 * index,
                                                                type: "spring",
                                                                damping: 10
                                                            }}
                                                            className={`absolute -top-4 left-4 px-3 py-1.5 bg-gradient-to-r ${memory.color} text-white text-sm font-bold rounded-lg shadow-md transform -rotate-[10deg] z-10`}
                                                        >
                                                            {memory.sticker}
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>

                                                {/* Content */}
                                                <div className="relative z-20">
                                                    <div className="flex items-center gap-3 mb-4">
                                                        <span className="text-3xl md:text-4xl">{memory.icon}</span>
                                                        <h3 className="text-xl md:text-2xl font-bold text-gray-800 font-serif">{memory.title}</h3>
                                                    </div>

                                                    <p className="text-gray-600 leading-relaxed italic mb-6 relative">
                                                        "{memory.poem}"
                                                    </p>

                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center gap-2 text-gray-500 text-sm">
                                                            <MapPin className="w-4 h-4" />
                                                            <span className="font-medium uppercase tracking-wider">
                                                                {memory.location}
                                                            </span>
                                                        </div>

                                                        <motion.div
                                                            className={`inline-flex items-center gap-1 px-4 py-1.5 bg-gradient-to-r ${memory.color} text-white rounded-full text-sm font-semibold shadow-sm group-hover:shadow-md transition-shadow`}
                                                            whileHover={{ scale: 1.05 }}
                                                            whileTap={{ scale: 0.95 }}
                                                        >
                                                            <span>Visit</span>
                                                            <ArrowRight className="w-3 h-3" />
                                                        </motion.div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        </button>
                                    </div>

                                    {/* Timeline Node */}
                                    <div className="relative z-10 -my-2 md:my-0">
                                        <motion.div
                                            whileHover={{ scale: 1.2 }}
                                            className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center bg-gradient-to-br ${memory.color} p-0.5`}
                                        >
                                            <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                                                <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br ${memory.color} text-white`}>
                                                    <Heart className="w-5 h-5 fill-current" />
                                                </div>
                                            </div>
                                        </motion.div>

                                        {/* Mobile timeline connector */}
                                        <div className="md:hidden h-16 w-1 bg-gradient-to-b from-pink-200 to-pink-400 mx-auto mt-1"></div>
                                    </div>

                                    {/* Spacer for alignment */}
                                    <div className="flex-1 hidden md:block" />
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Journey End */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1 }}
                        className="mt-24 text-center pb-24 relative"
                    >
                        {/* Final destination marker */}
                        <div className="absolute left-1/2 transform -translate-x-1/2 -top-16 hidden md:block">
                            <motion.div
                                animate={{
                                    y: [0, -10, 0],
                                    boxShadow: [
                                        '0 0 10px rgba(244, 63, 94, 0.3)',
                                        '0 0 20px rgba(244, 63, 94, 0.6)',
                                        '0 0 10px rgba(244, 63, 94, 0.3)'
                                    ]
                                }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                className="w-16 h-16 rounded-full bg-gradient-to-r from-pink-500 to-rose-600 p-1"
                            >
                                <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                                    <Star className="w-8 h-8 text-rose-500 fill-current" />
                                </div>
                            </motion.div>
                        </div>

                        <motion.div
                            className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl p-8 md:p-12 max-w-3xl mx-auto border border-pink-100"
                            whileHover={{ boxShadow: "0 25px 50px -12px rgba(244, 63, 94, 0.25)" }}
                        >
                            <Sparkles className="w-10 h-10 text-yellow-400 mx-auto mb-4" />
                            <h2 className="text-3xl font-serif font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-rose-600 mb-4">
                                To many more adventures with you, Srimathi
                            </h2>
                            <p className="text-gray-600 mb-6">
                                This map is just the beginning. Our journey continues with each new sunrise.
                            </p>
                            <div className="flex justify-center">
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-rose-600 text-white px-6 py-3 rounded-full shadow-md"
                                >
                                    <Heart className="w-4 h-4 fill-current" />
                                    <span className="font-medium">Forever Yours</span>
                                </motion.div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </>
    );
};

export default memo(Roadmap);
