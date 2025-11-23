import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react";

export default function ImageGallery({ book, currentBookIndex, totalBooks, onPrevious, onNext }) {
  return (
    <div className="flex flex-col h-full">
      <div className="relative bg-[#B0B0B0] flex items-center overflow-hidden h-full">
        {/* Main Image */}
        <div className="w-full min-h-[400px] flex items-center justify-center p-8">
          <img
            src={book.cover_image || '/placeholder.svg'}
            className="max-h-[350px] w-auto object-contain rounded-lg shadow-2xl"
          />
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={onPrevious}
          disabled={currentBookIndex === 0}
          className={`absolute left-4 top-1/2 -translate-y-1/2 bg-transparent rounded-full ${currentBookIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          aria-label="Previous book"
        >
          <CaretLeftIcon className="text-6xl text-white" />
        </button>
        <button
          onClick={onNext}
          disabled={currentBookIndex === totalBooks - 1}
          className={`absolute right-4 top-1/2 -translate-y-1/2 bg-transparent rounded-full ${currentBookIndex === totalBooks - 1 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          aria-label="Next book"
        >
          <CaretRightIcon className="text-6xl text-white" />
        </button>
      </div>
    </div>
  );
}
