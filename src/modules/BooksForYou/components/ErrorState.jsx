export default function ErrorState({ error }) {
  return (
    <section className="py-16 px-4 bg-[#FAFAFA] font-sans">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-[32px] font-semibold text-[#252B42] mb-6 text-start">
          Books For You
        </h2>
        <hr className="bg-[#ECECEC] h-0.5 mb-6" />
        <div className="text-center py-12">
          <p className="text-red-500">Error: {error}</p>
        </div>
      </div>
    </section>
  );
}
