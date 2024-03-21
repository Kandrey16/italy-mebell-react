import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TableCell from "./TableCell";
import EditIcon from "@/assets/edit.svg";
import DeleteIcon from "@/assets/delete.svg";

export default function TableRow({ product, handleEdit, handleDelete }) {

  return (
    <tr key={product.id_product} className="even:bg-blue-gray-50/50">
      {Object.entries(product).map(([key, value]) => (
        <TableCell key={key} data={value} />
      ))}
      <td>
        <button className="relative" onClick={() => handleEdit(product)}>
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
    </tr>
  );
}
