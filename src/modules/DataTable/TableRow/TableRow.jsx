import { Typography } from "@material-tailwind/react";

export function TableRow({ data, isLast }) {
  const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

  return (
    <tr className="even:bg-blue-gray-50/50">
      {Object.values(data).map((value, index) => (
        <td key={index} className={classes}>
          <Typography variant="small" color="blue-gray" className="font-normal">
            {value}
          </Typography>
        </td>
      ))}
      <td className={classes}>
        <Typography
          as="a"
          href="#"
          variant="small"
          color="blue-gray"
          className="font-medium"
        >
          Edit
        </Typography>
      </td>
    </tr>
  );
}