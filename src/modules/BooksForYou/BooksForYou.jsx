'use client';

import React, { useState, useEffect } from 'react';
import Pagination from '@/components/Pagination';
import Dummy from '../../../public/placeholder.svg';
import { fetchBooksFromMultiplePages } from '@/services/bookService';
import LoadingState from './components/LoadingState';
import ErrorState from './components/ErrorState';
import SectionHeader from './components/SectionHeader';
import NoResults from './components/NoResults';
import BookGrid from './components/BookGrid';

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

    if (loading) return <LoadingState />;
    if (error) return <ErrorState error={error} />;

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
                <SectionHeader 
                    searchQuery={searchQuery} 
                    resultsCount={filteredBooks.length} 
                />

                {currentBooks.length === 0 ? (
                    <NoResults searchQuery={searchQuery} />
                ) : (
                    <>
                        <BookGrid books={currentBooks} onBookClick={onBookClick} />
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    </>
                )}
            </div>
        </section>
    );
};

export default BooksForYou;
