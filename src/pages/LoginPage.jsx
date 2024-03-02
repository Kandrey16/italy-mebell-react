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
import { NavLink, useLocation } from "react-router-dom";

export default function LoginPage() {
  const location = useLocation();
  const isLogin = location.pathname === LOGIN_ROUTE;
  console.log(location);

  return (
    <>
      <div className="container flex flex-col items-center justify-center">
        <Typography variant="h3" className="my-10">
          {isLogin ? "Вход в аккаунт" : "Регистрация"}
        </Typography>
        <Card
          color="white"
          className="flex flex-col p-4 w-1/2 h-1/3 items-center"
        >
          <form action="" className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
            <div className="my-3">
              <Typography variant="h6" color="blue-gray">
                Почта
              </Typography>
              <Input
                placeholder="name@mail.com"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              />
            </div>
            <div className="my-3">
              <Typography variant="h6" color="blue-gray">
                Пароль
              </Typography>
              <Input
                placeholder="name@mail.com"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Checkbox />
                <Typography>Запомнить меня</Typography>
              </div>
              <NavLink>Забыли пароль?</NavLink>
            </div>
            <Button className="mt-6" color="blue" fullWidth>
              {isLogin ? "Вход" : "Регистрация"}
            </Button>
            {isLogin ? (
              <Typography color="gray" className="p-4 text-center">
                Нет аккаунта?
                <NavLink
                  to={REGISTRATION_ROUTE}
                  className="font-medium text-gray-900 p-2"
                >
                  Регистрация
                </NavLink>
              </Typography>
            ) : (
              <Typography color="gray" className="p-4 text-center">
                Есть акканут?
                <NavLink
                  to={LOGIN_ROUTE}
                  className="font-medium text-gray-900 p-2"
                >
                  Авторизация
                </NavLink>
              </Typography>
            )}
          </form>
        </Card>
      </div>
    </>
  );
}
