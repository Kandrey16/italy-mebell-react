import ProductSection from "@/modules/ClientModules/ProductSection/ProductSection";
import { useState, useContext, useEffect } from "react";
import { Context } from "@/main";
import { observer } from "mobx-react";
import { fetchCategories, fetchProducts } from "@/API/ProductAPI";
import CategoryBar from "@/modules/ClientModules/CategoryBar/CategoryBar";
import Pagination from "@/components/UI/Pagination/Pagination";
import { toJS } from "mobx";
import FilterBar from "@/modules/FilterBar/FilterBar";

const CatalogPage = observer(() => {
  const { product } = useContext(Context);
  const [showPagination, setShowPagination] = useState(true);

  const filters = {
    id_category: null,
    id_collection: null,
    price_min: null,
    price_max: null,
    rating_min: null,
    name_attribute_group: null,
    name_attribute: null,
    value_specification: null,
    limit: 6,
    page: 1,
  };

  useEffect(() => {
    fetchCategories().then((data) => product.setCategories(data));
    fetchProducts().then((data) => {
      product.setProducts(data.rows);
      product.setTotalCount(data.count);
      setShowPagination(data.count > product.limit);
    });
  }, []);

  useEffect(() => {
    if (!product.selectedCategory) {
      fetchProducts().then((data) => {
        product.setProducts(data.rows);
        product.setTotalCount(data.count);
        setShowPagination(data.count > product.limit);
      });
    } else {
      fetchProducts(
        product.selectedCategory.id_category,
        product.page,
        product.limit
      ).then((data) => {
        product.setProducts(data.rows);
        product.setTotalCount(data.count);
        setShowPagination(data.count > product.limit);
      });
    }
  }, [product.page, product.selectedCategory]);

  return (
    <>
      <div className="container grid grid-cols-5 gap-4">
        <div className="col">
          <FilterBar />
        </div>
        <div className="col-span-4">
          <CategoryBar />

          <ProductSection />
          {showPagination && <Pagination />}
        </div>
      </div>
    </>
  );
});

export default CatalogPage;
