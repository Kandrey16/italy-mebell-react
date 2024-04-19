import { Rating } from "@material-tailwind/react";
import React from "react";

const ProductDetails = ({ name, article, price, rating }) => {
  const formattedPrice = new Intl.NumberFormat("ru-RU").format(price);

  console.log(rating);

  let rate = Math.ceil(rating)

  return (
    <>
      <h2 className="text-2xl font-semibold text-black uppercase">{name}</h2>
      <p className="text-base font-semibold text-colorGray uppercase">
        {article}
      </p>
      <div className="flex items-center space-x-2">
        {rating && (
          <Rating
            defaultValue={0}
            value={Number(rate)}
            readonly
          />
        )}
        <span>{rating}</span>
      </div>
      <hr />
      <p className="text-3xl font-semibold text-black py-3">
        {formattedPrice}₽
      </p>
      <hr />
    </>
  );
};

export default ProductDetails;
