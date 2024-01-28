import FilterBar from "@/components/UI/Sidebar/Sidebar";
import ProductSection from "@/components/UI/ProductSection/ProductSection"
export default function CatalogPage() {
  return (
    <>
      <h1>Каталог</h1>
        <FilterBar/>
        <ProductSection/>
    </>
  );
}
