import { useContext, useState } from "react";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  Input,
  Alert,
} from "@material-tailwind/react";
import { Context } from "@/main";
import { observer } from "mobx-react";

const ChangePasswordForm = observer(
  ({ show, onHide, userData, setUserData }) => {
    const { user } = useContext(Context);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [alertData, setAlertData] = useState({ show: false, message: "" }); // Добавлено состояние для алертов

    const email = userData.email_user;

    const handleSave = () => {
      if (newPassword !== confirmPassword) {
        // alert("Поля нового пароля и подтверждения не совпадают.");
        setAlertData({
          show: true,
          message: "Поля нового пароля и подтверждения не совпадают.",
        });
        return;
      }

      user
        .changePassword(email, oldPassword, newPassword, confirmPassword)
        .then(() => {
          setUserData({ oldPassword, newPassword, confirmPassword });
          onHide();
        })
        .catch((error) => {
          // alert(
          //   "Ошибка: " +
          //     (error.response?.data.message || "Неверный старый пароль")
          // );
          setAlertData({
            show: true,
            message:
              "Ошибка: " +
              (error.response?.data.message || "Неверный старый пароль"),
          });
        });
    };

    return (
      <>
        <Dialog open={show} onClose={onHide}>
          <DialogBody>
            <Input
              type="password"
              label="Старый пароль"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              fullWidth
            />
            <Input
              type="password"
              label="Новый пароль"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              fullWidth
            />
            <Input
              type="password"
              label="Подтвердите новый пароль"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              fullWidth
            />
          </DialogBody>
          <DialogFooter>
            <Button color="blue" onClick={handleSave}>
              Сохранить изменения
            </Button>
            <Button color="red" onClick={onHide}>
              Отмена
            </Button>
          </DialogFooter>
          {alertData.show && (
            <Alert
              color="red"
              onClose={() => setAlertData({ show: false, message: "" })}
            >
              {alertData.message}
            </Alert>
          )}
        </Dialog>
      </>
    );
  }
);

export default ChangePasswordForm;
