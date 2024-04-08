import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TableCell from "./TableCell";
import EditIcon from "@/assets/edit.svg";
import DeleteIcon from "@/assets/delete.svg";

export default function TableRow({
  data,
  handleEdit,
  handleDelete,
  hiddenColumns = [],
}) {
  return (
    <tr className="even:bg-blue-gray-50/50">
      {Object.entries(data).map(([key, value]) => {
        if (!hiddenColumns.includes(key)) {
          return <TableCell key={key} data={value} />;
        }
        return null;
      })}
      <td>
        <button className="relative">
          <img className="size-auto" src={EditIcon} onClick={handleEdit}></img>
        </button>
      </td>
      <td>
        <button className="relative">
          <img
            className="size-auto"
            src={DeleteIcon}
            onClick={handleDelete}
          ></img>
        </button>
      </td>
    </tr>
  );
}
