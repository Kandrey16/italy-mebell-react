import SidebarNavigation from "@/modules/AdminModules/Sidebar/SidebarNavigation";
import { useState, useEffect } from "react";
import { Button } from "@material-tailwind/react";
import ProductAddForm from "@/modules/AdminModules/Modals/AddTable/AddProduct";
import CategoryAddForm from "@/modules/AdminModules/Modals/AddTable/AddCategory";
import CategoryEditForm from "@/modules/AdminModules/Modals/EditTable/EditCategory";
import ProductTable from "@/modules/AdminModules/Modals/Tables/ProductTable";
import CategoryTable from "@/modules/AdminModules/Modals/Tables/CategoryTable";
import { observer } from "mobx-react";
import AttributeGroupTable from "@/modules/AdminModules/Modals/Tables/AttributeGroupTable";
import AttributeGroupAddForm from "@/modules/AdminModules/Modals/AddTable/AddAttributeGroup";
import AttributeTable from "@/modules/AdminModules/Modals/Tables/AttributeTable";
import AttributeAddForm from "@/modules/AdminModules/Modals/AddTable/AddAttribute";
import OrderTable from "@/modules/AdminModules/Modals/Tables/OrderTable";

const AdminPage = observer(() => {
  const [productVisible, setProductVisible] = useState(false);
  const [categoryVisible, setCategoryVisible] = useState(false);
  const [groupVisible, setGroupVisible] = useState(false);
  const [attributeVisible, setAttributeVisible] = useState(false);

  const [activeComponent, setActiveComponent] = useState("products");

  function handleMenuItemClick(menuItem) {
    setActiveComponent(menuItem);
  }

  return (
    <>
      <div className="flex max-w-full">
        <div className="w-1/5">
          <SidebarNavigation onMenuItemClick={handleMenuItemClick} />
        </div>
        <div className="w-4/5">
          {activeComponent === "products" && (
            <>
              <ProductTable />
              <Button onClick={() => setProductVisible(true)}>
                Добавить товар
              </Button>
              <ProductAddForm
                show={productVisible}
                onHide={() => setProductVisible(false)}
              />
            </>
          )}
          {activeComponent === "categories" && (
            <>
              <CategoryTable />
              <Button onClick={() => setCategoryVisible(true)}>
                Добавить категорию
              </Button>
              <CategoryAddForm
                show={categoryVisible}
                onHide={() => setCategoryVisible(false)}
              />
            </>
          )}
          {activeComponent === "groups" && (
            <>
              <AttributeGroupTable />
              <Button onClick={() => setGroupVisible(true)}>
                Добавить группу
              </Button>
              <AttributeGroupAddForm
                show={groupVisible}
                onHide={() => setGroupVisible(false)}
              />
            </>
          )}
          {activeComponent === "attributes" && (
            <>
              <AttributeTable />
              <Button onClick={() => setAttributeVisible(true)}>
                Добавить группу
              </Button>
              <AttributeAddForm
                show={attributeVisible}
                onHide={() => setAttributeVisible(false)}
              />
            </>
          )}
          {activeComponent === "orders" && <OrderTable />}
        </div>
      </div>
    </>
  );
});

export default AdminPage;
