import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { ArrowLeft, Heart, Sparkles, MapPin, Camera, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useRef, useEffect, memo } from 'react';
import LazyImage from '../components/LazyImage';
import { getMemoryUrl } from '../config/imageConfig';

const images = [
    {
        src: 'IMG_20211205_124720.jpg',
        caption: 'Our journey started in the classroom of life, Srimathi.',
        note: 'Early Days',
        description: 'Where everything began - two souls finding each other in the maze of education and dreams.',
    },
    {
        src: 'IMG-20220331-WA0005.jpg',
        caption: 'Every text, every call, bringing us closer during college.',
        note: 'Connections',
        description: 'Distance meant nothing when our hearts spoke the same language of love.',
    },
    {
        src: 'IMG-20220524-WA0008.jpg',
        caption: 'Studies were easier with you by my side.',
        note: 'Support System',
        description: 'You turned every challenge into an adventure, every problem into a shared journey.',
    },
    {
        src: 'IMG-20220718-WA0011.jpg',
        caption: 'Building dreams together since the beginning.',
        note: 'Dreamers',
        description: 'Our dreams intertwined like vines, growing stronger together than apart.',
    },
    {
        src: 'IMG20230413182106.jpg',
        caption: 'Srimathi, you were the highlight of my college life.',
        note: 'Pure Magic',
        description: 'Among thousands of faces, yours was the one that made everything worthwhile.',
    },
    {
        src: 'IMG-20220331-WA0021.jpg',
        caption: 'Caught in a moment of pure joy.',
        note: 'Laughter',
        description: 'Your smile became my favorite view, my daily dose of happiness.',
    },
    {
        src: 'IMG-20220331-WA0055.jpg',
        caption: 'Side by side, step by step.',
        note: 'Together',
        description: 'Walking through life hand in hand, creating footprints of memories.',
    },
    {
        src: 'IMG-20220331-WA0057.jpg',
        caption: 'Even the simplest days felt extraordinary.',
        note: 'Simplicity',
        description: 'With you, ordinary moments transformed into extraordinary memories.',
    },
    {
        src: 'IMG-20220331-WA0128.jpg',
        caption: 'Growing up and growing together.',
        note: 'Growth',
        description: 'We evolved not just as individuals, but as a beautiful partnership.',
    },
    {
        src: 'IMG-20220331-WA0140.jpg',
        caption: 'A snapshot of a memory I\'ll cherish forever.',
        note: 'Cherished',
        description: 'This moment captured in time, forever etched in my heart.',
    },
    {
        src: 'IMG-20220524-WA0014.jpg',
        caption: 'You are the calm in my chaos.',
        note: 'Peace',
        description: 'In the storm of life, you were my sanctuary of serenity.',
    },
    {
        src: 'IMG-20220607-WA0000.jpg',
        caption: 'Every glance shared was a secret conversation.',
        note: 'Secrets',
        description: 'Our eyes spoke volumes that words could never express.',
    },
    {
        src: 'IMG-20220607-WA0006.jpg',
        caption: 'Making memories that would last a lifetime.',
        note: 'Legacy',
        description: 'Each moment together was a brick in the foundation of our forever.',
    },
    {
        src: 'IMG-20220607-WA0007.jpg',
        caption: 'To the days we wished would never end.',
        note: 'Timeless',
        description: 'Time stood still when we were together, yet flew by too fast.',
    },
    {
        src: 'IMG-20220708-WA0007.jpg',
        caption: 'Your happiness is my priority.',
        note: 'Joy',
        description: 'Seeing you smile became my life\'s greatest achievement.',
    },
    {
        src: 'IMG-20220708-WA0010.jpg',
        caption: 'Two hearts, one journey.',
        note: 'Union',
        description: 'Separate paths merged into one beautiful road ahead.',
    },
    {
        src: 'IMG20230413183056.jpg',
        caption: 'Looking back, I\'d choose you all over again.',
        note: 'Choice',
        description: 'If given a thousand chances, I\'d choose you every single time.',
    },
    {
        src: 'IMG20240905135106.jpg',
        caption: 'From then until now, always you.',
        note: 'Eternity',
        description: 'Through seasons and years, my heart has always belonged to you.',
    },
    {
        src: 'IMG_20220405_194727.jpg',
        caption: 'Capturing the light of my life.',
        note: 'Radiance',
        description: 'You illuminated my world with warmth that never fades.',
    },
    {
        src: 'IMG_20220415_072006.jpg',
        caption: 'Morning vibes and happy smiles.',
        note: 'Morning',
        description: 'Every sunrise was brighter with you in my life.',
    },
    {
        src: 'IMG_20220415_152545.jpg',
        caption: 'Afternoon strolls and endless talks.',
        note: 'Walks',
        description: 'Our conversations were journeys to places words alone couldn\'t reach.',
    },
    {
        src: 'IMG_20220428_225103.jpg',
        caption: 'Late night studies turned into heart-to-hearts.',
        note: 'Nights',
        description: 'Under dim lights, we discovered more about love than any textbook taught.',
    },
    {
        src: 'IMG_20220514_163048.jpg',
        caption: 'A classic moment from the archives.',
        note: 'Classic',
        description: 'A timeless memory preserved in the album of our hearts.',
    },
    {
        src: 'IMG_20220521_063559.jpg',
        caption: 'The way you looked at me then, the way you look at me now.',
        note: 'Gaze',
        description: 'Your eyes held promises that your heart has kept forever.',
    },
    {
        src: 'Screenshot_2022-02-28-14-29-47-969_com.whatsapp.jpg',
        caption: 'Digital memories of real feelings.',
        note: 'Digital',
        description: 'Technology connected us, but love kept us inseparable.',
    },
    {
        src: 'Screenshot_2022-04-15-19-08-13-035_com.whatsapp.jpg',
        caption: 'Staying connected, no matter what.',
        note: 'Bond',
        description: 'No distance could ever weaken the connection between our souls.',
    },
    {
        src: 'Screenshot_2022-04-16-17-13-26-727_com.whatsapp.jpg',
        caption: 'Hours felt like seconds.',
        note: 'Time',
        description: 'With you, time became irrelevant - only moments mattered.',
    },
    {
        src: 'Screenshot_2022-08-23-21-07-20-168_com.android.contacts.jpg',
        caption: 'A name that makes me smile.',
        note: 'Contact',
        description: 'Just your name on my screen could brighten the darkest day.',
    },
    {
        src: 'Screenshot_2022-09-24-10-21-12-802_com.whatsapp.jpg',
        caption: 'Video calls that bridged the gap.',
        note: 'Virtual',
        description: 'Screens couldn\'t contain the love that flowed between us.',
    }
];

// Improved wavy LED Wire Path Component moved outside and memoized
const LEDWirePath = memo(() => {
    // Create a wavy SVG path that represents a climbing/hiking route
    const pathHeight = 5000; // Adjust based on your content length
    const segments = 30; // Number of wave segments
    const amplitude = 15; // Wave amplitude

    // Generate SVG path data for wavy line
    let pathData = `M 20 0`;

    for (let i = 1; i <= segments; i++) {
        const y = (i / segments) * pathHeight;
        const xOffset = i % 2 === 0 ? amplitude : -amplitude;
        pathData += ` Q ${20 + xOffset * 1.5} ${y - pathHeight / (segments * 2)}, 20 ${y}`;
    }

    return (
        <div className="absolute left-1/2 top-0 h-full -translate-x-1/2 pointer-events-none z-5">
            <svg width="40" height={pathHeight} className="absolute top-0 left-0">
                <defs>
                    <linearGradient id="wireGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="rgba(251, 113, 133, 0.9)" />
                        <stop offset="33%" stopColor="rgba(244, 114, 182, 0.9)" />
                        <stop offset="66%" stopColor="rgba(236, 72, 153, 0.9)" />
                        <stop offset="100%" stopColor="rgba(251, 113, 133, 0.9)" />
                    </linearGradient>
                    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                </defs>

                {/* Main path */}
                <motion.path
                    d={pathData}
                    stroke="url(#wireGradient)"
                    strokeWidth="4"
                    fill="none"
                    filter="url(#glow)"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 2.5, ease: "easeInOut" }}
                />

                {/* LED lights along the path */}
                {Array.from({ length: 70 }).map((_, i) => {
                    const progress = i / 69;
                    const pathPoint = progress * segments;
                    const segmentIndex = Math.floor(pathPoint);
                    const segmentProgress = pathPoint - segmentIndex;

                    // Calculate position along the wavy path
                    const y = (progress * pathHeight);
                    const xOffset = segmentIndex % 2 === 0
                        ? amplitude * Math.sin(segmentProgress * Math.PI)
                        : -amplitude * Math.sin(segmentProgress * Math.PI);

                    return (
                        <motion.circle
                            key={i}
                            cx={20 + xOffset}
                            cy={y}
                            r="3"
                            fill="#f472b6"
                            filter="url(#glow)"
                            initial={{ opacity: 0 }}
                            animate={{
                                opacity: [0.3, 1, 0.3],
                                r: [2, 3, 2],
                                fill: [
                                    'rgba(251, 113, 133, 1)',
                                    'rgba(244, 114, 182, 1)',
                                    'rgba(236, 72, 153, 1)',
                                    'rgba(251, 113, 133, 1)',
                                ],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: i * 0.05,
                            }}
                        />
                    );
                })}
            </svg>
        </div>
    );
});

// Improved Instagram Frame Component moved outside and memoized
const InstagramFrame = memo(({ image, index }) => {
    const cardRef = useRef(null);
    const isInView = useInView(cardRef, { once: false, amount: 0.3 });
    const isLeft = index % 2 === 0;

    // Calculate vertical offset to create staggered effect
    const verticalPattern = [6, 12, 8, 16, 4];
    const verticalOffset = verticalPattern[index % verticalPattern.length];

    // Get path coordinates for connector
    const getConnectorPath = () => {
        // Create a more natural curve that looks like a hiking trail segment
        if (isLeft) {
            return `M 0 100 C 40 ${80 + (index % 3) * 10}, 100 ${120 - (index % 4) * 10}, 200 100`;
        } else {
            return `M 200 100 C 160 ${80 + (index % 3) * 10}, 100 ${120 - (index % 4) * 10}, 0 100`;
        }
    };

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, x: isLeft ? -100 : 100, y: 50 }}
            animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: isLeft ? -100 : 100, y: 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`relative w-full flex ${isLeft ? 'justify-start pl-4 md:pl-16' : 'justify-end pr-4 md:pr-16'}`}
            style={{
                marginTop: `${verticalOffset / 2}rem`, // Reduced staggered vertical positioning for mobile
                marginBottom: `${verticalOffset / 4}rem`,
                zIndex: 20
            }}
        >
            {/* Enhanced curved wire connector with hiking trail look */}
            <svg
                className={`absolute top-1/2 ${isLeft ? 'right-1/2' : 'left-1/2'} w-36 md:w-64 lg:w-96 h-40 md:h-56 -translate-y-1/2 pointer-events-none z-10`}
                viewBox="0 0 200 200"
                preserveAspectRatio="none"
            >
                <defs>
                    <linearGradient id={`wireGradient-${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="rgba(251, 113, 133, 0.9)" />
                        <stop offset="50%" stopColor="rgba(244, 114, 182, 0.9)" />
                        <stop offset="100%" stopColor="rgba(236, 72, 153, 0.9)" />
                    </linearGradient>
                    <filter id={`wireGlow-${index}`} x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="2" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                </defs>

                <motion.path
                    d={getConnectorPath()}
                    stroke={`url(#wireGradient-${index})`}
                    strokeWidth="3"
                    fill="none"
                    filter={`url(#wireGlow-${index})`}
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                    transition={{ duration: 1.2, delay: 0.3 }}
                />

                {/* LED bulbs on connector wire - positioned along curved path */}
                {[...Array(8)].map((_, i) => {
                    const progress = i / 7;

                    // Approximate x/y based on progress
                    const xPos = isLeft ? progress * 200 : 200 - progress * 200;
                    const yPos = 100 + Math.sin(progress * Math.PI) * ((index % 3 + 1) * 10);

                    return (
                        <motion.circle
                            key={i}
                            cx={xPos}
                            cy={yPos}
                            r="4"
                            initial={{ opacity: 0 }}
                            animate={isInView ? {
                                fill: [
                                    'rgba(251, 113, 133, 1)',
                                    'rgba(244, 114, 182, 1)',
                                    'rgba(236, 72, 153, 1)',
                                    'rgba(251, 113, 133, 1)',
                                ],
                                opacity: [0.5, 1, 0.5],
                                r: [3, 4, 3],
                            } : { opacity: 0 }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: i * 0.1 + 0.3,
                            }}
                            filter={`url(#wireGlow-${index})`}
                        />
                    );
                })}
            </svg>

            {/* Instagram card */}
            <motion.div
                className="relative bg-white rounded-xl shadow-2xl overflow-hidden w-[80%] sm:w-full sm:max-w-sm md:max-w-md z-20"
                whileHover={{ scale: 1.03, boxShadow: '0 30px 60px rgba(236, 72, 153, 0.4)' }}
                style={{
                    boxShadow: '0 15px 50px rgba(0, 0, 0, 0.25)',
                }}
            >
                {/* Instagram header */}
                <div className="bg-white px-4 py-3 flex items-center gap-3 border-b border-gray-200">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-500 via-rose-500 to-pink-400 p-[2px]">
                        <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                            <Heart className="w-4 h-4 text-pink-500 fill-current" />
                        </div>
                    </div>
                    <div className="flex-1">
                        <p className="font-semibold text-sm text-gray-900">our_love_story</p>
                        <p className="text-xs text-gray-500">{image.note}</p>
                    </div>
                    <Camera className="w-5 h-5 text-gray-700" />
                </div>

                {/* Image with Lazy Loader */}
                <div className="relative w-full aspect-[4/5] bg-black/5 flex items-center justify-center">
                    <LazyImage
                        src={getMemoryUrl('diplomo', image.src)}
                        alt={image.caption}
                        className="w-full h-full"
                        style={{ objectFit: 'contain' }} // Changed to contain to show full screenshots
                    />

                    {/* Floating hearts on image */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                        {[...Array(5)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute"
                                initial={{
                                    bottom: '-10%',
                                    left: `${20 + i * 15}%`,
                                    opacity: 0,
                                }}
                                animate={isInView ? {
                                    bottom: '110%',
                                    opacity: [0, 1, 0],
                                    scale: [0.5, 1, 0.5],
                                } : {}}
                                transition={{
                                    duration: 4 + i,
                                    repeat: Infinity,
                                    delay: i * 0.8,
                                }}
                            >
                                <Heart className="w-4 h-4 text-pink-400 fill-current" />
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Instagram actions */}
                <div className="bg-white px-4 py-3 border-t border-gray-100">
                    <div className="flex items-center gap-4 mb-3">
                        <motion.div
                            whileTap={{ scale: 0.8 }}
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        >
                            <Heart className="w-6 h-6 text-pink-500 fill-current cursor-pointer" />
                        </motion.div>
                        <Sparkles className="w-6 h-6 text-gray-700 cursor-pointer" />
                        <MapPin className="w-6 h-6 text-gray-700 cursor-pointer" />
                    </div>

                    <p className="font-semibold text-sm text-gray-900 mb-2">
                        <span className="text-pink-500">❤️</span> Loved by us
                    </p>

                    <p className="text-sm text-gray-900 mb-2">
                        <span className="font-semibold">our_love_story</span> {image.caption}
                    </p>

                    <p className="text-sm text-gray-600 leading-relaxed">
                        {image.description}
                    </p>

                    <p className="text-xs text-gray-400 mt-3">
                        {index === 0 ? 'WHERE IT ALL BEGAN' : `MEMORY ${index + 1}`}
                    </p>
                </div>
            </motion.div>
        </motion.div>
    );
});

// Memory trail markers moved outside and memoized
const TrailMarkers = memo(() => {
    return (
        <div className="absolute left-1/2 top-0 h-full -translate-x-1/2 pointer-events-none">
            {[...Array(10)].map((_, i) => {
                const topPosition = 10 + (i * 10); // Distribute evenly
                const isLeft = i % 2 === 0;

                return (
                    <motion.div
                        key={i}
                        className={`absolute ${isLeft ? 'left-6' : 'right-6'} w-8 h-8 rounded-full bg-white/80 shadow-md flex items-center justify-center`}
                        style={{ top: `${topPosition}%` }}
                        initial={{ scale: 0, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{
                            duration: 0.5,
                            delay: 0.1 * i
                        }}
                        viewport={{ once: false, margin: "-100px" }}
                    >
                        {i % 4 === 0 ? (
                            <Heart className="w-4 h-4 text-pink-500 fill-current" />
                        ) : i % 4 === 1 ? (
                            <Star className="w-4 h-4 text-amber-500 fill-current" />
                        ) : i % 4 === 2 ? (
                            <Sparkles className="w-4 h-4 text-purple-500" />
                        ) : (
                            <MapPin className="w-4 h-4 text-blue-500" />
                        )}
                    </motion.div>
                );
            })}
        </div>
    );
});

const Diplomo = () => {
    const containerRef = useRef(null);
    const audioRef = useRef(null);

    useEffect(() => {
        // Initialize audio
        audioRef.current = new Audio('/audio/premavathi-sid-sriram_KabjAYSl.mp3');
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

    return (
        <div ref={containerRef} className="relative bg-gradient-to-b from-pink-50 via-rose-50 to-pink-100 min-h-screen overflow-x-hidden">
            {/* Improved wavy LED Wire Path in center */}
            <LEDWirePath />

            {/* Trail markers along the journey */}
            <TrailMarkers />

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="sticky top-0 left-0 w-full p-4 md:p-6 z-50 bg-white/80 backdrop-blur-md shadow-sm"
            >
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <Link to="/roadmap">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="bg-gradient-to-r from-pink-500 to-rose-500 text-white p-2 rounded-full shadow-lg"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </motion.button>
                    </Link>
                    <motion.div
                        className="flex items-center gap-2"
                        animate={{
                            scale: [1, 1.05, 1],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <Heart className="w-6 h-6 text-pink-500 fill-current" />
                        <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                            College Memories
                        </h1>
                    </motion.div>
                    <div className="w-10" /> {/* Spacer */}
                </div>
            </motion.div>

            {/* Hero Section */}
            <section className="relative min-h-[60vh] md:min-h-[80vh] flex flex-col items-center justify-center px-4 py-12 md:py-20 overflow-hidden">
                {/* Animated background elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {[...Array(20)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute"
                            initial={{
                                x: `${Math.random() * 100}%`,
                                y: `${Math.random() * 100}%`,
                                scale: 0,
                            }}
                            animate={{
                                y: [
                                    `${Math.random() * 100}%`,
                                    `${Math.random() * 100 - 20}%`,
                                ],
                                scale: [0, 1, 0],
                                opacity: [0, 0.6, 0],
                                rotate: [0, 360],
                            }}
                            transition={{
                                duration: 8 + Math.random() * 4,
                                repeat: Infinity,
                                delay: Math.random() * 5,
                            }}
                        >
                            {i % 3 === 0 ? (
                                <Heart className="w-6 h-6 text-pink-400/40 fill-current" />
                            ) : i % 3 === 1 ? (
                                <Star className="w-6 h-6 text-rose-400/40 fill-current" />
                            ) : (
                                <Sparkles className="w-6 h-6 text-pink-400/40" />
                            )}
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    className="relative z-10 text-center max-w-4xl mx-auto"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <motion.h1
                        className="text-4xl md:text-6xl lg:text-8xl font-bold mb-6 md:mb-8"
                        animate={{
                            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                        }}
                        transition={{ duration: 5, repeat: Infinity }}
                        style={{
                            backgroundImage: 'linear-gradient(90deg, #ec4899, #f43f5e, #ec4899)',
                            backgroundSize: '200% 200%',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                        }}
                    >
                        Diplomo Days
                    </motion.h1>

                    <motion.p
                        className="text-lg md:text-2xl text-gray-700 font-serif italic mb-8 md:mb-12 px-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        Where our love story began to bloom, Srimathi
                        <motion.span
                            className="inline-block mx-2"
                            animate={{ scale: [1, 1.3, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        >
                            ❤️
                        </motion.span>
                    </motion.p>

                    {/* Trail instructions box */}
                    <motion.div
                        className="inline-block bg-white/70 backdrop-blur-md px-6 md:px-8 py-3 md:py-4 rounded-xl border border-pink-200 shadow-xl"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.8 }}
                    >
                        <div className="flex items-center gap-3 md:gap-4">
                            <div className="bg-pink-100 p-2 rounded-full">
                                <MapPin className="w-5 h-5 text-pink-600" />
                            </div>
                            <div className="text-left">
                                <p className="text-pink-600 font-semibold text-sm md:text-base">
                                    Follow The Memory Trail
                                </p>
                                <p className="text-xs md:text-sm text-gray-600">
                                    A journey through our college days ↓
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Improved scroll indicator */}
                <motion.div
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <p className="text-xs md:text-sm text-gray-600 uppercase tracking-wider">Begin Journey</p>
                    <div className="w-6 h-16 border-2 border-pink-400/50 rounded-full flex justify-center">
                        <motion.div
                            className="w-2 h-2 bg-pink-500 rounded-full"
                            animate={{
                                y: [0, 30, 0],
                                opacity: [0, 1, 0]
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                            }}
                        />
                    </div>
                </motion.div>
            </section>

            {/* Memory Road - Instagram Frames */}
            <div className="relative max-w-7xl mx-auto py-12 md:py-20">
                {/* Starting point indicator */}
                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="flex flex-col items-center justify-center mb-16 md:mb-24"
                >
                    <motion.div
                        className="relative w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center shadow-2xl"
                        animate={{
                            boxShadow: [
                                '0 0 20px rgba(251, 113, 133, 0.6), 0 0 40px rgba(251, 113, 133, 0.4)',
                                '0 0 30px rgba(244, 114, 182, 0.8), 0 0 60px rgba(244, 114, 182, 0.5)',
                                '0 0 20px rgba(251, 113, 133, 0.6), 0 0 40px rgba(251, 113, 133, 0.4)',
                            ],
                            scale: [1, 1.1, 1],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <Heart className="w-8 h-8 md:w-10 md:h-10 text-white fill-current" />
                    </motion.div>
                    <motion.p
                        className="mt-4 text-sm md:text-base text-gray-600 font-semibold"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        Follow the trail to our memories ↓
                    </motion.p>
                </motion.div>

                {images.map((image, index) => (
                    <InstagramFrame key={index} image={image} index={index} />
                ))}
            </div>

            {/* Trail completion badge */}
            <motion.div
                className="relative mx-auto w-full max-w-md flex justify-center my-12 md:my-20"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.8 }}
            >
                <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-rose-500 to-pink-500 rounded-full animate-pulse opacity-40 scale-110 blur-md"></div>
                    <motion.div
                        className="relative bg-white rounded-full p-6 shadow-xl flex flex-col items-center"
                        animate={{ rotate: [0, 5, 0, -5, 0] }}
                        transition={{ duration: 6, repeat: Infinity }}
                    >
                        <Sparkles className="w-12 h-12 text-pink-500 mb-3" />
                        <p className="text-pink-600 font-bold text-lg">Trail Completed!</p>
                        <p className="text-gray-600 text-sm">You've walked through our memories</p>
                    </motion.div>
                </div>
            </motion.div>

            {/* Closing Section */}
            <section className="relative min-h-[60vh] flex flex-col items-center justify-center px-4 py-12 md:py-20 bg-gradient-to-b from-pink-100 to-rose-100">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: false }}
                    className="text-center max-w-3xl mx-auto bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl"
                >
                    <motion.div
                        animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                        transition={{
                            rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
                            scale: { duration: 2, repeat: Infinity },
                        }}
                        className="mb-6"
                    >
                        <Sparkles className="w-12 h-12 md:w-16 md:h-16 text-pink-500 mx-auto" />
                    </motion.div>

                    <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                        Our Journey Continues
                    </h2>

                    <p className="text-gray-700 text-base md:text-xl mb-8 font-serif italic leading-relaxed">
                        From students to soulmates, Srimathi. This was just the first chapter of our beautiful story.
                    </p>

                    <Link to="/roadmap">
                        <motion.button
                            whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(236, 72, 153, 0.4)' }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 text-white font-bold py-4 px-8 md:px-12 rounded-full shadow-lg text-base md:text-lg"
                        >
                            Next Chapter →
                        </motion.button>
                    </Link>

                    {/* Achievements earned */}
                    <div className="mt-10 flex flex-wrap justify-center gap-3">
                        <motion.div
                            className="bg-pink-50 border border-pink-200 rounded-full py-1 px-4 flex items-center gap-2"
                            whileHover={{ scale: 1.05 }}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <Star className="w-4 h-4 text-amber-500 fill-current" />
                            <p className="text-xs text-gray-700">Memory Keeper</p>
                        </motion.div>

                        <motion.div
                            className="bg-pink-50 border border-pink-200 rounded-full py-1 px-4 flex items-center gap-2"
                            whileHover={{ scale: 1.05 }}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <Heart className="w-4 h-4 text-pink-500 fill-current" />
                            <p className="text-xs text-gray-700">College Sweethearts</p>
                        </motion.div>

                        <motion.div
                            className="bg-pink-50 border border-pink-200 rounded-full py-1 px-4 flex items-center gap-2"
                            whileHover={{ scale: 1.05 }}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <Sparkles className="w-4 h-4 text-purple-500" />
                            <p className="text-xs text-gray-700">Trail Blazers</p>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Final decorative elements */}
                <div className="absolute bottom-0 left-0 w-full overflow-hidden h-20 pointer-events-none">
                    <svg
                        viewBox="0 0 1200 120"
                        preserveAspectRatio="none"
                        className="absolute bottom-0 left-0 w-full h-full"
                    >
                        <path
                            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
                            opacity=".25"
                            className="fill-white"
                        />
                        <path
                            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
                            opacity=".5"
                            className="fill-white"
                        />
                        <path
                            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
                            className="fill-white"
                        />
                    </svg>
                </div>
            </section>

            {/* Mobile helper tooltip */}
            <motion.div
                className="fixed bottom-4 right-4 md:hidden bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg z-50"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 3 }}
                exit={{ opacity: 0, y: 20 }}
            >
                <p className="text-xs text-gray-700 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-pink-500" />
                    Keep scrolling to see more
                </p>
            </motion.div>
        </div>
    );
};

export default memo(Diplomo);
