import React from "react";

const ProductImage = ({ imageUrl }) => (
  <div className="col flex justify-center items-center">
    <img
      src={imageUrl}
      className="w-4/5 object-cover object-center rounded-xl"
      alt="Product"
    />
  </div>
);

export default ProductImage;
