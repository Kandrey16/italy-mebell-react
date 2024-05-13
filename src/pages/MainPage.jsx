import { ProductCarousel } from "@/components/UI/Carousel/Carousel";
import { TimelineOrder } from "@/components/UI/OrderSteps/OrderStepper";
import CatalogSection from "@/modules/ClientModules/CatalogSection/CatalogSection";

export default function MainPage() {
  return (
    <>
      <ProductCarousel />
      <CatalogSection />
    </>
  );
}
