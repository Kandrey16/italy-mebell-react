import { Typography } from "@material-tailwind/react";
export default function TableHead({ data }) {
  return (
    <>
      <th // Вывод заголовков таблицы
        key={data}
        className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
      >
        <Typography
          variant="small"
          color="blue-gray"
          className="font-normal leading-none opacity-70"
        >
          {data}
        </Typography>
      </th>
    </>
  );
}
