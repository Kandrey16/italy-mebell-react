// import styles from "./ProductCard.module.scss";
import image from "images/chair.jpg";

export default function ProductCard() {
  return (
    <>
      <div className="w-full bg-green-100 rounded-xl">
        <div className="aspect-square relative">
          <img className="size-full" src={image} alt="" />
        </div>
        <div className="p-4">
          <h2 className="text-lg font-semibold">Стул Marokko</h2>
          <p className="text-xl font-semibold">5000</p>
          <div>{/* Здесь должны быть цветовые варианты */}</div>
        </div>
        <div>Подробнее</div>
      </div>
    </>
  );
}
