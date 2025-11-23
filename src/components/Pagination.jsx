import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const getPageNumbers = () => {
    const pages = [];
    const showPages = 5; // Number of page buttons to show
    
    let startPage = Math.max(1, currentPage - Math.floor(showPages / 2));
    let endPage = Math.min(totalPages, startPage + showPages - 1);
    
    if (endPage - startPage < showPages - 1) {
      startPage = Math.max(1, endPage - showPages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`p-2 rounded-lg border border-gray-400 text-gray-400 transition-colors ${
          currentPage === 1
            ? 'opacity-50 cursor-not-allowed bg-gray-100'
            : 'hover:bg-gray-100 cursor-pointer'
        }`}
        aria-label="Previous page"
      >
        <CaretLeftIcon className="text-xl" />
      </button>

      {/* First Page */}
      {getPageNumbers()[0] > 1 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className="px-4 py-2 rounded-lg border border-gray-400 text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            1
          </button>
          {getPageNumbers()[0] > 2 && <span className="px-2 text-gray-400">...</span>}
        </>
      )}

      {/* Page Numbers */}
      {getPageNumbers().map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-4 py-2 rounded-lg border transition-colors cursor-pointer ${
            currentPage === page
              ? 'bg-[#007AFF] text-white border-[#007AFF]'
              : 'hover:bg-gray-100 border-gray-400 text-gray-700'
          }`}
        >
          {page}
        </button>
      ))}

      {/* Last Page */}
      {getPageNumbers()[getPageNumbers().length - 1] < totalPages && (
        <>
          {getPageNumbers()[getPageNumbers().length - 1] < totalPages - 1 && (
            <span className="px-2 text-gray-400">...</span>
          )}
          <button
            onClick={() => onPageChange(totalPages)}
            className="px-4 py-2 rounded-lg border border-gray-400 text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            {totalPages}
          </button>
        </>
      )}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`p-2 rounded-lg border border-gray-400 transition-colors ${
          currentPage === totalPages
            ? 'opacity-50 cursor-not-allowed bg-gray-100'
            : 'hover:bg-gray-100 cursor-pointer'
        }`}
        aria-label="Next page"
      >
        <CaretRightIcon className="text-xl text-gray-400" />
      </button>
    </div>
  );
}
