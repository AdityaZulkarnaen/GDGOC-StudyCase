import React from 'react';

const Card = ({ title, category, image, price }) => {
  return (
    <div className='relative flex flex-col font-sans items-center p-6 bg-gray-100 rounded-lg hover:shadow-lg transition-shadow'>
      {/* Book Image */}
      <div className="w-full h-48 mb-4 flex items-center justify-center bg-white rounded-md overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="max-h-full max-w-full object-contain"
        />
      </div>
      
      {/* Book Title */}
      <h3 className="text-lg font-semibold text-gray-800 mb-1 text-center">
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
  );
};

export default Card;
