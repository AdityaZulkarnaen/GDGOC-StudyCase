export default function SectionHeader({ searchQuery, resultsCount }) {
  return (
    <>
      <h2 className="text-[32px] font-semibold text-[#252B42] mb-6 text-start">
        Books For You {searchQuery && `(${resultsCount} results)`}
      </h2>
      <hr className="bg-[#ECECEC] h-0.5 mb-6" />
    </>
  );
}
