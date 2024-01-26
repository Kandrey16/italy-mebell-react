import CatalogCard from "./CatalogCard/CatalogCard";

export default function CatalogSection() {
  return (
    <>
      <section className="container mx-auto">
        <h1 className="text-center">Каталог</h1>
        <div className="grid grid-cols-4 gap-12 my-4">
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
