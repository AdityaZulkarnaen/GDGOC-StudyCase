'use client';

import { useState, useEffect } from 'react';
import { 
  getCart, 
  removeFromCart, 
  updateQuantity, 
  toggleSelection, 
  selectAll,
  calculateTotal,
  getSelectedItems 
} from '@/utils/cart';
import EmptyCart from './components/EmptyCart';
import CartItemList from './components/CartItemList';
import OrderSummary from './components/OrderSummary';

export default function Cart() {
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

  useEffect(() => {
    setTotal(calculateTotal());
    
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
    return <EmptyCart />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-[#252B42] mb-8">Shopping Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <CartItemList
            cartItems={cartItems}
            selectAllChecked={selectAllChecked}
            onSelectAll={handleSelectAll}
            onToggleSelection={handleToggleSelection}
            onQuantityChange={handleQuantityChange}
            onRemove={handleRemove}
            formatPrice={formatPrice}
          />

          <div className="lg:col-span-1">
            <OrderSummary
              selectedCount={selectedCount}
              total={total}
              formatPrice={formatPrice}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
