/**
 * Cart utility functions for managing shopping cart in localStorage
 */

const CART_KEY = 'bookstar_cart';

/**
 * Get all items from cart
 * @returns {Array} Array of cart items with book data and metadata
 */
export const getCart = () => {
  if (typeof window === 'undefined') return [];
  
  try {
    const cart = localStorage.getItem(CART_KEY);
    return cart ? JSON.parse(cart) : [];
  } catch (error) {
    console.error('Error reading cart:', error);
    return [];
  }
};

/**
 * Add a book to cart or increase quantity if already exists
 * @param {Object} book - Book object to add
 * @param {number} quantity - Quantity to add (default: 1)
 * @returns {boolean} Success status
 */
export const addToCart = (book, quantity = 1) => {
  if (typeof window === 'undefined') return false;
  
  try {
    const cart = getCart();
    
    // Check if book already exists in cart
    const existingIndex = cart.findIndex(item => item.id === book.id);
    
    if (existingIndex !== -1) {
      // Increase quantity
      cart[existingIndex].quantity += quantity;
    } else {
      // Add new item with metadata
      cart.push({
        ...book,
        quantity: quantity,
        selected: true, // Selected by default for checkout
        addedAt: new Date().toISOString()
      });
    }
    
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    return true;
  } catch (error) {
    console.error('Error adding to cart:', error);
    return false;
  }
};

/**
 * Remove a book from cart
 * @param {string} bookId - ID of book to remove
 * @returns {boolean} Success status
 */
export const removeFromCart = (bookId) => {
  if (typeof window === 'undefined') return false;
  
  try {
    const cart = getCart();
    const filtered = cart.filter(item => item.id !== bookId);
    localStorage.setItem(CART_KEY, JSON.stringify(filtered));
    return true;
  } catch (error) {
    console.error('Error removing from cart:', error);
    return false;
  }
};

/**
 * Update quantity of a cart item
 * @param {string} bookId - ID of book to update
 * @param {number} quantity - New quantity (must be >= 1)
 * @returns {boolean} Success status
 */
export const updateQuantity = (bookId, quantity) => {
  if (typeof window === 'undefined' || quantity < 1) return false;
  
  try {
    const cart = getCart();
    const itemIndex = cart.findIndex(item => item.id === bookId);
    
    if (itemIndex !== -1) {
      cart[itemIndex].quantity = quantity;
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error updating quantity:', error);
    return false;
  }
};

/**
 * Toggle selection status of a cart item
 * @param {string} bookId - ID of book to toggle
 * @returns {boolean} New selection status
 */
export const toggleSelection = (bookId) => {
  if (typeof window === 'undefined') return false;
  
  try {
    const cart = getCart();
    const itemIndex = cart.findIndex(item => item.id === bookId);
    
    if (itemIndex !== -1) {
      cart[itemIndex].selected = !cart[itemIndex].selected;
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
      return cart[itemIndex].selected;
    }
    return false;
  } catch (error) {
    console.error('Error toggling selection:', error);
    return false;
  }
};

/**
 * Select or deselect all items in cart
 * @param {boolean} selected - Selection status
 */
export const selectAll = (selected) => {
  if (typeof window === 'undefined') return;
  
  try {
    const cart = getCart();
    cart.forEach(item => {
      item.selected = selected;
    });
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  } catch (error) {
    console.error('Error selecting all:', error);
  }
};

/**
 * Check if a book is in cart
 * @param {string} bookId - ID of book to check
 * @returns {boolean} True if book is in cart
 */
export const isInCart = (bookId) => {
  if (typeof window === 'undefined') return false;
  
  const cart = getCart();
  return cart.some(item => item.id === bookId);
};

/**
 * Get total number of items in cart
 * @returns {number} Total item count
 */
export const getCartCount = () => {
  const cart = getCart();
  return cart.reduce((total, item) => total + item.quantity, 0);
};

/**
 * Get selected items from cart
 * @returns {Array} Array of selected cart items
 */
export const getSelectedItems = () => {
  const cart = getCart();
  return cart.filter(item => item.selected);
};

/**
 * Calculate total price of selected items
 * @returns {number} Total price
 */
export const calculateTotal = () => {
  const selectedItems = getSelectedItems();
  return selectedItems.reduce((total, item) => {
    // Parse price string (remove "Rp" and commas)
    const priceStr = item.price?.toString() || '0';
    const price = parseFloat(priceStr.replace(/[^0-9.]/g, ''));
    return total + (price * item.quantity);
  }, 0);
};

/**
 * Clear entire cart
 */
export const clearCart = () => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(CART_KEY);
};
