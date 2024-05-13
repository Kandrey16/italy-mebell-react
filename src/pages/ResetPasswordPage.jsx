import { useContext, useState } from "react";
import { Input, Button, Card, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react";
import { Context } from "@/main";

const ChangePasswordPage = observer(() => {
  const { user } = useContext(Context);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [codeSent, setCodeSent] = useState(false); // Стейт для отслеживания отправки кода
  const navigate = useNavigate();

  const handleSendCode = async (e) => {
    e.preventDefault();
    console.log("Запрос на отправку кода с email:", email);
    try {
      await user.sendResetPasswordCode(email);
      console.log("Код подтверждения отправлен на почту:", email);
      setCodeSent(true);
    } catch (error) {
      console.error("Ошибка при запросе на отправку кода:", error);
      setError(error.response.data.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Запрос на сброс пароля с email:", email);
    setLoading(true);
    try {
      await user.resetPassword(email, code, newPassword, confirmPassword);
      console.log("Пароль успешно изменен для пользователя:", email);
      navigate("/login"); // Переход на страницу входа после смены пароля
    } catch (error) {
      console.error("Ошибка при запросе на сброс пароля:", error);
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container flex flex-col items-center justify-center h-screen">
      <Typography variant="h3" className="mb-5">
        Смена пароля
      </Typography>
      <div className="w-full max-w-md mx-auto">
        <Card color="white" className="flex flex-col p-10 w-full shadow-lg">
          {!codeSent ? (
            <form onSubmit={handleSendCode} className="space-y-6">
              {error && (
                <Typography variant="p" color="red" className="text-center">
                  {error}
                </Typography>
              )}
              <Input
                type="text"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button
                className="w-full bg-colorPrimary"
                buttonType="filled"
                size="lg"
                block={true}
                iconOnly={false}
                ripple="light"
                type="submit"
                disabled={loading}
              >
                Отправить код подтверждения
              </Button>
            </form>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <Typography variant="p" color="red" className="text-center">
                  {error}
                </Typography>
              )}
              <Input
                type="text"
                label="Код подтверждения"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
              />
              <Input
                type="password"
                label="Новый пароль"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <Input
                type="password"
                label="Повторите пароль"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <Button
                className="w-full bg-colorPrimary"
                color="lightBlue"
                buttonType="filled"
                size="lg"
                block={true}
                iconOnly={false}
                ripple="light"
                type="submit"
                disabled={loading}
              >
                Сменить пароль
              </Button>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
});

export default ChangePasswordPage;
