import { Typography } from "@material-tailwind/react";

export function TableHead({headers}) {
  return (
    <tr>
      {headers.map((head) => (
        <th
          key={head}
          className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
        >
          <Typography
            variant="small"
            color="blue-gray"
            className="font-normal leading-none opacity-70"
          >
            {head}
          </Typography>
        </th>
      ))}
    </tr>
  );
}
