import CatalogCard from "./CatalogCard/CatalogCard";

export default function CatalogSection() {
  return (
    <>
      <section className="container mx-auto my-6">
        <h1 className="text-center text-6xl font-normal uppercase">Каталог</h1>
        <div className="grid grid-cols-4 gap-12 my-6">
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
