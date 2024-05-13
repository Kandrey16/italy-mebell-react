//productSection.jsx
import { useContext, useEffect, useState } from "react";
import ProductCard from "@/components/UI/ProductCard/ProductCard";
import { Context } from "@/main";
import { observer } from "mobx-react";
import { toJS } from "mobx";
import { Card, Typography } from "@material-tailwind/react";

const ProductSection = observer(() => {
  const { product } = useContext(Context);
  const [sortCriteria, setSortCriteria] = useState("name");
  const [searchQuery, setSearchQuery] = useState("");

  const sortProducts = (products, criteria) => {
    switch (criteria) {
      case "name":
        const sortedByName = [...products].sort((a, b) =>
          a.name_product.localeCompare(b.name_product)
        );
        return sortedByName;
      case "price":
        const sortedByPrice = [...products].sort(
          (a, b) => parseFloat(a.price_product) - parseFloat(b.price_product)
        );
        return sortedByPrice;
      case "dateAdded":
        const sortedByDateAdded = [...products].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        return sortedByDateAdded;
      default:
        return products;
    }
  };

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

  console.log(toJS(productsToShow));

  useEffect(() => {
    if (product.searchedProduct.length > 0)
      setSearchQuery(product.searchedProduct[0].name_product);
  }, [product.searchedProduct]);

  return (
    <div className="flex flex-col">
      <div className="flex justify-end mt-4">
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

      {product.searchQuery && ( // Если есть текст поискового запроса, отобразите его
        <Typography variant="h5" className="mb-4">
          Результаты по запросу «{product.searchQuery}»
        </Typography>
      )}
      {productsToShow.length > 0 ? (
        <div
          className="w-full h-fit grid gap-4 p-4
        grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
        >
          {productsToShow.map((prod) => (
            <div className="col" key={prod.id_product}>
              <ProductCard product={prod} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-lg">Товары не найдены</div>
      )}
    </div>
  );
});

export default ProductSection;
