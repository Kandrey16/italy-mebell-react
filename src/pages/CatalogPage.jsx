import ProductSection from "@/modules/ClientModules/ProductSection/ProductSection";
import { useState, useContext, useEffect } from "react";
import { Context } from "@/main";
import { observer } from "mobx-react";
import { fetchCategories, fetchProducts } from "@/API/ProductAPI";
import CategoryBar from "@/modules/ClientModules/CategoryBar/CategoryBar";
import Pagination from "@/components/UI/Pagination/Pagination";
import { toJS } from "mobx";
import FilterBar from "@/modules/ClientModules/FilterBar/FilterBar";

const CatalogPage = observer(() => {
  const { product } = useContext(Context);
  const [uniqueSpecifications, setUniqueSpecifications] = useState({});
  const [showPagination, setShowPagination] = useState(true);

  useEffect(() => {
    fetchCategories().then((data) => product.setCategories(data));
    fetchProducts().then((data) => {
      product.setProducts(data.rows);
      product.setTotalCount(data.count);
      setShowPagination(data.count > product.limit);
      updateUniqueSpecifications(data.rows);
    });
  }, []);

  const updateUniqueSpecifications = (products) => {
    const specs = {};

    for (const product of products) {
      const attributes = product.attributes || [];
      const specifications = product.specifications || [];

      if (attributes.length !== specifications.length) {
        continue; // Пропускаем продукт, если количество атрибутов и характеристик не совпадает
      }

      attributes.forEach((attribute, index) => {
        if (attribute === null) {
          return;
        }

        const value = specifications[index];

        if (!specs[attribute]) {
          specs[attribute] = new Set();
        }

        if (value) {
          specs[attribute].add(value);
        }
      });
    }

    if (specs.hasOwnProperty("null")) {
      delete specs["null"];
    }
    setUniqueSpecifications(specs);
  };

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
      <div className="container flex gap-5">
        <div className="flex-none">
          <FilterBar uniqueSpecifications={uniqueSpecifications} />
        </div>
        <div className="flex-grow">
          {/* <CategoryBar /> */}
          <ProductSection />
          {/* {showPagination && <Pagination />} */}
        </div>
      </div>
    </>
  );
});

export default CatalogPage;
