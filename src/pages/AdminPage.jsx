import DataTable from "@/modules/DataTable/DataTable";
import { SortableTable } from "@/modules/DataTable/SuperDataTable";
import ProductList from "@/modules/CRUD/Table";

export default function AdminPage() {
  return (
    <>
      {/* <DataTable request={"http://localhost:5000/api/product"}/> */}
      {/* <DataTable request={"http://localhost:5000/api/product_image"}/> */}
      <ProductList/>
    </>
  );
}
