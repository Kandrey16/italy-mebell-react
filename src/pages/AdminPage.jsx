import Sidebar from "@/modules/Sidebar/SidebarFilter";
import SidebarWithBurgerMenu from "@/modules/Sidebar/SidebarNavigation";
import ProductList from "@/modules/Table/ProductTable";

export default function AdminPage() {
  return (
    <>
      <div className="flex max-w-full">
        <div className="w-1/5">
          <SidebarWithBurgerMenu />
        </div>
        <div className="w-4/5">
          <ProductList />
        </div>
      </div>
      {/* <DataTable request={"http://localhost:5000/api/product"}/> */}
      {/* <DataTable request={"http://localhost:5000/api/product_image"}/> */}
    </>
  );
}
