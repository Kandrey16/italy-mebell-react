import { Carousel } from "@material-tailwind/react";
import styles from "./Carousel.module.scss";
import { image } from "./data-carousel";

export function CarouselDefault() {
  return (
    <Carousel
      className="container mx-auto w-full rounded-xl my-2"
      transition={{ type: "tween", duration: 0.75 }}
      autoplay
      loop
      navigation={({ setActiveIndex, activeIndex, length }) => (
        <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
          {new Array(length).fill("").map((_, i) => (
            <span
              key={i}
              className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
              }`}
              onClick={() => setActiveIndex(i)}
            />
          ))}
        </div>
      )}
    >
      {image.map((item) => (
        <img key={item.url} src={item.url} alt={item.alt} />
      ))}
    </Carousel>
  );
}
