import Sidebar from "@/modules/ClientModules/Sidebar/SidebarFilter";
import ProductSection from "@/modules/ClientModules/ProductSection/ProductSection";
import { useContext, useEffect } from "react";
import { Context } from "@/main";
import { observer } from "mobx-react";
import { fetchCategories, fetchProducts } from "@/API/ProductAPI";
import CategoryBar from "@/modules/ClientModules/CategoryBar/CategoryBar";

const CatalogPage = observer(() => {
  const { product } = useContext(Context);
  const pagination = 18;
  const page = 1;

  useEffect(() => {
    fetchCategories().then((data) => product.setCategories(data));
    fetchProducts(null, page, pagination)
      .then((data) => {
        product.setProducts(data.rows);
        product.setTotalCount(data.count);
      })
      .catch((error) => {
        console.error("Ошибка при загрузке продуктов:", error);
      });
  }, []);

  useEffect(() => {
    const selectedCategoryId = product.selectedCategory.id_category;
    fetchProducts(selectedCategoryId, page, pagination) // Загружаем продукты для выбранной категории
      .then((data) => {
        product.setProducts(data.rows);
        product.setTotalCount(data.count);
      })
      .catch((error) => {
        console.error("Ошибка при загрузке продуктов:", error);
      });
  }, [product.selectedCategory]);

  return (
    <>
      <div className="grid grid-cols-5">
        <div className="col">
          <CategoryBar />
        </div>
        <div className="col-span-4">
          <ProductSection />
        </div>
      </div>
    </>
  );
});

export default CatalogPage;
