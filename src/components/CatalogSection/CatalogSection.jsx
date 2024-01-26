import CatalogCard from "./CatalogCard/CatalogCard";

export default function CatalogSection() {
  return (
    <>
      <section className="container mx-auto">
        <h1 className="text-center">Каталог</h1>
        <div className="grid grid-cols-4 gap-4 bg-orange-200">
          <CatalogCard></CatalogCard>
          <CatalogCard></CatalogCard>
          <CatalogCard></CatalogCard>
          <CatalogCard></CatalogCard>
          <CatalogCard></CatalogCard>
          <CatalogCard></CatalogCard>
          <CatalogCard></CatalogCard>
          <CatalogCard></CatalogCard>
        </div>
      </section>
    </>
  );
}
