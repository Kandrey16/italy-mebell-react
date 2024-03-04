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
