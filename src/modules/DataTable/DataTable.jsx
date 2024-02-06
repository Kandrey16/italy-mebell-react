import { Card } from "@material-tailwind/react";
import { TableRow } from "./TableRow/TableRow";
import { TableHead } from "./TableHead/TableHead";
import { useFetch } from "@/hooks/useFetch";
import styles from './DataTable.module.scss';

export default function DataTable() {
  const [products, error] = useFetch("http://localhost:5000/api/product");

  if (error) {
    return <div>Ошибка: {error.message}</div>;
  }

  if (!products) {
    return <div>Загрузка...</div>;
  }

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
    "Действия",
  ];

  // const tableHead = Object.keys(columnNames);

  return (
    <>
      <div className="container">
        <Card className={styles.card}>
          <table>
            <thead>
              <TableHead headers={TABLE_HEAD} />
            </thead>
            <tbody>
              {products.map((data, index) => {
                const isLast = index === products.length - 1;
                return <TableRow data={data} isLast={isLast} key={index} />;
              })}
            </tbody>
          </table>
        </Card>
      </div>
    </>
  );
}
