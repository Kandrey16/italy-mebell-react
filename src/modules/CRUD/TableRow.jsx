import TableCell from "./TableCell";
import EditIcon from "@/assets/edit.svg";
import DeleteIcon from "@/assets/delete.svg";

export default function TableRow({ product, handleDelete, setEditProduct }) {
  const productEntries = Object.entries(product);
  
  return (
    <tr key={product.id_product} className="even:bg-blue-gray-50/50">
      {productEntries.map(([key, value]) => (
        <TableCell key={key} data={value} />
      ))}
      <td>
        <button className="relative" onClick={() => setEditProduct(product)}>
          <img className="size-auto" src={EditIcon}></img>
        </button>
      </td>
      <td>
        <button className="relative" onClick={() => handleDelete(product.id_product)}>
          <img className="size-auto" src={DeleteIcon}></img>
        </button>
      </td>
    </tr>
  );
}

{
  /* <tr key={product.id_product} className="even:bg-blue-gray-50/50">
  <TableCell data={product.id_product} />
  <TableCell data={product.article_product} />
  <TableCell data={product.name_product} />
  <TableCell data={product.description_product} />
  <TableCell data={product.price_product} />
  <TableCell data={product.count_product} />
  <td>
    <button className="relative" onClick={() => setEditProduct(product)}>
      <img className="size-auto" src={EditIcon}></img>
    </button>
  </td>
  <td>
    <button
      className="relative"
      onClick={() => handleDelete(product.id_product)}
    >
      <img className="size-auto" src={DeleteIcon}></img>
    </button>
  </td>
</tr>; */
}
