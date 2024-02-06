import DataTable from "@/modules/DataTable/DataTable";
import { SortableTable } from "@/modules/SuperDataTable";


export default function AdminPage() {
  return (
    <>
      <h1>Admin</h1>
      <DataTable />
      <SortableTable/>
    </>
  );
}
