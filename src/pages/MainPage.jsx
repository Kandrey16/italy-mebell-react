import { CarouselDefault } from "@/components/TailwindComponents/Carousel/Carousel";
import CatalogSection from "@/modules/CatalogCardSection/CatalogSection";

export default function MainPage() {
  return (
    <>
      <h1>Главная</h1>
      <CarouselDefault />
      <CatalogSection />
    </>
  );
}
