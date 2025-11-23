import { ShoppingCartSimpleIcon, EyeIcon, HeartStraightIcon } from "@phosphor-icons/react";

export default function ProductInfo({ book }) {
  return (
    <div className="flex flex-col">
      {/* Tags */}
      <div className="flex gap-3 mb-8 text-[16px] flex-wrap">
        {book.tags && book.tags.slice(0, 2).map((tag, index) => (
          <span key={index} className="px-4 py-2 bg-[#E0E0E0] text-black font-medium rounded-full text-sm">
            {tag.name}
          </span>
        ))}
      </div>
      
      <h1 className="text-[32px] font-semibold text-[#252B42] mb-2">{book.title}</h1>

      {/* Price */}
      <div className="text-2xl font-semibold text-[#252B42] mb-2">
        {book.details?.price || 'Price not available'}
      </div>

      {/* Availability */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-[#737373] font-semibold">Availability :</span>
        <span className="text-[#23A6F0] font-semibold">In Stock</span>
      </div>

      {/* Description */}
      <p className="text-gray-600 leading-relaxed mb-8 line-clamp-3">
        {book.summary || 'No description available'}
      </p>

      {/* Product Details */}
      <div className="space-y-3 mb-8">
        <div className="flex gap-2 mb-1">
          <span className="text-gray-600 font-medium">Pages:</span>
          <span className="text-gray-800">{book.details?.total_pages || 'N/A'}</span>
        </div>
        <div className="flex gap-2 mb-1">
          <span className="text-gray-600 font-medium">Publisher:</span>
          <span className="text-gray-800">{book.publisher || 'N/A'}</span>
        </div>
        <div className="flex gap-2 mb-1">
          <span className="text-gray-600 font-medium">ISBN:</span>
          <span className="text-gray-800">{book.details?.isbn || 'N/A'}</span>
        </div>
        <div className="flex gap-2 mb-1">
          <span className="text-gray-600 font-medium">Published:</span>
          <span className="text-gray-800">{book.details?.published_date || 'N/A'}</span>
        </div>
        <div className="flex gap-2 mb-1">
          <span className="text-gray-600 font-medium">Author:</span>
          <span className="text-gray-800">{book.author?.name || 'N/A'}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button className="bg-[#007AFF] text-white text-[16px] px-3.5 py-2 rounded-xl font-medium hover:bg-blue-600 transition-colors cursor-pointer">
          Buy Now
        </button>
        <button className="border bg-[#DBECFF] p-3 rounded-full transition-colors cursor-pointer">
          <HeartStraightIcon className="text-xl text-black" />
        </button>
        <button className="border bg-[#DBECFF] p-3 rounded-full transition-colors cursor-pointer">
          <ShoppingCartSimpleIcon className="text-xl text-black" />
        </button>
        <button className="border bg-[#DBECFF] p-3 rounded-full transition-colors cursor-pointer">
          <EyeIcon className="text-xl text-black" weight='fill' />
        </button>
      </div>
    </div>
  );
}
