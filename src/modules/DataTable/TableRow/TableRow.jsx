import { Typography } from "@material-tailwind/react";
// import { IconButton, Tooltip, Typography } from "@material-tailwind/react";
// import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";

export function TableRow({ data }) {
  // const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
  // const classes = "p-4"
  return (
    <tr className="even:bg-blue-gray-50/50">
      {Object.values(data).map((value, index) => (
        <td key={index} className="p-4">
          <Typography variant="small" color="blue-gray" className="font-normal">
            {value}
          </Typography>
        </td>
      ))}
    </tr>
  );
}

