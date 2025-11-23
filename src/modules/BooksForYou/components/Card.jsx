import React from 'react';

const Card = ({ title, category, price, image, onClick }) => {
    return (
        <div 
            onClick={onClick}
            className='relative flex flex-col font-sans overflow-hidden rounded-lg hover:shadow-lg transition-shadow shadow-sm cursor-pointer'
        >
            {/* Book Image Section */}
            <div className="w-full h-[300px] bg-[#B0B0B0] flex items-center justify-center p-8">
                <img
                    src={image || '/placeholder.svg'}
                    alt={title}
                    className="max-h-full max-w-full object-contain"
                />
            </div>

            {/* Book Info Section */}
            <div className="bg-white p-6 flex-1 flex-col items-start">
                {/* Book Title */}
                <h3 className="text-lg font-semibold text-gray-800 mb-1 text-start">
                    {title}
                </h3>

                {/* Category */}
                <p className="text-sm text-gray-500 mb-3">
                    {category}
                </p>

                {/* Pricing */}
                <div className="flex items-center gap-2">
                    <span className="text-gray-400 text-sm">
                        {price}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Card;
