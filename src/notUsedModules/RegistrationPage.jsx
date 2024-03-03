import { LOGIN_ROUTE } from "@/routes/utils/consts";
import {
  Card,
  Typography,
  Input,
  Button,
  Checkbox,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";

export default function RegistrationPage() {
  return (
    <>
      {/* <div className="container flex flex-col items-center justify-center">
        <Typography variant="h3" className="my-10">
          Регистрация
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
                size="lg"
                //   label="Почта"
                placeholder="name@mail.com"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              />
            </div>
            <div className="my-3">
              <Typography variant="h6" color="blue-gray">
                Пароль
              </Typography>
              <Input
                size="lg"
                //   label="Почта"
                placeholder="name@mail.com"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Checkbox />
                <Typography>Запомнить меня</Typography>
              </div>
              <Link>Забыли пароль?</Link>
            </div>
            <Button className="mt-6" color="blue" fullWidth>
              sign up
            </Button>
            <Typography color="gray" className="mt-4 text-center font-normal">
              Есть аккаунт?
              <Link
                to={LOGIN_ROUTE}
                className="font-medium text-gray-900"
              >
                Войти
              </Link>
            </Typography>
          </form>
        </Card>
      </div> */}
    </>
  );
}
