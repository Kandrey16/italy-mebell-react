import { useContext, useEffect, useState } from "react";
import ProductCard from "@/components/UI/ProductCard/ProductCard";
import { Context } from "@/main";
import { observer } from "mobx-react";
import { toJS } from "mobx";
import { Option, Select } from "@material-tailwind/react";

const ProductSection = observer(() => {
  const { product } = useContext(Context);
  const [sortCriteria, setSortCriteria] = useState("name");

  const sortProducts = (products, criteria) => {
    switch (criteria) {
      case "name":
        return [...products].sort((a, b) =>
          a.name_product.localeCompare(b.name)
        );
      case "price":
        return [...products].sort((a, b) => a.price_product - b.price);
      case "dateAdded":
        return [...products].sort(
          (a, b) => new Date(b.dateAdded) - new Date(a.dateAdded)
        );
      default:
        return products; // Если критерий не указан, возвращаем товары без изменений
    }
  };

  // const hasFilteredProducts = product.filteredProducts.count > 0;
  // const productsToShow = hasFilteredProducts
  //   ? product.filteredProducts.rows // С учетом исправленного пути к товарам
  //   : product.products;

  // const productsToShow =
  //   product.searchedProduct.length > 0
  //     ? product.searchedProduct
  //     : product.products;

  // const hasFilteredProducts = product.filteredProducts.count > 0;
  // const hasSearchedProducts = product.searchedProduct.length > 0;

  // let productsToShow = [];

  // if (hasFilteredProducts) {
  //   productsToShow = toJS(product.filteredProducts.rows);
  // } else if (hasSearchedProducts) {
  //   productsToShow = product.searchedProduct;
  // } else {
  //   productsToShow = product.products;
  // }
  const productsToShow = (() => {
    let products = [];
    if (product.filteredProducts.count > 0) {
      products = toJS(product.filteredProducts.rows);
    } else if (product.searchedProduct.length > 0) {
      products = product.searchedProduct;
    } else {
      products = product.products;
    }
    return sortProducts(products, sortCriteria);
  })();

  return (
    <div className="flex flex-col">
      <div className="justify-end max-w-40">
        <select
          value={sortCriteria}
          onChange={(e) => setSortCriteria(e.target.value)}
          className="mb-4 p-2 rounded border-2 border-gray-300"
        >
          <option value="name">По названию</option>
          <option value="price">По цене</option>
          <option value="dateAdded">По дате добавления</option>
        </select>
      </div>

      <div
        className="w-full h-fit grid gap-4 p-4
        grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
      >
        {productsToShow.length > 0 ? (
          productsToShow.map((prod) => (
            <div className="col" key={prod.id_product}>
              <ProductCard product={prod} />
            </div>
          ))
        ) : (
          <div className="col-span-4 text-3xl font-bold ">
            <p>Товары не найдены</p>
          </div>
        )}
      </div>
    </div>
  );
});

export default ProductSection;
