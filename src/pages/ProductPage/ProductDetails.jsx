import React, { useState } from "react";
import { FaCopy } from "react-icons/fa";
import { Rating } from "@material-tailwind/react";
import copy from "copy-to-clipboard";

const ProductDetails = ({ name, article, price, rating }) => {
  const [showCopyIcon, setShowCopyIcon] = useState(false);
  const formattedPrice = new Intl.NumberFormat("ru-RU").format(price);

  let rate = Math.ceil(rating);

  function handleCopy() {
    copy(article);
    setShowCopyIcon(true);
    alert("Артикул скопирован");
  }

  return (
    <>
      <h2 className="text-2xl font-semibold text-black uppercase">{name}</h2>
      <div
        className="flex space-x-2 items-center"
        onMouseEnter={() => setShowCopyIcon(true)}
        onMouseLeave={() => setShowCopyIcon(false)}
        onClick={handleCopy}
      >
        <p className="text-base font-semibold text-colorGray uppercase cursor-pointer">
          {article}
        </p>
        {showCopyIcon && <FaCopy className="cursor-pointer" />}
      </div>

      <div className="flex items-center space-x-2">
        {rating && <Rating defaultValue={0} value={Number(rate)} readonly />}
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
