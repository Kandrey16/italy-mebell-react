import React from "react";

const ProductImage = ({ imageUrl }) => (
  <div className="col flex justify-center items-center">
    <img
      src={imageUrl}
      className="w-3/4 object-cover object-center rounded-xl"
      alt="Product"
    />
  </div>
);

export default ProductImage;
