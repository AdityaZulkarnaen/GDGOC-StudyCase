'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  getCart, 
  removeFromCart, 
  updateQuantity, 
  toggleSelection, 
  selectAll,
  calculateTotal,
  getSelectedItems 
} from '@/utils/cart';
import { TrashIcon, MinusIcon, PlusIcon } from '@phosphor-icons/react';

export default function Cart() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);
  const [selectAllChecked, setSelectAllChecked] = useState(true);
  const [total, setTotal] = useState(0);

  // Load cart on mount
  useEffect(() => {
    loadCart();

    const handleCartUpdate = () => {
      loadCart();
    };

    window.addEventListener('cartUpdated', handleCartUpdate);
    window.addEventListener('storage', handleCartUpdate);

    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
      window.removeEventListener('storage', handleCartUpdate);
    };
  }, []);

  // Recalculate total when cart changes
  useEffect(() => {
    setTotal(calculateTotal());
    
    // Check if all items are selected
    const allSelected = cartItems.length > 0 && cartItems.every(item => item.selected);
    setSelectAllChecked(allSelected);
  }, [cartItems]);

  const loadCart = () => {
    const cart = getCart();
    setCartItems(cart);
  };

  const handleRemove = (bookId) => {
    removeFromCart(bookId);
    loadCart();
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const handleQuantityChange = (bookId, newQuantity) => {
    if (newQuantity >= 1) {
      updateQuantity(bookId, newQuantity);
      loadCart();
    }
  };

  const handleToggleSelection = (bookId) => {
    toggleSelection(bookId);
    loadCart();
  };

  const handleSelectAll = (checked) => {
    selectAll(checked);
    setSelectAllChecked(checked);
    loadCart();
  };

  const formatPrice = (price) => {
    const priceStr = price?.toString() || '0';
    const numPrice = parseFloat(priceStr.replace(/[^0-9.]/g, ''));
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(numPrice);
  };

  const selectedCount = getSelectedItems().length;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-[#252B42] mb-8">Shopping Cart</h1>
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <p className="text-gray-500 text-lg mb-4">Your cart is empty</p>
            <button 
              onClick={() => router.push('/')}
              className="bg-[#007AFF] text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-[#252B42] mb-8">Shopping Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {/* Select All */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectAllChecked}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  className="w-5 h-5 text-[#007AFF] rounded focus:ring-2 focus:ring-[#007AFF]"
                />
                <span className="font-semibold text-[#252B42]">
                  Select All ({cartItems.length} items)
                </span>
              </label>
            </div>

            {/* Cart Items List */}
            {cartItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-sm p-4">
                <div className="flex gap-4">
                  {/* Checkbox */}
                  <div className="flex items-start pt-2">
                    <input
                      type="checkbox"
                      checked={item.selected}
                      onChange={() => handleToggleSelection(item.id)}
                      className="w-5 h-5 text-[#007AFF] rounded focus:ring-2 focus:ring-[#007AFF]"
                    />
                  </div>

                  {/* Book Image */}
                  <div className="w-24 h-32 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={item.image}
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
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="p-2 hover:bg-gray-100 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <MinusIcon className="w-4 h-4 text-gray-700" />
                        </button>
                        <span className="px-4 font-semibold text-gray-700">{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          className="p-2 hover:bg-gray-100"
                        >
                          <PlusIcon className="w-4 h-4 text-gray-700 cursor-pointer" />
                        </button>
                      </div>

                      <button
                        onClick={() => handleRemove(item.id)}
                        className="text-red-500 hover:text-red-700 p-2"
                        aria-label="Remove item"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h2 className="text-xl font-bold text-[#252B42] mb-6">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Selected Items</span>
                  <span>{selectedCount} items</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <div className="border-t pt-3 mt-3">
                  <div className="flex justify-between text-lg font-bold text-[#252B42]">
                    <span>Total</span>
                    <span className="text-[#007AFF]">{formatPrice(total)}</span>
                  </div>
                </div>
              </div>

              <button
                disabled={selectedCount === 0}
                className="w-full bg-[#007AFF] text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Checkout ({selectedCount})
              </button>

              <button
                onClick={() => router.push('/')}
                className="w-full mt-3 border border-[#007AFF] text-[#007AFF] py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
