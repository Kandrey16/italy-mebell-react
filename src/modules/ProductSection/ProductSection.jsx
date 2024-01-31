import ProductCard from "@/components/UI/ProductCard/ProductCard";

export default function ProductSection() {
  return (
    <>
      <div
        className="w-full h-full grid grid-cols-3 gap-4 p-4
      bg-white rounded-xl shadow-xl shadow-blue-gray-900/5"
      >
        <div className="col">
          <ProductCard />
        </div>
        <div className="col">
          <ProductCard />
        </div>
        <div className="col">
          <ProductCard />
        </div>
      </div>
    </>
  );
}
