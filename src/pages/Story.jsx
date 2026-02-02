import { motion } from 'framer-motion';
import { Heart, ArrowLeft, Star, Sparkles, Bike, AlertTriangle, Users, MapPin, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useState, memo } from 'react';
import FloatingHearts from '../components/FloatingHearts';
import WireLights from '../components/WireLights';

const timelineEvents = [
    {
        date: 'Sep 4, 2020',
        title: 'First Bike Ride Together',
        desc: 'The night that changed everything. Our first bike ride under the stars where our hearts connected. The moment I knew you, Srimathi, were something special.',
        icon: <Bike className="w-4 h-4 text-white" />,
        sticker: '🏍️',
        color: 'pink'
    },
    {
        date: 'Late 2020',
        title: 'Class Staff Warnings',
        desc: 'We got caught by class staff sneaking moments together. Despite their disapproval and warnings, our feelings only grew stronger. Some rules are worth breaking.',
        icon: <AlertTriangle className="w-4 h-4 text-white" />,
        sticker: '⚠️',
        color: 'yellow'
    },
    {
        date: 'Early 2021',
        title: 'Brother\'s Discovery',
        desc: 'Your brother caught us and warned me to stay away. But our love was too strong to be intimidated. We believed in us when nobody else did.',
        icon: <Users className="w-4 h-4 text-white" />,
        sticker: '👨‍👦',
        color: 'purple'
    },
    {
        date: 'Mid 2021',
        title: 'Long Distance Begins',
        desc: 'After diploma, separate colleges tested our bond. Meeting once every 3-4 months became our rare treasure. Distance made our hearts grow fonder.',
        icon: <MapPin className="w-4 h-4 text-white" />,
        sticker: '📍',
        color: 'blue'
    },
    {
        date: 'Recent',
        title: 'Chennai Interview Reunion',
        desc: 'You came to support me during my job interview in Chennai. Your unwavering belief in our future together strengthens me every day. With this job, we\'re one step closer to forever.',
        icon: <Briefcase className="w-4 h-4 text-white" />,
        sticker: '💼',
        color: 'green'
    },
    {
        date: 'Today & Forever',
        title: 'Our Love Story Continues',
        desc: 'Every obstacle has only made our love stronger. I promise to cherish every moment and build the beautiful future we dream of together.',
        icon: <Heart className="w-4 h-4 text-white fill-white" />,
        sticker: '💞',
        color: 'pink'
    },
];

// Animated sticker components moved outside and memoized
const FloatingHeart = memo(({ delay = 0, x = 0, y = 0, size = 20, color = "pink" }) => (
    <motion.div
        className="absolute pointer-events-none"
        style={{ left: `${x}%`, top: `${y}%` }}
        animate={{
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0],
            scale: [1, 1.2, 1],
        }}
        transition={{
            duration: 3,
            delay,
            repeat: Infinity,
            ease: "easeInOut"
        }}
    >
        <Heart className={`w-${size} h-${size}`} style={{ width: `${size}px`, height: `${size}px` }} fill={color === "pink" ? "#ec4899" : "#fbbf24"} stroke={color === "pink" ? "#ec4899" : "#fbbf24"} opacity={0.3} />
    </motion.div>
));

const SparkleSticker = memo(({ delay = 0, x = 0, y = 0, size = 16 }) => (
    <motion.div
        className="absolute pointer-events-none"
        style={{ left: `${x}%`, top: `${y}%` }}
        animate={{
            scale: [0, 1, 0],
            rotate: [0, 180, 360],
            opacity: [0, 1, 0],
        }}
        transition={{
            duration: 2,
            delay,
            repeat: Infinity,
            ease: "easeInOut"
        }}
    >
        <Sparkles className="text-yellow-400" style={{ width: `${size}px`, height: `${size}px` }} />
    </motion.div>
));

const StarSticker = memo(({ delay = 0, x = 0, y = 0, size = 12 }) => (
    <motion.div
        className="absolute pointer-events-none"
        style={{ left: `${x}%`, top: `${y}%` }}
        animate={{
            rotate: [0, 360],
            scale: [1, 1.3, 1],
        }}
        transition={{
            duration: 4,
            delay,
            repeat: Infinity,
            ease: "linear"
        }}
    >
        <Star className="text-pink-400" style={{ width: `${size}px`, height: `${size}px` }} fill="#f9a8d4" />
    </motion.div>
));

const FloatingEmoji = memo(({ emoji, delay = 0, x = 0, y = 0, size = 20 }) => (
    <motion.div
        className="absolute pointer-events-none"
        style={{
            left: `${x}%`,
            top: `${y}%`,
            fontSize: `${size}px`
        }}
        animate={{
            y: [0, -15, 0],
            x: [0, 5, -5, 0],
            rotate: [0, 10, -10, 0],
            scale: [1, 1.2, 1],
        }}
        transition={{
            duration: 3,
            delay,
            repeat: Infinity,
            ease: "easeInOut"
        }}
    >
        {emoji}
    </motion.div>
));

const PulsingCircle = memo(({ delay = 0, x = 0, y = 0, size = 60, color = "#fce7f3" }) => (
    <motion.div
        className="absolute pointer-events-none rounded-full"
        style={{
            left: `${x}%`,
            top: `${y}%`,
            width: `${size}px`,
            height: `${size}px`,
            background: color,
        }}
        animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.1, 0.3],
        }}
        transition={{
            duration: 3,
            delay,
            repeat: Infinity,
            ease: "easeInOut"
        }}
    />
));

const getColorClass = (color) => {
    const colorMap = {
        'pink': 'border-l-pink-500 bg-pink-50',
        'yellow': 'border-l-yellow-500 bg-yellow-50',
        'purple': 'border-l-purple-500 bg-purple-50',
        'blue': 'border-l-blue-500 bg-blue-50',
        'green': 'border-l-green-500 bg-green-50'
    };
    return colorMap[color] || colorMap['pink'];
};

const getIconBgClass = (color) => {
    const colorMap = {
        'pink': 'bg-pink-500',
        'yellow': 'bg-yellow-500',
        'purple': 'bg-purple-500',
        'blue': 'bg-blue-500',
        'green': 'bg-green-500'
    };
    return colorMap[color] || colorMap['pink'];
};

const TimelineItem = memo(({ event, index }) => {
    const isEven = index % 2 === 0;
    return (
        <div className={`relative flex items-center mb-12 sm:mb-24 ${isEven ? 'sm:flex-row-reverse' : 'sm:flex-row'}`}>
            {/* Timeline Dot */}
            <motion.div
                className={`absolute left-4 sm:left-1/2 top-10 sm:top-1/2 w-8 h-8 ${getIconBgClass(event.color)} border-4 border-white rounded-full z-10 items-center justify-center shadow-lg transform -translate-x-1/2 sm:-translate-y-1/2`}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
            >
                {event.icon}
            </motion.div>

            {/* Card on Side */}
            <div className={`w-full sm:w-[45%] pl-12 sm:pl-0 ${isEven ? 'sm:pr-12' : 'sm:pl-12'}`}>
                <motion.div
                    initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className={`bg-white p-6 sm:p-8 rounded-3xl shadow-xl border border-pink-50 border-l-8 ${getColorClass(event.color)} relative overflow-hidden group`}
                    whileHover={{ y: -5 }}
                >
                    {/* Emoji sticker */}
                    <motion.div
                        className="absolute top-4 right-4 text-3xl"
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 3, repeat: Infinity }}
                    >
                        {event.sticker}
                    </motion.div>

                    <span className="text-xs font-black text-pink-400 uppercase tracking-widest block mb-2">{event.date}</span>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3">{event.title}</h3>
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{event.desc}</p>

                    {/* Hover decoration */}
                    <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-pink-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-pink-300" />
                    </div>
                </motion.div>
            </div>

            {/* Placeholder for balance on desktop */}
            <div className="hidden sm:block sm:w-[50%]" />
        </div>
    );
});

const Story = () => {
    const [timeElapsed, setTimeElapsed] = useState({
        years: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        // Assuming 1st Love Date was Sep 4, 2020 as per user context
        const startDate = new Date('2020-09-04T00:00:00');

        const calculateTime = () => {
            const now = new Date();
            const diff = now.getTime() - startDate.getTime();

            const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
            const days = Math.floor((diff / (1000 * 60 * 60 * 24)) % 365);
            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((diff / (1000 * 60)) % 60);
            const seconds = Math.floor((diff / 1000) % 60);

            setTimeElapsed({ years, days, hours, minutes, seconds });
        };

        calculateTime();
        const timer = setInterval(calculateTime, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="min-h-screen bg-[#FFF5F7] p-6 relative overflow-hidden">
            {/* LED Wire Lights */}
            <WireLights color="pink" position="top" />
            <WireLights color="yellow" position="bottom" />

            {/* Floating Hearts */}
            <FloatingHearts side="both" color="pink" count={15} />

            {/* Animated Background Stickers */}
            <FloatingHeart delay={0} x={10} y={15} size={24} />
            <FloatingHeart delay={0.5} x={85} y={20} size={20} color="yellow" />
            <FloatingHeart delay={1} x={15} y={60} size={18} />
            <FloatingHeart delay={1.5} x={90} y={70} size={22} />

            <FloatingEmoji emoji="🏍️" delay={0.7} x={18} y={25} size={24} />
            <FloatingEmoji emoji="💑" delay={1.2} x={82} y={40} size={28} />
            <FloatingEmoji emoji="💌" delay={1.8} x={12} y={75} size={22} />
            <FloatingEmoji emoji="✨" delay={2.3} x={88} y={82} size={26} />

            <SparkleSticker delay={0.2} x={5} y={30} size={20} />
            <SparkleSticker delay={1.2} x={92} y={45} size={16} />
            <SparkleSticker delay={2} x={8} y={80} size={18} />

            <StarSticker delay={0} x={20} y={10} size={14} />
            <StarSticker delay={1} x={80} y={35} size={12} />
            <StarSticker delay={2} x={25} y={85} size={16} />
            <StarSticker delay={0.5} x={88} y={90} size={14} />

            <PulsingCircle delay={0} x={5} y={5} size={100} />
            <PulsingCircle delay={1} x={85} y={15} size={80} color="#fef3c7" />
            <PulsingCircle delay={2} x={10} y={75} size={90} />

            <div className="max-w-5xl mx-auto relative z-10">
                <Link to="/home" className="inline-flex items-center gap-2 text-pink-500 font-semibold mb-8 hover:text-pink-600 transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Home
                </Link>

                {/* Love Timer card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white p-4 sm:p-8 rounded-[1.5rem] sm:rounded-[2rem] shadow-xl border border-pink-100 text-center mb-16 relative overflow-hidden"
                >
                    {/* Card Decorative Stickers */}
                    <motion.div
                        className="absolute top-4 right-4"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    >
                        <Star className="w-6 h-6 text-yellow-400 fill-yellow-400 opacity-40" />
                    </motion.div>

                    <div className="inline-block p-3 sm:p-4 bg-pink-50 rounded-full mb-4">
                        <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        >
                            <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-pink-500 fill-current" />
                        </motion.div>
                    </div>
                    <h2 className="text-2xl sm:text-4xl font-bold text-gray-800 mb-6 font-serif tracking-tight">Our Love Timer</h2>

                    <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-5 gap-3 sm:gap-4">
                        {Object.entries(timeElapsed).map(([unit, value]) => (
                            <motion.div
                                key={unit}
                                className="bg-pink-50 p-3 sm:p-5 rounded-xl sm:rounded-2xl border border-pink-100 flex flex-col justify-center relative overflow-hidden"
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <div className="text-2xl sm:text-3xl font-bold text-pink-600 font-mono leading-none relative z-10">{value}</div>
                                <div className="text-[10px] sm:text-xs uppercase tracking-widest text-pink-400 font-bold mt-1 relative z-10">{unit}</div>
                            </motion.div>
                        ))}
                    </div>
                    <p className="mt-8 text-sm sm:text-base text-gray-500 italic">Every second with you, Srimathi, is a treasure I cherish forever.</p>
                </motion.div>

                {/* Alternating Timeline */}
                <div className="relative">
                    {/* Continuous vertical line */}
                    <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-pink-200 via-rose-300 to-pink-200 ml-[-2px] rounded-full" />

                    {timelineEvents.map((event, index) => (
                        <TimelineItem key={index} event={event} index={index} />
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="mt-12 text-center relative"
                >
                    <motion.div
                        animate={{
                            rotate: 360,
                            scale: [1, 1.2, 1]
                        }}
                        transition={{
                            rotate: { duration: 4, repeat: Infinity, ease: "linear" },
                            scale: { duration: 2, repeat: Infinity }
                        }}
                    >
                        <Sparkles className="w-8 h-8 text-yellow-400 mx-auto mb-4" />
                    </motion.div>

                    <p className="text-pink-600 font-serif text-2xl italic">
                        "Distance means so little when someone means so much"
                    </p>

                    <p className="text-gray-600 mt-4 max-w-lg mx-auto">
                        Every challenge we've faced has only made our love stronger. From bike rides to long distances,
                        our story is just beginning. I promise to cherish every moment with you, Srimathi.
                    </p>

                    {/* Heart Banner */}
                    <motion.div
                        className="flex justify-center gap-1 mt-6"
                        animate={{
                            y: [0, -5, 0]
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity
                        }}
                    >
                        {[...Array(7)].map((_, i) => (
                            <motion.div
                                key={i}
                                animate={{
                                    y: [0, i % 2 === 0 ? -8 : -4, 0],
                                    scale: [1, 1.2, 1],
                                }}
                                transition={{
                                    duration: 1.5,
                                    delay: i * 0.1,
                                    repeat: Infinity,
                                }}
                            >
                                <Heart
                                    className="w-5 h-5 text-pink-400 fill-pink-400"
                                    fill="currentColor"
                                />
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Final decorative elements */}
                    <motion.div
                        className="mt-8 flex justify-center"
                        whileInView={{
                            scale: [0.8, 1],
                            opacity: [0, 1]
                        }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="bg-white px-6 py-3 rounded-full shadow-md border border-pink-100">
                            <span className="text-pink-500 font-bold">
                                To eternity and beyond...
                            </span>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

export default memo(Story);

