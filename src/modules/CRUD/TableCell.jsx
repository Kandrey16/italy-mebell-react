import { Typography } from "@material-tailwind/react";

export default function TableCell({ data }) {
  return (
    <>
      <td className="p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          {data}
        </Typography>
      </td>
    </>
  );
}
