import ProductSection from "@/modules/ClientModules/ProductSection/ProductSection";
import { useState, useContext, useEffect } from "react";
import { Context } from "@/main";
import { observer } from "mobx-react";
import { fetchCategories, fetchProducts } from "@/API/ProductAPI";
import CategoryBar from "@/modules/ClientModules/CategoryBar/CategoryBar";
import Pagination from "@/components/UI/Pagination/Pagination";

const CatalogPage = observer(() => {
  const { product } = useContext(Context);
  const [showPagination, setShowPagination] = useState(true);

  useEffect(() => {
    fetchCategories().then((data) => product.setCategories(data));
    fetchProducts(null, product.page, product.limit).then((data) => {
      product.setProducts(data.rows);
      product.setTotalCount(data.count);
      setShowPagination(data.count > 0);
    });
  }, []);

  useEffect(() => {
    const selectedCategoryId = product.selectedCategory.id_category;
    fetchProducts(selectedCategoryId, product.page, product.limit).then(
      (data) => {
        product.setProducts(data.rows);
        product.setTotalCount(data.count);
        setShowPagination(data.count > 0);
      }
    );
  }, [product.page, product.selectedCategory]);

  return (
    <>
      <div className="container grid grid-cols-5 gap-4">
        <div className="col">
          <CategoryBar />
        </div>
        <div className="col-span-4">
          <ProductSection />
          {showPagination && <Pagination />}
        </div>
      </div>
    </>
  );
});

export default CatalogPage;
