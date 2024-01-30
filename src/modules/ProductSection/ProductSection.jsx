import ProductCard from "@/components/UI/ProductCard/ProductCard";

export default function ProductSection() {
  return (
    <>
      <div className="w-full h-full grid grid-cols-3
      bg-white rounded-xl shadow-xl shadow-blue-gray-900/5">
        <div className="col">1</div>
        <div className="col">2</div>
        <div className="col">3</div>
      </div>
    </>
  );
}
