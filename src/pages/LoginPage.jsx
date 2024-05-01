import { login, registration } from "@/API/UserAPI";
import { createCart } from "@/API/ProductAPI";
import { Context } from "@/main";
import {
  LOGIN_ROUTE,
  MAIN_ROUTE,
  REGISTRATION_ROUTE,
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
      // Проверяем совпадение паролей только при регистрации
      if (!isLogin && password !== confirmPassword) {
        alert("Пароли не совпадают!");
        return;
      }

      let data;
      if (isLogin) {
        data = await login(email, password);
      } else {
        data = await registration(email, password);
        await createCart(data.user.email_user); // Логика по созданию корзины, если требуется
      }
      user.setUser(data);
      console.log(data);
      user.setIsAuth(true);
      navigate(MAIN_ROUTE);
    } catch (error) {
      alert(error.response.data.message);
    }
  };


  return (
    <>
      <div className="container flex flex-col items-center justify-center h-screen">
        <Typography variant="h3" className="mb-5">
          {isLogin ? "Добро пожаловать!" : "Создать новый аккаунт"}
        </Typography>
        <div className="w-full max-w-md mx-auto">
          <Card color="white" className="flex flex-col p-10 w-full shadow-lg">
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
                  to="/forgot-password"
                  className="text-sm text-blue-600 hover:underline"
                >
                  Забыли пароль?
                </NavLink>
              </div>
              <Button
                color="lightBlue"
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
