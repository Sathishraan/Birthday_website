import { motion, AnimatePresence } from 'framer-motion';
import { Gift, ArrowLeft, Heart, Music, MessageCircleHeart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, memo } from 'react';

const messages = [
    "You're the melody to my heart's song.",
    "Every day with you is a gift I promise to cherish.",
    "Your smile is my favorite view in the whole world.",
    "I love you more than words can express.",
    "You are my today and all of my tomorrows."
];

const Wishes = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="min-h-screen bg-[#FFF5F7] p-4 sm:p-6 flex flex-col items-center">
            <div className="w-full max-w-2xl">
                <Link to="/home" className="inline-flex items-center gap-2 text-pink-500 font-semibold mb-6 sm:mb-8 hover:text-pink-600 transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Home
                </Link>

                <div className="text-center mb-8 sm:mb-12">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2 font-serif text-pink-600">Special Wishes</h2>
                    <p className="text-sm sm:text-base text-gray-500 italic">Tap the gift to reveal my secrets...</p>
                </div>

                <div className="flex flex-col items-center mb-12">
                    {!isOpen ? (
                        <motion.div
                            whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                            onClick={() => setIsOpen(true)}
                            className="cursor-pointer relative mt-8"
                        >
                            <div className="absolute inset-0 bg-pink-400 blur-2xl opacity-20 animate-pulse" />
                            <Gift className="w-32 h-32 sm:w-48 h-48 text-pink-500 drop-shadow-2xl" />
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 bg-yellow-400 p-2 sm:p-3 rounded-full shadow-lg"
                            >
                                <Music className="w-4 h-4 sm:w-6 h-6 text-white" />
                            </motion.div>
                        </motion.div>
                    ) : (
                        <div className="w-full space-y-3 sm:space-y-4">
                            {messages.map((msg, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: i * 0.2 }}
                                    className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg border border-pink-100 flex items-center gap-3 sm:gap-4"
                                >
                                    <div className="p-2 sm:p-3 bg-pink-100 rounded-full text-pink-500 flex-shrink-0">
                                        <MessageCircleHeart className="w-5 h-5 sm:w-6 h-6" />
                                    </div>
                                    <p className="text-base sm:text-lg text-gray-700 font-medium italic leading-tight">"{msg}"</p>
                                </motion.div>
                            ))}

                            <motion.button
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.5 }}
                                onClick={() => setIsOpen(false)}
                                className="mt-8 mx-auto block text-pink-400 underline font-semibold py-2"
                            >
                                Close and wish again!
                            </motion.button>
                        </div>
                    )}
                </div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 pointer-events-none flex justify-center items-center overflow-hidden z-[-1]"
                    >
                        {[...Array(20)].map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{
                                    y: -100,
                                    x: Math.random() * window.innerWidth,
                                    rotate: 0,
                                    opacity: 1
                                }}
                                animate={{
                                    y: window.innerHeight + 100,
                                    rotate: 360,
                                    opacity: 0
                                }}
                                transition={{
                                    duration: 2 + Math.random() * 3,
                                    repeat: Infinity,
                                    delay: Math.random() * 5
                                }}
                                className="text-pink-300 absolute"
                            >
                                <Heart size={20 + Math.random() * 20} />
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default memo(Wishes);
