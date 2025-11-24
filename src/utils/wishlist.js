/**
 * Wishlist utility functions for managing book favorites in localStorage
 */

const WISHLIST_KEY = 'bookstar_wishlist';

/**
 * Get all books from wishlist
 * @returns {Array} 
 */
export const getWishlist = () => {
  if (typeof window === 'undefined') return [];
  
  try {
    const wishlist = localStorage.getItem(WISHLIST_KEY);
    return wishlist ? JSON.parse(wishlist) : [];
  } catch (error) {
    console.error('Error reading wishlist:', error);
    return [];
  }
};

/**
 * Add a book to wishlist
 * @param {Object} book
 * @returns {boolean} 
 */
export const addToWishlist = (book) => {
  if (typeof window === 'undefined') return false;
  
  try {
    const wishlist = getWishlist();
    
    // Check if book already exists
    const exists = wishlist.some(item => item.id === book.id);
    if (exists) return false;
    
    // Add new book at the beginning
    wishlist.unshift(book);
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
    return true;
  } catch (error) {
    console.error('Error adding to wishlist:', error);
    return false;
  }
};

/**
 * Remove a book from wishlist
 * @param {string} bookId 
 * @returns {boolean} 
 */
export const removeFromWishlist = (bookId) => {
  if (typeof window === 'undefined') return false;
  
  try {
    const wishlist = getWishlist();
    const filtered = wishlist.filter(item => item.id !== bookId);
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(filtered));
    return true;
  } catch (error) {
    console.error('Error removing from wishlist:', error);
    return false;
  }
};

/**
 * Check if a book is in wishlist
 * @param {string} bookId 
 * @returns {boolean} 
 */
export const isInWishlist = (bookId) => {
  if (typeof window === 'undefined') return false;
  
  const wishlist = getWishlist();
  return wishlist.some(item => item.id === bookId);
};

/**
 * Toggle book in wishlist (add if not present, remove if present)
 * @param {Object} book - Book object
 * @returns {boolean} True if added, false if removed
 */
export const toggleWishlist = (book) => {
  if (isInWishlist(book.id)) {
    removeFromWishlist(book.id);
    return false;
  } else {
    addToWishlist(book);
    return true;
  }
};

/**
 * Clear entire wishlist
 */
export const clearWishlist = () => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(WISHLIST_KEY);
};
