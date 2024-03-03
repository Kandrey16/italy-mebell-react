import Sidebar from "@/modules/ClientModules/Sidebar/SidebarFilter";
import ProductSection from "@/modules/ClientModules/ProductSection/ProductSection";
import { useContext, useEffect } from "react";
import { Context } from "@/main";
import { observer } from "mobx-react";
import { fetchCategories, fetchProducts } from "@/API/ProductAPI";
import CategoryBar from "@/modules/ClientModules/CategoryBar/CategoryBar";

const CatalogPage = observer(() => {
  const { product } = useContext(Context);

  useEffect(() => {
    fetchCategories().then((data) => product.setCategories(data));
    fetchProducts().then((data) => product.setProducts(data));
  }, []);

  return (
    <>
      <div className="container">
        <div className="grid grid-cols-4">
          <div className="col">
            <CategoryBar />
          </div>
          <div className="col-span-3">
            <ProductSection />
          </div>
        </div>
      </div>
    </>
  );
});

export default CatalogPage;
