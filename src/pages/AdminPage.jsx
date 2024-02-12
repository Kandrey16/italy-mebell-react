import ProductList from "@/modules/Table/Table";

export default function AdminPage() {
  return (
    <>
      {/* <DataTable request={"http://localhost:5000/api/product"}/> */}
      {/* <DataTable request={"http://localhost:5000/api/product_image"}/> */}
      <ProductList />
    </>
  );
}
