//DataTable.jsx
import { Card, CardBody } from "@material-tailwind/react";
import { TableRow } from "./TableRow/TableRow";
import { TableHead } from "./TableHead/TableHead";
import { useFetch } from "@/hooks/useFetch";
import { getProducts } from "@/API/requests";
// import styles from "./DataTable.module.scss";

const TABLE_HEAD = [
  "ID",
  "Артикул",
  "Название",
  "Цена",
  "Описание",
  "Количество",
  "Доступность",
  "Дата создания",
  "Дата изменения",
];

//NOTE: Компонент для инверсального вывода данных из API в таблицу
export default function DataTable({request}) {
  const [data, error] = useFetch(request);

  if (error) {
    return <div>Ошибка: {error.message}</div>;
  }

  if (!data) {
    return <div>Загрузка...</div>;
  }

  //Использует поля таблицы в качестве название столбцов
  const tableHead = Object.keys(data[0]);

  return (
    <>
      <Card className="m-4">
        <CardBody className="overflow-scroll px-0">
          <table className="p-8 w-full min-w-max table-auto text-left rounded-xl">
            <thead>
              {/* Здесь меняется переменная в header */}
              <TableHead headers={tableHead} />
            </thead>
            <tbody>
              {data.map((data, index) => {
                return <TableRow data={data} key={index} />;
              })}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </>
  );
}
