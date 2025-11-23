import { CaretRightIcon } from "@phosphor-icons/react";

export default function Breadcrumb() {
  return (
    <div className="flex items-center gap-2 text-sm mb-6">
      <a href="#" className="text-[#252B42] font-bold">Home</a>
      <CaretRightIcon className="w-4 h-4 text-[#BDBDBD]" weight='bold' />
      <span className="text-[#BDBDBD] font-bold">Shop</span>
    </div>
  );
}
