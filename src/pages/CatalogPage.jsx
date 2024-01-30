import Sidebar from "@/modules/Sidebar/Sidebar";
import ProductSection from "@/modules/ProductSection/ProductSection";
export default function CatalogPage() {
  return (
    <>
      <h1>Каталог</h1>
      <div className="container">
        <div className="grid grid-cols-4">
          <div className="col">
            <Sidebar />
          </div>
          <div className="col-span-3">
            <ProductSection />
          </div>
        </div>
      </div>
    </>
  );
}
