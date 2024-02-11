import { Typography } from "@material-tailwind/react";
import { ChevronUpDownIcon } from "@heroicons/react/24/outline";

export function TableHead({ headers }) {
  return (
    <tr>
      {headers.map((head, index) => (
        <th
          key={head}
          className="border-b border-blue-gray-100 bg-green-400 p-4"
        >
          <Typography
            variant="small"
            color="white"
            className="flex justify-between font-normal leading-none"
          >
            {head}
            {index !== headers.length - 1 && (
              <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
            )}
          </Typography>
        </th>
      ))}
    </tr>
  );
}
