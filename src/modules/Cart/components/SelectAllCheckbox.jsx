export default function SelectAllCheckbox({ checked, itemCount, onSelectAll }) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onSelectAll(e.target.checked)}
          className="w-5 h-5 text-[#007AFF] rounded focus:ring-2 focus:ring-[#007AFF]"
        />
        <span className="font-semibold text-[#252B42]">
          Select All ({itemCount} items)
        </span>
      </label>
    </div>
  );
}
