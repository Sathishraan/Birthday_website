/**
 * Asset Configuration
 * 
 * This file centralizes all asset paths for easy adjustment during deployment (Vercel, Netlify, etc.)
 */

// Deployment base path. Vite automatically handles import.meta.env.BASE_URL
const BASE_URL = import.meta.env.BASE_URL || '/';

// Ensure base URL ends with a slash for consistent path construction
const ensureTrailingSlash = (url) => url.endsWith('/') ? url : url + '/';

const CLEAN_BASE_URL = ensureTrailingSlash(BASE_URL);

/**
 * Helper to get the full URL for any asset
 * @param {string} path - The path relative to the public folder
 * @returns {string} The full asset URL
 */
export const getAssetUrl = (path) => {
    // Remove leading slash if present to avoid double slashes
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    return `${CLEAN_BASE_URL}${cleanPath}`;
};

/**
 * Helper to get the full URL for a memory image
 * @param {string} category - The folder name (e.g., 'diplomo', 'fav', 'vc')
 * @param {string} filename - The name of the image file
 * @returns {string} The full path to the image
 */
export const getMemoryUrl = (category, filename) => {
    return getAssetUrl(`memories/${category}/${filename}`);
};

/**
 * Helper to get the full URL for an audio file
 * @param {string} filename - The name of the audio file
 * @returns {string} The full path to the audio
 */
export const getAudioUrl = (filename) => {
    return getAssetUrl(`audio/${filename}`);
};

/**
 * Helper to get the full URL for a roadmap AI image
 * @param {string} filename - The name of the AI image file
 * @returns {string} The full path to the AI image
 */
export const getRoadmapUrl = (filename) => {
    return getAssetUrl(`assets/roadmap/${filename}`);
};

// Legacy support (optional, if you have other uses for ASSETS_PATH)
export const ASSETS_PATH = getAssetUrl('assets');
export const MEMORIES_BASE_PATH = getAssetUrl('memories');
