import CatalogCard from "../../../components/UI/CatalogCard/CatalogCard";
import { images } from "../../../data/dataCatalogCard";

export default function CatalogSection() {
  return (
    <>
      <section className="container my-6">
        <h1 className="text-center text-6xl font-normal uppercase">Каталог</h1>
        <div className="my-6 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <CatalogCard key={index} imageUrl={image.url} title={image.title} />
          ))}
        </div>
      </section>
    </>
  );
}
