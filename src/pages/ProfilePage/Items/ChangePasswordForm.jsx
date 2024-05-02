import { useContext, useState } from "react";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  Input,
} from "@material-tailwind/react";
import { Context } from "@/main";
import { observer } from "mobx-react";

const ChangePasswordForm = observer(
  ({ show, onHide, userData, setUserData }) => {
    const { user } = useContext(Context);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    console.log(userData);

    const handleSave = () => {
      user
        .changePassword(email, oldPassword, newPassword, confirmPassword)
        .then((updatedPassword) => {
          setUserData({ ...userData, ...updatedPassword });
          onHide();
        })
        .catch((error) => {
          alert(
            "Ошибка: " +
              (error.response?.data.message || "Неверный старый пароль")
          );
        });
    };

    return (
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
      </Dialog>
    );
  }
);

export default ChangePasswordForm;
