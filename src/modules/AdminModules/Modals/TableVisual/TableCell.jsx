import { Input, Typography } from "@material-tailwind/react";

export default function TableCell({ data }) {
  return (
    <>
      <td
        className="p-4 w-auto  
        text-ellipsis
        whitespace-nowrap 
        overflow-x-auto 
        border border-gray-200"
      >
        <Typography variant="small" color="blue-gray" className="font-normal">
          {data !== null && data !== undefined ? data.toString() : ""}
        </Typography>
      </td>
    </>
  );
}
