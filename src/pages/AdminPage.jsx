import Sidebar from "@/modules/ClientModules/Sidebar/SidebarFilter";
import ProductList from "@/modules/AdminModules/Table/ProductTable";
import SidebarNavigation from "@/modules/AdminModules/Sidebar/SidebarNavigation";
import { useState } from "react";
import { Button } from "@material-tailwind/react";
import ProductAddForm from "@/modules/AdminModules/Modals/AddProduct";
import CategoryAddForm from "@/modules/AdminModules/Modals/AddCategory";

export default function AdminPage() {
  const [productVisible, setProductVisible] = useState(false);
  const [categoryVisible, setCategoryVisible] = useState(false);

  return (
    <>
      <div className="flex max-w-full">
        <div className="w-1/5">
          <SidebarNavigation />
        </div>
        <div className="w-4/5">
          {/* <ProductList /> */}
          <Button onClick={() => setProductVisible(true)}>
            Добавить товар
          </Button>
          <Button onClick={() => setCategoryVisible(true)}>
            Добавить категорию
          </Button>

          <ProductAddForm
            show={productVisible}
            onHide={() => setProductVisible(false)}
          />
          <CategoryAddForm
            show={categoryVisible}
            onHide={() => setCategoryVisible(false)}
          />
        </div>
      </div>
    </>
  );
}
