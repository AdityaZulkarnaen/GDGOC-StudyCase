import { TrashIcon, MinusIcon, PlusIcon } from '@phosphor-icons/react';

export default function CartItem({ item, onToggleSelection, onQuantityChange, onRemove, formatPrice }) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex gap-4">
        {/* Checkbox */}
        <div className="flex items-start pt-2">
          <input
            type="checkbox"
            checked={item.selected}
            onChange={() => onToggleSelection(item.id)}
            className="w-5 h-5 text-[#007AFF] rounded focus:ring-2 focus:ring-[#007AFF]"
          />
        </div>

        {/* Book Image */}
        <div className="w-24 h-32 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-contain"
          />
        </div>

        {/* Book Info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-[#252B42] text-lg mb-1 line-clamp-2">
            {item.title}
          </h3>
          <p className="text-sm text-gray-500 mb-3">{item.category}</p>
          <p className="text-xl font-bold text-[#007AFF] mb-4">
            {formatPrice(item.price)}
          </p>

          {/* Quantity Controls */}
          <div className="flex items-center gap-4">
            <div className="flex items-center border border-gray-400 rounded-lg">
              <button
                onClick={() => onQuantityChange(item.id, item.quantity - 1)}
                disabled={item.quantity <= 1}
                className="p-2 hover:bg-gray-100 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <MinusIcon className="w-4 h-4 text-gray-700" />
              </button>
              <span className="px-4 font-semibold text-gray-700">{item.quantity}</span>
              <button
                onClick={() => onQuantityChange(item.id, item.quantity + 1)}
                className="p-2 hover:bg-gray-100"
              >
                <PlusIcon className="w-4 h-4 text-gray-700 cursor-pointer" />
              </button>
            </div>

            <button
              onClick={() => onRemove(item.id)}
              className="text-red-500 hover:text-red-700 p-2"
              aria-label="Remove item"
            >
              <TrashIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
