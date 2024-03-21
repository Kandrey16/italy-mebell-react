import Sidebar from "@/modules/ClientModules/Sidebar/SidebarFilter";
import ProductList from "@/modules/AdminModules/Table/ProductTable";
import SidebarNavigation from "@/modules/AdminModules/Sidebar/SidebarNavigation";
import { useState, useEffect } from "react";
import { Button } from "@material-tailwind/react";
import ProductAddForm from "@/modules/AdminModules/Modals/AddProduct";
import CategoryAddForm from "@/modules/AdminModules/Modals/AddCategory";
import CategoryEditForm from "@/modules/AdminModules/Modals/EditCategory";
import ProductTable from "@/modules/AdminModules/Modals/Tables/ProductTable";
import CategoryTable from "@/modules/AdminModules/Modals/Tables/CategoryTable";
import { fetchProducts } from "@/API/ProductAPI";
import { useContext } from "react";
import { Context } from "@/main";
import { observer } from "mobx-react";

const AdminPage = observer(() => {
  // const { product } = useContext(Context);
  const [productVisible, setProductVisible] = useState(false);
  const [categoryVisible, setCategoryVisible] = useState(false);

  // useEffect(() => {
  //   fetchProducts()
  //     .then((data) => {
  //       product.setProducts(data.rows);
  //     })
  //     .catch((error) => {
  //       console.error("Ошибка при загрузке продуктов:", error);
  //     });
  // }, []);

  return (
    <>
      <div className="flex max-w-full">
        <div className="w-1/5">
          <SidebarNavigation />
        </div>
        <div className="w-4/5">
          <ProductTable />
          <Button onClick={() => setProductVisible(true)}>
            Добавить товар
          </Button>
          <ProductAddForm
            show={productVisible}
            onHide={() => setProductVisible(false)}
          />

          <CategoryTable />
          <Button onClick={() => setCategoryVisible(true)}>
            Добавить категорию
          </Button>
          <CategoryAddForm
            show={categoryVisible}
            onHide={() => setCategoryVisible(false)}
          />
        </div>
      </div>
    </>
  );
});

export default AdminPage;
