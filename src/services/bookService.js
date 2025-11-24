const API_BASE_URL = 'https://bukuacak-9bdcb4ef2605.herokuapp.com/api/v1';

/**
 * Fetch books from a single page
 * @param {number} page - Page number to fetch
 * @returns {Promise<Array>} Array of books
 */
export const fetchBooksFromPage = async (page) => {
  try {
    const response = await fetch(`${API_BASE_URL}/book?page=${page}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch books from page ${page}`);
    }
    
    const data = await response.json();
    return data.books || [];
  } catch (error) {
    console.error(`Error fetching books from page ${page}:`, error);
    throw error;
  }
};

/**
 * Fetch books from multiple pages
 * @param {number} totalPages - Total number of pages to fetch
 * @returns {Promise<Array>} Array of all books from all pages
 */
export const fetchBooksFromMultiplePages = async (totalPages) => {
  try {
    const fetchPromises = [];
    
    for (let page = 1; page <= totalPages; page++) {
      fetchPromises.push(
        fetch(`${API_BASE_URL}/book?page=${page}`)
          .then(res => res.json())
      );
    }
    
    const results = await Promise.all(fetchPromises);
    const allBooks = results.flatMap(data => data.books || []);
    
    // Remove duplicates based on _id
    const uniqueBooks = allBooks.filter((book, index, self) => 
      index === self.findIndex((b) => b._id === book._id)
    );
    
    return uniqueBooks;
  } catch (error) {
    console.error('Error fetching books from multiple pages:', error);
    throw error;
  }
};

/**
 * Fetch all books (from 20 pages by default)
 * @returns {Promise<Array>} Array of all books
 */
export const fetchAllBooks = async () => {
  return fetchBooksFromMultiplePages(10);
};

/**
 * Get book by ID
 * @param {Array} books - Array of books to search
 * @param {string} bookId - ID of the book to find
 * @returns {Object|null} Book object or null if not found
 */
export const getBookById = (books, bookId) => {
  return books.find(book => book._id === bookId) || null;
};
