import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LazyImage = ({ src, alt, className, ...props }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(false);

    return (
        <div className={`relative overflow-hidden ${className}`}>
            <AnimatePresence>
                {!isLoaded && !error && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-pink-50 animate-pulse flex items-center justify-center"
                    >
                        <div className="w-8 h-8 border-2 border-pink-200 border-t-pink-500 rounded-full animate-spin" />
                    </motion.div>
                )}
            </AnimatePresence>

            <img
                src={src}
                alt={alt}
                className={`w-full h-full transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                onLoad={() => setIsLoaded(true)}
                onError={() => setError(true)}
                loading="lazy"
                {...props}
            />

            {error && (
                <div className="absolute inset-0 bg-gray-100 flex items-center justify-center text-gray-400 text-xs text-center p-2">
                    Image failed to load
                </div>
            )}
        </div>
    );
};

export default React.memo(LazyImage);
