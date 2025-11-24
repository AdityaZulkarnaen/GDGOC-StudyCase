import CartItem from './CartItem';
import SelectAllCheckbox from './SelectAllCheckbox';

export default function CartItemList({ 
  cartItems, 
  selectAllChecked, 
  onSelectAll,
  onToggleSelection,
  onQuantityChange,
  onRemove,
  formatPrice
}) {
  return (
    <div className="lg:col-span-2 space-y-4">
      {/* Select All */}
      <SelectAllCheckbox 
        checked={selectAllChecked}
        itemCount={cartItems.length}
        onSelectAll={onSelectAll}
      />

      {/* Cart Items List */}
      {cartItems.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          onToggleSelection={onToggleSelection}
          onQuantityChange={onQuantityChange}
          onRemove={onRemove}
          formatPrice={formatPrice}
        />
      ))}
    </div>
  );
}
