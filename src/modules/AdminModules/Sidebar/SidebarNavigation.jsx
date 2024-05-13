import {
  Card,
  Typography,
  List,
  ListItem,
  Button,
} from "@material-tailwind/react";

import styles from "./Sidebar.module.scss";
import { useState } from "react";

export default function SidebarNavigation({ onMenuItemClick }) {
  const [isBackupInProgress, setIsBackupInProgress] = useState(false);
  const [alertData, setAlertData] = useState({
    show: false,
    message: "",
    color: "green",
  }); // Добавлено состояние для алертов

  const createBackup = async () => {
    try {
      setIsBackupInProgress(true);
      const response = await fetch(
        `${import.meta.env.VITE_APP_API_URL}/api/database/backup`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
          },
          body: null, // если ваш POST запрос не требует данных, то передайте null
        }
      );

      if (response.ok) {
        const result = await response.json();
        setAlertData({ show: true, message: result.message, color: "green" });
      } else {
        setAlertData({
          show: true,
          message: `Ошибка: ${response.status}`,
          color: "red",
        });
      }
    } catch (error) {
      console.error("Ошибка при создании бэкапа базы данных:", error);
      setAlertData({
        show: true,
        message: "Произошла ошибка при создании бэкапа базы данных.",
        color: "red",
      });
    }
    setIsBackupInProgress(false);
    setTimeout(
      () => setAlertData({ show: false, message: "", color: "green" }),
      3000
    ); // Алерт автоматически закроется через 3 секунды
  };

  return (
    <>
      {alertData.show && (
        <div className="fixed bottom-0 left-0 p-4 max-w-md w-full">
          <Alert
            color={alertData.color}
            onClose={() => setAlertData({ show: false, message: "" })}
          >
            {alertData.message}
          </Alert>
        </div>
      )}
      <Card className={styles.card}>
        <div className="mb-2 p-4">
          <Typography variant="h5" color="black">
            ItalyMebell
          </Typography>
        </div>
        <List>
          <ListItem onClick={() => onMenuItemClick("products")}>
            <Typography>Товары</Typography>
          </ListItem>
          <ListItem onClick={() => onMenuItemClick("orders")}>
            <Typography>Заказы</Typography>
          </ListItem>
          <ListItem onClick={() => onMenuItemClick("categories")}>
            <Typography>Категории</Typography>
          </ListItem>
          <ListItem onClick={() => onMenuItemClick("collections")}>
            <Typography>Коллекции</Typography>
          </ListItem>
          <ListItem onClick={() => onMenuItemClick("groups")}>
            <Typography>Группы атрибутов</Typography>
          </ListItem>
          <ListItem onClick={() => onMenuItemClick("attributes")}>
            <Typography>Атрибуты</Typography>
          </ListItem>

          <ListItem onClick={() => onMenuItemClick("order_deliveries")}>
            <Typography>Способы доставки</Typography>
          </ListItem>
          <ListItem>
            <Button onClick={createBackup} disabled={isBackupInProgress}>
              {isBackupInProgress
                ? "Создание бэкапа..."
                : "Создать бэкап базы данных"}
            </Button>
          </ListItem>
        </List>
      </Card>
    </>
  );
}
