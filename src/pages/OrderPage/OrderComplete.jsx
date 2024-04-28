import { useNavigate } from "react-router-dom";
import ok_icon from "@/assets/icon-ok.svg";
import { MAIN_ROUTE, PROFILE_ROUTE } from "@/routes/utils/consts";

export default function OrderComplete({ orderNumber, route }) {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center h-screen">
      {/* Контейнер для выравнивания положения сообщения вертикально */}
      <div className="pt-20 w-full">
        {/* Большой контейнер для сообщения */}
        <div className="max-w-lg w-full text-center p-4 md:p-8 bg-white shadow-xl rounded-lg mx-auto">
          {/* Иконка успеха или другое изображение центрировано по горизонтали */}
          <div className="flex justify-center my-4">
            <img
              src={ok_icon}
              alt="Заказ успешно оформлен"
              className="w-24 h-24"
            />
          </div>
          <h1 className="text-2xl md:text-4xl font-semibold text-gray-700">
            Заказ успешно оформлен!
          </h1>
          <p className="text-gray-500 my-4">
            Ваш заказ <strong>№{orderNumber}</strong> ожидает подтверждения. Мы
            свяжемся с вами в ближайшее время
          </p>
          {/* Управляющие кнопки */}
          <div className="grid grid-cols-2 gap-4 my-4">
            <button
              className=" bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-6 py-3 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
              type="button"
              onClick={() => {
                navigate(MAIN_ROUTE);
              }}
            >
              Вернуться в магазин
            </button>
            <button
              className=" bg-green-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-6 py-3 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
              type="button"
              onClick={() => {
                navigate(PROFILE_ROUTE);
              }}
            >Личный кабинет</button>
          </div>
        </div>
      </div>
    </div>
  );
}
