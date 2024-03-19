import React from "react";

const ProductDetails = ({ name, article, price }) => (
  <>
    <h2 className="text-2xl font-semibold text-black uppercase">{name}</h2>
    <p className="text-base font-semibold text-colorGray uppercase">
      {article}
    </p>
    <hr />
    <p className="text-3xl font-semibold text-black py-3">{price}₽</p>
    <hr />
    <p className="text-2xl font-semibold text-black py-3">Характеристики</p>
  </>
);

export default ProductDetails;
