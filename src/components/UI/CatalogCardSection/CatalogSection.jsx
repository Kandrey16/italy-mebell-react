import CatalogCard from "./CatalogCard/CatalogCard";
import { images } from "../../Data/dataCatalogCard";

export default function CatalogSection() {
  return (
    <>
      <section className="container mx-auto my-6">
        <h1 className="text-center text-6xl font-normal uppercase">Каталог</h1>
        <div className="my-6 grid grid-cols-4 gap-4">
          {images.map((image, index) => (
            <CatalogCard key={index} imageUrl={image.url} title={image.title} />
          ))}
        </div>
      </section>
    </>
  );
}
