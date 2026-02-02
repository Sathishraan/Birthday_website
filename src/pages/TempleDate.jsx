import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowLeft, Heart, Sparkles, MapPin, Star, Flame, Sun } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useRef, useEffect, memo } from 'react';
import FloatingHearts from '../components/FloatingHearts';
import WireLights from '../components/WireLights';
import LazyImage from '../components/LazyImage';
import { getMemoryUrl, getAudioUrl } from '../config/imageConfig';

const images = [
    {
        src: 'IMG-20220524-WA0007.jpg',
        caption: 'Where faith met destiny',
        note: 'Sacred Beginnings',
        poem: 'Under the shadow of ancient spires, I discovered truth—',
        poemEnd: 'that the divine I sought was already standing beside me in you.',
        bgColor: 'from-orange-900/40 via-amber-800/30 to-yellow-900/40',
        accentColor: 'orange',
        frameType: 'lotus'
    },
    {
        src: 'IMG20230413182106.jpg',
        caption: 'Every prayer begins and ends with you',
        note: 'Divine Peace',
        poem: 'I bowed before the deity, but my soul bowed to you—',
        poemEnd: 'the answer to every prayer I never knew how to speak.',
        bgColor: 'from-amber-900/40 via-orange-800/30 to-red-900/40',
        accentColor: 'amber',
        frameType: 'pillars'
    },
    {
        src: 'IMG20230413183056.jpg',
        caption: 'In sacred silence, love spoke volumes',
        note: 'Silent Vows',
        poem: 'The temple bells rang, but my heart beat louder—',
        poemEnd: 'whispering promises only your soul could hear.',
        bgColor: 'from-yellow-900/40 via-amber-800/30 to-orange-900/40',
        accentColor: 'yellow',
        frameType: 'arch'
    },
    {
        src: 'IMG20240609062411.jpg',
        caption: 'Your presence sanctifies every moment',
        note: 'Temple Serenity',
        poem: 'Incense smoke curled like our intertwined destinies—',
        poemEnd: 'rising toward heaven, blessed and eternal.',
        bgColor: 'from-rose-900/40 via-orange-800/30 to-amber-900/40',
        accentColor: 'rose',
        frameType: 'gopuram'
    },
    {
        src: 'IMG20240905135106.jpg',
        caption: 'My greatest blessing wears your smile',
        note: 'Eternal Gratitude',
        poem: 'They say miracles happen in holy places—',
        poemEnd: 'and mine happened the moment I found you, Srimathi.',
        bgColor: 'from-red-900/40 via-rose-800/30 to-pink-900/40',
        accentColor: 'red',
        frameType: 'mandala'
    },
    {
        src: 'IMG-20220331-WA0025.jpg',
        caption: 'A moment of peace in the divine embrace',
        note: 'Serene Soul',
        poem: 'In the quiet corners of the sacred hall,',
        poemEnd: 'I found a peace that answers every call.',
        bgColor: 'from-orange-900/40 via-amber-800/30 to-yellow-900/40',
        accentColor: 'orange',
        frameType: 'lotus'
    },
    {
        src: 'IMG-20220331-WA0064.jpg',
        caption: 'Walking the path of grace with you',
        note: 'Path of Grace',
        poem: 'Steps taken together on holy ground,',
        poemEnd: 'echo with a love profound.',
        bgColor: 'from-yellow-900/40 via-amber-800/30 to-orange-900/40',
        accentColor: 'yellow',
        frameType: 'pillars'
    },
    {
        src: 'IMG-20220607-WA0005.jpg',
        caption: 'Blessed by the morning light',
        note: 'Morning Blessings',
        poem: 'Sunbeams dance on the temple stone,',
        poemEnd: 'lighting the love that we have known.',
        bgColor: 'from-red-900/40 via-rose-800/30 to-pink-900/40',
        accentColor: 'rose',
        frameType: 'arch'
    },
    {
        src: 'IMG-20220625-WA0000.jpg',
        caption: 'Two souls, one sacred journey',
        note: 'Union',
        poem: 'Bound by faith and love so true,',
        poemEnd: 'my spiritual journey begins with you.',
        bgColor: 'from-amber-900/40 via-orange-800/30 to-red-900/40',
        accentColor: 'amber',
        frameType: 'gopuram'
    },
    {
        src: 'IMG-20220817-WA0012.jpg',
        caption: 'Timeless devotion, captured forever',
        note: 'Devotion',
        poem: 'Like the carvings that weather the test of time,',
        poemEnd: 'our love is an eternal rhyme.',
        bgColor: 'from-rose-900/40 via-orange-800/30 to-amber-900/40',
        accentColor: 'red',
        frameType: 'mandala'
    },
    {
        src: 'IMG_20220625_182819.jpg',
        caption: 'Bathed in the golden hour of faith',
        note: 'Golden Hour',
        poem: 'As day turns to dusk in the holy place,',
        poemEnd: 'I find my heaven in your embrace.',
        bgColor: 'from-orange-900/40 via-yellow-800/30 to-amber-900/40',
        accentColor: 'orange',
        frameType: 'lotus'
    }
];

const accentColors = {
    orange: { border: 'border-orange-400/40', text: 'text-orange-300', bg: 'bg-orange-500/20', glow: 'shadow-orange-500/30' },
    amber: { border: 'border-amber-400/40', text: 'text-amber-300', bg: 'bg-amber-500/20', glow: 'shadow-amber-500/30' },
    yellow: { border: 'border-yellow-400/40', text: 'text-yellow-300', bg: 'bg-yellow-500/20', glow: 'shadow-yellow-500/30' },
    rose: { border: 'border-rose-400/40', text: 'text-rose-300', bg: 'bg-rose-500/20', glow: 'shadow-rose-500/30' },
    red: { border: 'border-red-400/40', text: 'text-red-300', bg: 'bg-red-500/20', glow: 'shadow-red-500/30' }
};

// Temple path component moved outside and memoized
const TemplePath = memo(() => {
    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-20">
            <svg viewBox="0 0 100 100" className="absolute left-0 top-0 h-full w-full">
                <path
                    d="M50,0 C35,20 65,40 50,60 C35,80 65,100 50,120"
                    fill="none"
                    stroke="url(#templePathGradient)"
                    strokeWidth="0.5"
                    strokeDasharray="1,2"
                />
                <defs>
                    <linearGradient id="templePathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#ea580c" />
                        <stop offset="50%" stopColor="#f59e0b" />
                        <stop offset="100%" stopColor="#ea580c" />
                    </linearGradient>
                </defs>
            </svg>

            {/* Temple columns on sides */}
            <div className="absolute left-[10%] top-0 bottom-0 w-[1px] bg-gradient-to-b from-orange-500/0 via-orange-500/20 to-orange-500/0"></div>
            <div className="absolute left-[90%] top-0 bottom-0 w-[1px] bg-gradient-to-b from-orange-500/0 via-orange-500/20 to-orange-500/0"></div>

            {/* Horizontal temple lines */}
            {[...Array(10)].map((_, i) => (
                <div
                    key={i}
                    className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-orange-500/0 via-orange-500/20 to-orange-500/0"
                    style={{ top: `${(i + 1) * 10}%` }}
                ></div>
            ))}
        </div>
    );
});

// Frame Components moved outside and memoized
const LotusFrame = memo(({ colors }) => (
    <div className="absolute inset-0 z-10 pointer-events-none">
        <div className={`absolute inset-0 bg-black/30 rounded-3xl ${colors.border}`}></div>

        {/* Lotus Petals */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
            {/* Top petals */}
            <path d="M50,0 C60,15 70,15 80,5 C70,25 60,25 50,15 C40,25 30,25 20,5 C30,15 40,15 50,0"
                fill="none"
                stroke={`url(#${colors.text.replace('text-', '')}-gradient)`}
                strokeWidth="0.3"
                opacity="0.7" />

            {/* Bottom petals */}
            <path d="M50,100 C60,85 70,85 80,95 C70,75 60,75 50,85 C40,75 30,75 20,95 C30,85 40,85 50,100"
                fill="none"
                stroke={`url(#${colors.text.replace('text-', '')}-gradient)`}
                strokeWidth="0.3"
                opacity="0.7" />

            {/* Left petals */}
            <path d="M0,50 C15,60 15,70 5,80 C25,70 25,60 15,50 C25,40 25,30 5,20 C15,30 15,40 0,50"
                fill="none"
                stroke={`url(#${colors.text.replace('text-', '')}-gradient)`}
                strokeWidth="0.3"
                opacity="0.7" />

            {/* Right petals */}
            <path d="M100,50 C85,60 85,70 95,80 C75,70 75,60 85,50 C75,40 75,30 95,20 C85,30 85,40 100,50"
                fill="none"
                stroke={`url(#${colors.text.replace('text-', '')}-gradient)`}
                strokeWidth="0.3"
                opacity="0.7" />

            <defs>
                <linearGradient id="orange-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#ea580c" />
                    <stop offset="100%" stopColor="#f59e0b" />
                </linearGradient>
                <linearGradient id="amber-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#d97706" />
                    <stop offset="100%" stopColor="#fbbf24" />
                </linearGradient>
                <linearGradient id="yellow-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#ca8a04" />
                    <stop offset="100%" stopColor="#facc15" />
                </linearGradient>
                <linearGradient id="rose-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#be123c" />
                    <stop offset="100%" stopColor="#fb7185" />
                </linearGradient>
                <linearGradient id="red-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#b91c1c" />
                    <stop offset="100%" stopColor="#f87171" />
                </linearGradient>
            </defs>
        </svg>

        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-orange-400/50 to-transparent"></div>
        <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-orange-400/50 to-transparent"></div>
        <div className="absolute inset-y-0 left-0 w-[1px] bg-gradient-to-b from-transparent via-orange-400/50 to-transparent"></div>
        <div className="absolute inset-y-0 right-0 w-[1px] bg-gradient-to-b from-transparent via-orange-400/50 to-transparent"></div>

        <div className="absolute top-0 left-0 w-20 h-20 border-t border-l border-orange-400/30 rounded-tl-3xl"></div>
        <div className="absolute top-0 right-0 w-20 h-20 border-t border-r border-orange-400/30 rounded-tr-3xl"></div>
        <div className="absolute bottom-0 left-0 w-20 h-20 border-b border-l border-orange-400/30 rounded-bl-3xl"></div>
        <div className="absolute bottom-0 right-0 w-20 h-20 border-b border-r border-orange-400/30 rounded-br-3xl"></div>
    </div>
));

const PillarFrame = memo(({ colors }) => (
    <div className="absolute inset-0 z-10 pointer-events-none">
        <div className={`absolute inset-0 bg-black/30 rounded-3xl ${colors.border}`}></div>

        {/* Left Pillar */}
        <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-12 md:w-16 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-amber-950/80 via-amber-900/60 to-amber-950/80 border-r border-orange-400/30"></div>

            {/* Pillar details */}
            <div className="absolute top-0 left-0 right-0 h-12 border-b border-orange-400/30 bg-amber-900/60"></div>
            <div className="absolute bottom-0 left-0 right-0 h-12 border-t border-orange-400/30 bg-amber-900/60"></div>

            {/* Decorative lines */}
            {[...Array(10)].map((_, i) => (
                <div key={i} className="absolute left-0 right-0 h-[1px] bg-orange-400/20" style={{ top: `${10 + i * 8}%` }}></div>
            ))}
        </div>

        {/* Right Pillar */}
        <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-12 md:w-16 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-amber-950/80 via-amber-900/60 to-amber-950/80 border-l border-orange-400/30"></div>

            {/* Pillar details */}
            <div className="absolute top-0 left-0 right-0 h-12 border-b border-orange-400/30 bg-amber-900/60"></div>
            <div className="absolute bottom-0 left-0 right-0 h-12 border-t border-orange-400/30 bg-amber-900/60"></div>

            {/* Decorative lines */}
            {[...Array(10)].map((_, i) => (
                <div key={i} className="absolute left-0 right-0 h-[1px] bg-orange-400/20" style={{ top: `${10 + i * 8}%` }}></div>
            ))}
        </div>

        {/* Top arch */}
        <svg className="absolute inset-x-0 top-0 h-16" viewBox="0 0 100 20">
            <path
                d="M0,20 L10,20 C30,20 30,0 50,0 C70,0 70,20 90,20 L100,20"
                fill="none"
                stroke={`url(#${colors.text.replace('text-', '')}-gradient-pillar)`}
                strokeWidth="0.5"
            />
            <defs>
                <linearGradient id="orange-gradient-pillar" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#ea580c" />
                    <stop offset="100%" stopColor="#f59e0b" />
                </linearGradient>
                <linearGradient id="amber-gradient-pillar" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#d97706" />
                    <stop offset="100%" stopColor="#fbbf24" />
                </linearGradient>
                <linearGradient id="yellow-gradient-pillar" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#ca8a04" />
                    <stop offset="100%" stopColor="#facc15" />
                </linearGradient>
                <linearGradient id="rose-gradient-pillar" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#be123c" />
                    <stop offset="100%" stopColor="#fb7185" />
                </linearGradient>
                <linearGradient id="red-gradient-pillar" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#b91c1c" />
                    <stop offset="100%" stopColor="#f87171" />
                </linearGradient>
            </defs>
        </svg>

        {/* Bottom decoration */}
        <div className="absolute left-16 right-16 bottom-0 h-4 border-t border-orange-400/30"></div>
    </div>
));

const ArchFrame = memo(({ colors }) => (
    <div className="absolute inset-0 z-10 pointer-events-none">
        <div className={`absolute inset-0 bg-black/30 rounded-3xl ${colors.border}`}></div>

        {/* Main arch */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path
                d="M10,100 L10,30 C10,10 30,5 50,5 C70,5 90,10 90,30 L90,100"
                fill="none"
                stroke={`url(#${colors.text.replace('text-', '')}-gradient-arch)`}
                strokeWidth="0.5"
            />

            {/* Inner arch */}
            <path
                d="M20,100 L20,35 C20,20 35,15 50,15 C65,15 80,20 80,35 L80,100"
                fill="none"
                stroke={`url(#${colors.text.replace('text-', '')}-gradient-arch)`}
                strokeWidth="0.3"
                strokeDasharray="1,1"
            />

            {/* Decorative elements */}
            {[...Array(10)].map((_, i) => (
                <circle key={i} cx="50" cy={(i + 1) * 8} r="0.5" fill={colors.text.replace('text-', '#')} />
            ))}

            <defs>
                <linearGradient id="orange-gradient-arch" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#ea580c" />
                    <stop offset="100%" stopColor="#f59e0b" />
                </linearGradient>
                <linearGradient id="amber-gradient-arch" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#d97706" />
                    <stop offset="100%" stopColor="#fbbf24" />
                </linearGradient>
                <linearGradient id="yellow-gradient-arch" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#ca8a04" />
                    <stop offset="100%" stopColor="#facc15" />
                </linearGradient>
                <linearGradient id="rose-gradient-arch" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#be123c" />
                    <stop offset="100%" stopColor="#fb7185" />
                </linearGradient>
                <linearGradient id="red-gradient-arch" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#b91c1c" />
                    <stop offset="100%" stopColor="#f87171" />
                </linearGradient>
            </defs>
        </svg>

        {/* Bottom decorations */}
        <div className="absolute left-0 right-0 bottom-0 h-8 border-t border-orange-400/20"></div>
        <div className="absolute left-[10%] right-[10%] bottom-0 h-4 border-t border-orange-400/30"></div>
    </div>
));

const GopuramFrame = memo(({ colors }) => (
    <div className="absolute inset-0 z-10 pointer-events-none">
        <div className={`absolute inset-0 bg-black/30 rounded-3xl ${colors.border}`}></div>

        {/* Gopuram outline */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {/* Main tower */}
            <path
                d="M35,100 L35,20 L40,15 L45,20 L50,15 L55,20 L60,15 L65,20 L65,100"
                fill="none"
                stroke={`url(#${colors.text.replace('text-', '')}-gradient-gopuram)`}
                strokeWidth="0.4"
            />

            {/* Side towers */}
            <path d="M15,100 L15,40 L20,35 L25,40 L30,35 L35,40" fill="none" stroke={`url(#${colors.text.replace('text-', '')}-gradient-gopuram)`} strokeWidth="0.3" />
            <path d="M85,100 L85,40 L80,35 L75,40 L70,35 L65,40" fill="none" stroke={`url(#${colors.text.replace('text-', '')}-gradient-gopuram)`} strokeWidth="0.3" />

            <defs>
                <linearGradient id="orange-gradient-gopuram" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#ea580c" />
                    <stop offset="100%" stopColor="#f59e0b" />
                </linearGradient>
                <linearGradient id="amber-gradient-gopuram" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#d97706" />
                    <stop offset="100%" stopColor="#fbbf24" />
                </linearGradient>
                <linearGradient id="yellow-gradient-gopuram" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#ca8a04" />
                    <stop offset="100%" stopColor="#facc15" />
                </linearGradient>
                <linearGradient id="rose-gradient-gopuram" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#be123c" />
                    <stop offset="100%" stopColor="#fb7185" />
                </linearGradient>
                <linearGradient id="red-gradient-gopuram" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#b91c1c" />
                    <stop offset="100%" stopColor="#f87171" />
                </linearGradient>
            </defs>
        </svg>

        {/* Bottom platform */}
        <div className="absolute left-0 right-0 bottom-0 h-10 bg-gradient-to-t from-amber-900/30 to-transparent border-t border-orange-400/30"></div>
    </div>
));

const MandalaFrame = memo(({ colors }) => (
    <div className="absolute inset-0 z-10 pointer-events-none">
        <div className={`absolute inset-0 bg-black/30 rounded-3xl ${colors.border}`}></div>

        {/* Mandala SVG */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" stroke={`url(#${colors.text.replace('text-', '')}-gradient-mandala)`} strokeWidth="0.3" />
            <circle cx="50" cy="50" r="35" fill="none" stroke={`url(#${colors.text.replace('text-', '')}-gradient-mandala)`} strokeWidth="0.2" />
            <circle cx="50" cy="50" r="25" fill="none" stroke={`url(#${colors.text.replace('text-', '')}-gradient-mandala)`} strokeWidth="0.4" />

            <defs>
                <linearGradient id="orange-gradient-mandala" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#ea580c" />
                    <stop offset="100%" stopColor="#f59e0b" />
                </linearGradient>
                <linearGradient id="amber-gradient-mandala" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#d97706" />
                    <stop offset="100%" stopColor="#fbbf24" />
                </linearGradient>
                <linearGradient id="yellow-gradient-mandala" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#ca8a04" />
                    <stop offset="100%" stopColor="#facc15" />
                </linearGradient>
                <linearGradient id="rose-gradient-mandala" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#be123c" />
                    <stop offset="100%" stopColor="#fb7185" />
                </linearGradient>
                <linearGradient id="red-gradient-mandala" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#b91c1c" />
                    <stop offset="100%" stopColor="#f87171" />
                </linearGradient>
            </defs>
        </svg>

        {/* Corner decorations */}
        <div className="absolute top-3 left-3 w-12 h-12 border-t border-l border-orange-400/30 rounded-tl-xl"></div>
        <div className="absolute top-3 right-3 w-12 h-12 border-t border-r border-orange-400/30 rounded-tr-xl"></div>
        <div className="absolute bottom-3 left-3 w-12 h-12 border-b border-l border-orange-400/30 rounded-bl-xl"></div>
        <div className="absolute bottom-3 right-3 w-12 h-12 border-b border-r border-orange-400/30 rounded-br-xl"></div>
    </div>
));

// Image section component moved outside and memoized
const ImageSection = memo(({ item, index, colors }) => {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const isEven = index % 2 === 0;
    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.2, 1, 1.2]);
    const smoothY = useSpring(y, { stiffness: 100, damping: 30 });

    const renderFrame = () => {
        switch (item.frameType) {
            case 'lotus': return <LotusFrame colors={colors} />;
            case 'pillars': return <PillarFrame colors={colors} />;
            case 'arch': return <ArchFrame colors={colors} />;
            case 'gopuram': return <GopuramFrame colors={colors} />;
            case 'mandala': return <MandalaFrame colors={colors} />;
            default: return null;
        }
    };

    return (
        <div ref={sectionRef} className="min-h-screen w-full relative overflow-hidden flex items-center justify-center py-12 md:py-20">
            {/* Parallax Background Image - Blurred */}
            <motion.div style={{ scale, y: smoothY }} className="absolute inset-0 z-0">
                <div className="absolute inset-0 w-full h-full">
                    <LazyImage
                        src={getMemoryUrl('temple_date', item.src)}
                        alt={item.caption}
                        className="w-full h-full object-cover object-center blur-2xl opacity-30"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-b ${item.bgColor}`} />
                    <div className="absolute inset-0 bg-black/60" />
                </div>
            </motion.div>

            {/* Floating Flames/Hearts Animation */}
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
                        {i % 2 === 0 ? <Flame size={15 + Math.random() * 40} fill="currentColor" /> : <Heart size={15 + Math.random() * 40} fill="currentColor" />}
                    </motion.div>
                ))}
            </div>

            {/* Instagram-Style Framed Image */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8, x: isEven ? -100 : 100, y: 50 }}
                whileInView={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className={`absolute top-1/2 -translate-y-1/2 z-30 ${isEven ? 'left-[5%] sm:left-[8%] md:left-[12%]' : 'right-[5%] sm:right-[8%] md:right-[12%]'}`}
            >
                <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-amber-900/80 to-orange-900/80 p-3">
                    <div className="relative">
                        <LazyImage
                            src={getMemoryUrl('temple_date', item.src)}
                            alt={item.caption}
                            className="w-[280px] h-[400px] sm:w-[300px] sm:h-[450px] md:w-[320px] md:h-[480px] rounded-2xl"
                            style={{ objectFit: 'contain', backgroundColor: 'rgba(0,0,0,0.1)' }}
                        />
                        {/* Overlay frames */}
                        {renderFrame()}
                    </div>

                    {/* Top Gradient Overlay */}
                    <div className="absolute top-3 left-3 right-3 h-32 bg-gradient-to-b from-black/70 to-transparent rounded-t-2xl pointer-events-none" />
                    {/* Bottom Gradient Overlay */}
                    <div className="absolute bottom-3 left-3 right-3 h-40 bg-gradient-to-t from-black/80 to-transparent rounded-b-2xl pointer-events-none" />

                    {/* Top Bar */}
                    <div className="absolute top-6 left-6 right-6 flex items-center justify-between pointer-events-none z-20">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center border-2 border-white">
                                <Flame className="w-5 h-5 text-white fill-white" />
                            </div>
                            <div>
                                <p className="text-white font-bold text-sm">Divine Moments</p>
                                <p className="text-white/80 text-xs">{item.note}</p>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Content */}
                    <div className="absolute bottom-6 left-6 right-6 pointer-events-none z-20">
                        <div className="flex items-center gap-2 mb-2">
                            <MapPin className="w-4 h-4 text-amber-300" />
                            <span className="text-amber-200 text-xs font-bold uppercase tracking-wider">Temple Date</span>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Content Side */}
            <div className={`relative z-20 w-full max-w-7xl px-4 sm:px-8 ${!isEven ? 'text-left' : 'text-right'}`}>
                <motion.div
                    initial={{ opacity: 0, x: !isEven ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500/30 to-amber-500/30 backdrop-blur-sm px-4 sm:px-6 py-2 sm:py-3 rounded-full border border-orange-400/40 mb-4 sm:mb-6 shadow-lg"
                >
                    <Flame className="w-3 h-3 sm:w-4 sm:h-4 text-orange-300" />
                    <span className="uppercase tracking-[0.2em] sm:tracking-[0.3em] font-bold text-[10px] sm:text-xs text-orange-200">{item.note}</span>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }} viewport={{ once: true }} className="mb-3 sm:mb-6 max-w-2xl" style={{ marginLeft: !isEven ? 0 : 'auto' }}>
                    <p className={`text-base sm:text-xl md:text-2xl font-serif italic ${colors.text} leading-relaxed drop-shadow-2xl`}>{item.poem}</p>
                </motion.div>

                <motion.h3 initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.8 }} viewport={{ once: true }} className="text-2xl sm:text-4xl md:text-6xl font-serif font-bold text-white leading-tight mb-3 sm:mb-6 max-w-3xl" style={{ marginLeft: !isEven ? 0 : 'auto' }}>"{item.caption}"</motion.h3>

                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1 }} viewport={{ once: true }} className="max-w-2xl" style={{ marginLeft: !isEven ? 0 : 'auto' }}>
                    <p className="text-sm sm:text-lg md:text-xl font-serif italic text-gray-200 leading-relaxed bg-black/30 backdrop-blur-sm px-3 sm:px-6 py-2 sm:py-4 rounded-2xl border border-white/10">{item.poemEnd}</p>
                </motion.div>
            </div>
        </div>
    );
});

const TempleDate = () => {
    const containerRef = useRef(null);
    const audioRef = useRef(null);

    useEffect(() => {
        audioRef.current = new Audio(getAudioUrl('marakkavillayae-masstamilanorg_nJP1z4h0.mp3'));
        audioRef.current.loop = true;
        audioRef.current.volume = 0.5;
        audioRef.current.play().catch(err => console.log("Audio play failed:", err));
        return () => { if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; } };
    }, []);

    return (
        <div ref={containerRef} className="bg-gradient-to-b from-orange-950 via-black to-amber-950 text-white overflow-x-hidden">
            <TemplePath />
            <FloatingHearts side="both" color="red" count={10} />

            <motion.div initial={{ y: -100 }} animate={{ y: 0 }} className="fixed top-0 left-0 w-full p-4 md:p-6 z-50 flex justify-between items-center">
                <Link to="/roadmap" className="bg-white/10 backdrop-blur-xl p-2 md:p-3 rounded-full hover:bg-white/20 transition-all hover:scale-110 border border-white/20">
                    <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 text-white" />
                </Link>
                <div className="flex items-center gap-2 bg-gradient-to-r from-orange-500/20 to-amber-500/20 backdrop-blur-xl px-4 md:px-6 py-2 md:py-3 rounded-full border border-orange-400/30">
                    <Heart className="w-4 h-4 md:w-5 md:h-5 text-orange-400 fill-current" />
                    <span className="font-serif italic text-sm md:text-lg tracking-wider">Divine Moments</span>
                </div>
            </motion.div>

            <section className="min-h-screen flex flex-col items-center justify-center relative px-4 md:px-6 text-center overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    {[...Array(20)].map((_, i) => (
                        <motion.div key={i} animate={{ opacity: [0, 0.4, 0], scale: [0, 1.5, 0], x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight }} transition={{ duration: 3 + Math.random() * 4, repeat: Infinity, delay: Math.random() * 5 }} className="absolute">
                            <Flame className="text-orange-500/20" size={20 + Math.random() * 60} fill="currentColor" />
                        </motion.div>
                    ))}
                </div>

                <div className="relative z-10 max-w-4xl">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
                        <motion.h2 animate={{ letterSpacing: ['0.3em', '0.4em', '0.3em'] }} transition={{ duration: 3, repeat: Infinity }} className="text-orange-400 uppercase font-bold text-xs md:text-sm mb-4 md:mb-6">Temple Date</motion.h2>
                        <h1 className="text-4xl sm:text-6xl md:text-8xl font-serif font-bold mb-4 md:mb-8 leading-tight">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400">Blessed</span>
                        </h1>
                        <p className="text-lg sm:text-xl md:text-2xl text-gray-300 italic font-serif leading-relaxed px-4">
                            Under the sacred aura, searching for peace, <br className="hidden sm:block" />
                            <span className="text-orange-300">I found my soul in you, Srimathi.</span>
                        </p>
                    </motion.div>
                </div>

                <motion.div animate={{ y: [0, 20, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
                    <span className="text-xs text-gray-400 uppercase tracking-widest">Ascend</span>
                    <div className="w-[2px] h-12 md:h-16 bg-gradient-to-b from-orange-500 via-amber-500 to-transparent" />
                </motion.div>
            </section>

            <div className="mx-auto relative">
                {images.map((item, index) => (
                    <ImageSection key={index} item={item} index={index} colors={accentColors[item.accentColor]} />
                ))}
            </div>

            <section className="min-h-screen flex flex-col items-center justify-center text-center px-4 md:px-6 py-12 md:py-20 relative overflow-hidden">
                <div className="absolute inset-0">
                    {[...Array(30)].map((_, i) => (
                        <motion.div key={i} animate={{ opacity: [0, 1, 0], y: ['100%', '-100%'], x: `${Math.random() * 100}%` }} transition={{ duration: 5 + Math.random() * 5, repeat: Infinity, delay: Math.random() * 5 }} className="absolute">
                            <Sparkles className="text-yellow-500/30" size={15 + Math.random() * 25} />
                        </motion.div>
                    ))}
                </div>

                <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1 }} className="relative p-8 md:p-12 rounded-3xl md:rounded-[3rem] bg-gradient-to-br from-orange-500/10 via-amber-500/10 to-yellow-500/10 backdrop-blur-2xl border border-white/20 max-w-2xl shadow-2xl">
                    <div className="relative">
                        <div className="flex justify-center mb-4">
                            <Sparkles className="w-12 h-12 md:w-16 md:h-16 text-yellow-400" />
                        </div>
                        <h3 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mb-4 md:mb-6 leading-tight">To <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">Eternity</span></h3>
                        <p className="text-gray-300 text-base md:text-lg mb-8 md:mb-10 leading-relaxed px-2">Hand in hand, blessed by the bells, into a future as bright as your smile. <br /><span className="text-orange-300 font-serif italic">Forever divine, Srimathi.</span></p>
                        <Link to="/roadmap">
                            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-gradient-to-r from-orange-600 to-amber-600 text-white font-bold py-3 md:py-4 px-8 md:px-12 rounded-2xl transition-all shadow-lg text-sm md:text-base">Continue the Journey</motion.button>
                        </Link>
                    </div>
                </motion.div>
            </section>
        </div>
    );
};

export default memo(TempleDate);
