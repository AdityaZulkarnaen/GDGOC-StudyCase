'use client';

import React, { useState, useEffect } from 'react';
import Card from '@/components/Card';
import Pagination from '@/components/Pagination';
import Dummy from '../../../public/placeholder.svg';

const BooksForYou = ({ onBookClick }) => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const TOTAL_PAGES = 10;
    const BOOKS_PER_PAGE = 8;

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                setLoading(true);
                
                // Fetch 10 pages of data
                const fetchPromises = [];
                for (let page = 1; page <= TOTAL_PAGES; page++) {
                    fetchPromises.push(
                        fetch(`https://bukuacak-9bdcb4ef2605.herokuapp.com/api/v1/book?page=${page}`)
                            .then(res => res.json())
                    );
                }

                const results = await Promise.all(fetchPromises);
                
                // Combine all books from all pages
                const allBooks = results.flatMap(data => data.books || []);

                // Remove duplicates based on _id
                const uniqueBooks = allBooks.filter((book, index, self) => 
                    index === self.findIndex((b) => b._id === book._id)
                );

                // Map semua buku
                const booksData = uniqueBooks.map((book) => ({
                    id: book._id,
                    title: book.title,
                    category: book.category?.name || 'General',
                    price: book.details?.price || 'Rp 160,000',
                    image: book.cover_image || Dummy,
                }));

                setBooks(booksData);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching books:', err);
                setError(err.message);
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);

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

    // Calculate pagination
    const totalPages = Math.ceil(books.length / BOOKS_PER_PAGE);
    const startIndex = (currentPage - 1) * BOOKS_PER_PAGE;
    const endIndex = startIndex + BOOKS_PER_PAGE;
    const currentBooks = books.slice(startIndex, endIndex);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <section className="py-16 px-4 bg-[#FAFAFA] font-sans">
            <div className="max-w-7xl mx-auto">
                {/* Section Title */}
                <h2 className="text-[32px] font-semibold text-[#252B42] mb-6 text-start">
                    Books For You
                </h2>
                {/* Seperator */}
                <hr className="bg-[#ECECEC] h-0.5 mb-6" />

                {/* Cards Grid */}
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

                {/* Pagination */}
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </div>
        </section>
    );
};

export default BooksForYou;
