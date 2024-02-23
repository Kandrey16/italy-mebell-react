import TableCell from "./TableCell";
import EditIcon from "@/assets/edit.svg";
import DeleteIcon from "@/assets/delete.svg";

export default function TableRow({ product, handleDelete, setEditProduct }) {
  const productEntries = Object.entries(product);

  return (
    // Строки таблицы
    <tr key={product.id_product} className="even:bg-blue-gray-50/50">
      {productEntries.map(([key, value]) => (
        <TableCell key={key} data={value} />
      ))}
      {/* Редатирование */}
      <td>
        <button className="relative" onClick={() => setEditProduct(product)}>
          <img className="size-auto" src={EditIcon}></img>
        </button>
      </td>
      {/* Удаление */}
      <td>
        <button
          className="relative"
          onClick={() => handleDelete(product.id_product)}
        >
          <img className="size-auto" src={DeleteIcon}></img>
        </button>
      </td>
    </tr>
  );
}

// export default function TableRow({ product, handleDelete, handleUpdate }) {
//   const [isEditing, setIsEditing] = useState(false);
//   const [editProduct, setEditProduct] = useState(null);

//   const productEntries = Object.entries(product);

//   const handleEdit = (key, value) => {
//     console.log(`Updating product with value ${value}`);
//     setEditProduct((prevProduct) => ({
//       ...prevProduct,
//       [key]: value,
//     }));
//   };

//   return (
//     <tr key={product.id_product} className="even:bg-blue-gray-50/50">
//       {productEntries.map(([key, value]) => (
//         <TableCell
//           key={key}
//           data={value}
//           isEditing={isEditing}
//           handleEdit={handleEdit}
//           productKey={key}
//         />
//       ))}
//       <td>
//         <button
//           className="relative"
//           onClick={() => {
//             if (isEditing) {
//               handleUpdate(product.id_product, editProduct); // передаем editProduct
//             } else {
//               setEditProduct({ ...product });
//             }
//             setIsEditing(!isEditing);
//           }}
//         >
//           <img className="size-auto" src={isEditing ? CheckIcon : EditIcon} />
//         </button>
//       </td>
//       <td>
//         <button
//           className="relative"
//           onClick={() => handleDelete(product.id_product)}
//         >
//           <img className="size-auto" src={DeleteIcon}></img>
//         </button>
//       </td>
//     </tr>
//   );
// }
