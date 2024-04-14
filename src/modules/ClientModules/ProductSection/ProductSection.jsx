import { useContext, useEffect, useState } from "react";
import ProductCard from "@/components/UI/ProductCard/ProductCard";
import { Context } from "@/main";
import { observer } from "mobx-react";

const ProductSection = observer(() => {
  const { product } = useContext(Context);

  const productsToShow =
    product.searchedProduct.length > 0
      ? product.searchedProduct
      : product.products;

  return (
    <>
      <div
        className="w-full h-full grid gap-4 p-4
        grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
      >
        {productsToShow.length > 0 ? (
          productsToShow.map((product) => (
            <div className="col" key={product.id_product}>
              <ProductCard product={product} />
            </div>
          ))
        ) : (
          <div className="col-span-4 text-3xl font-bold ">
            <p>Товары не найдены</p>
          </div>
        )}
      </div>
    </>
  );
});

export default ProductSection;
