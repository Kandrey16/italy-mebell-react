import Sidebar from "@/modules/ClientModules/Sidebar/SidebarFilter";
import ProductSection from "@/modules/ClientModules/ProductSection/ProductSection";
export default function CatalogPage() {
  return (
    <>
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
