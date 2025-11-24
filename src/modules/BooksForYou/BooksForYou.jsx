'use client';

import React, { useState, useEffect } from 'react';
import Card from '@/components/Card';
import Pagination from '@/components/Pagination';
import Dummy from '../../../public/placeholder.svg';
import { fetchBooksFromMultiplePages } from '@/services/bookService';

const BooksForYou = ({ onBookClick, searchQuery }) => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const TOTAL_PAGES = 10;
    const BOOKS_PER_PAGE = 8;

    useEffect(() => {
        const loadBooks = async () => {
            try {
                setLoading(true);
                
                const booksData = await fetchBooksFromMultiplePages(TOTAL_PAGES);

                // Map semua buku
                const mappedBooks = booksData.map((book) => ({
                    id: book._id,
                    title: book.title,
                    category: book.category?.name || 'General',
                    price: book.details?.price || 'Rp 160,000',
                    image: book.cover_image || Dummy,
                }));

                setBooks(mappedBooks);
                setLoading(false);
            } catch (err) {
                console.error('Error loading books:', err);
                setError(err.message);
                setLoading(false);
            }
        };

        loadBooks();
    }, []);

    // Reset to first page when search query changes
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery]);

    if (loading) {
        return (
            <section className="py-16 px-4 bg-[#FAFAFA] font-sans">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-[32px] font-semibold text-[#252B42] mb-6 text-start">
                        Books For You
                    </h2>

                    {/* Seperator */}
                    <hr className="bg-[#ECECEC] h-0.5 mb-6" />

                    <div className="text-center py-12">
                        <p className="text-gray-500">Loading books...</p>
                    </div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="py-16 px-4 bg-[#FAFAFA] font-sans">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-[32px] font-semibold text-[#252B42] mb-6 text-start">
                        Books For You
                    </h2>
                    {/* Seperator */}
                    <hr className="bg-[#ECECEC] h-0.5 mb-6" />
                    <div className="text-center py-12">
                        <p className="text-red-500">Error: {error}</p>
                    </div>
                </div>
            </section>
        );
    }

    // Filter books based on search query
    const filteredBooks = searchQuery 
        ? books.filter(book => 
            book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            book.category.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : books;

    // Calculate pagination
    const totalPages = Math.ceil(filteredBooks.length / BOOKS_PER_PAGE);
    const startIndex = (currentPage - 1) * BOOKS_PER_PAGE;
    const endIndex = startIndex + BOOKS_PER_PAGE;
    const currentBooks = filteredBooks.slice(startIndex, endIndex);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <section className="py-16 px-4 bg-[#FAFAFA] font-sans">
            <div className="max-w-7xl mx-auto">
                {/* Section Title */}
                <h2 className="text-[32px] font-semibold text-[#252B42] mb-6 text-start">
                    Books For You {searchQuery && `(${filteredBooks.length} results)`}
                </h2>
                {/* Seperator */}
                <hr className="bg-[#ECECEC] h-0.5 mb-6" />

                {/* No Results Message */}
                {currentBooks.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500">No books found matching "{searchQuery}"</p>
                    </div>
                )}

                {/* Cards Grid */}
                {currentBooks.length > 0 && (
                    <div className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 overflow-x-auto md:overflow-x-visible snap-x snap-mandatory md:snap-none scrollbar-hide pb-4">
                        {currentBooks.map((book) => (
                            <div key={book.id} className="shrink-0 w-[280px] md:w-auto snap-center h-full">
                                <Card
                                    title={book.title}
                                    category={book.category}
                                    price={book.price}
                                    image={book.image}
                                    onClick={() => onBookClick(book.id)}
                                />
                            </div>
                        ))}
                    </div>
                )}

                {/* Pagination */}
                {currentBooks.length > 0 && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                )}
            </div>
        </section>
    );
};

export default BooksForYou;
