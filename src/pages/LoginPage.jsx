import { login, registration } from "@/API/UserAPI";
import { createCart } from "@/API/ProductAPI";
import { Context } from "@/main";
import {
  LOGIN_ROUTE,
  MAIN_ROUTE,
  REGISTRATION_ROUTE,
  RESET_PASSWORD_ROUTE,
} from "@/routes/utils/consts";
import {
  Card,
  Typography,
  Input,
  Button,
  Checkbox,
} from "@material-tailwind/react";
import { observer } from "mobx-react";
import { useContext, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

const LoginPage = observer(() => {
  const { user } = useContext(Context);
  const navigate = useNavigate();
  const location = useLocation();
  const isLogin = location.pathname === LOGIN_ROUTE;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const signIn = async () => {
    try {
      console.log("Начало процесса входа/регистрации");
      // Проверяем совпадение паролей только при регистрации
      if (!isLogin && password !== confirmPassword) {
        alert("Пароли не совпадают!");
        return;
      }

      let data;
      if (isLogin) {
        console.log("Попытка войти с email:", email);

        data = await login(email, password);
      } else {
        console.log("Попытка регистрации с email:", email);
        data = await registration(email, password);
        console.log("Ответ сервера на регистрацию:", data);
        await createCart(data.email_user); // Логика по созданию корзины, если требуется
      }
      console.log("Ответ сервера:", data);
      user.setUser(data);
      user.setIsAuth(true);
      navigate(MAIN_ROUTE);
    } catch (error) {
      console.error("Ошибка при запросе:", error);
      const errorMessage =
        error.response?.data?.message || "Неизвестная ошибка";
      console.error("Сообщение об ошибке:", errorMessage);
      alert(errorMessage);
    }
  };

  return (
    <>
      <div className="container flex flex-col items-center justify-center h-screen">
        <div className="w-full max-w-md mx-auto shadow-2xl">
          <Typography variant="h3" className="m-5 text-center">
            {isLogin ? "Добро пожаловать!" : "Создать новый аккаунт"}
          </Typography>
          <Card color="white" className="flex flex-col p-10 w-full ">
            <form
              className="space-y-6"
              onSubmit={(e) => {
                e.preventDefault();
                signIn();
              }}
            >
              <Input
                type="email"
                color="lightBlue"
                size="lg"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Input
                type="password"
                color="lightBlue"
                size="lg"
                placeholder="Пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {!isLogin && (
                <Input
                  type="password"
                  color="lightBlue"
                  size="lg"
                  placeholder="Повторите пароль"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Checkbox id="remember_me" color="lightBlue" />
                  <label
                    htmlFor="remember_me"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Запомнить меня
                  </label>
                </div>
                {/* Ссылка на восстановление пароля */}
                <NavLink
                  to={RESET_PASSWORD_ROUTE}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Забыли пароль?
                </NavLink>
              </div>
              <Button
                className="w-full bg-colorPrimary"
                buttonType="filled"
                size="lg"
                block={true}
                iconOnly={false}
                ripple="light"
                type="submit"
              >
                {isLogin ? "Войти" : "Зарегистрироваться"}
              </Button>
              {isLogin ? (
                <Typography variant="small" className="text-center">
                  Нет аккаунта?
                  <NavLink
                    to={REGISTRATION_ROUTE}
                    className="ml-1 text-blue-600 font-semibold hover:underline"
                  >
                    Зарегистрируйтесь
                  </NavLink>
                </Typography>
              ) : (
                <Typography variant="small" className="text-center">
                  Уже зарегистрированы?
                  <NavLink
                    to={LOGIN_ROUTE}
                    className="ml-1 text-blue-600 font-semibold hover:underline"
                  >
                    Войти
                  </NavLink>
                </Typography>
              )}
            </form>
          </Card>
        </div>
      </div>
    </>
  );
});

export default LoginPage;
