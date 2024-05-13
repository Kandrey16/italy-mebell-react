import React from "react";
import {
  Timeline,
  TimelineItem,
  TimelineConnector,
  TimelineHeader,
  TimelineIcon,
  TimelineBody,
  Typography
} from "@material-tailwind/react";
import {
  ShoppingCartIcon,
  TruckIcon,
  GiftIcon
} from "@heroicons/react/24/outline";

export function TimelineOrder() {
  return (
    <div className="container w-[48rem] my-5 items-start">
      <Timeline>
        <TimelineItem>
          <TimelineConnector />
          <TimelineHeader>
            <TimelineIcon className="p-2">
              <ShoppingCartIcon className="h-5 w-5" />
            </TimelineIcon>
            <Typography variant="h5" color="blue-gray">
              Выбор товара
            </Typography>
          </TimelineHeader>
          <TimelineBody className="pb-8">
            <Typography color="gray" className="font-normal text-gray-600">
              Вы выбираете товар из широкого ассортимента и добавляете его в корзину.
            </Typography>
          </TimelineBody>
        </TimelineItem>
        <TimelineItem>
          <TimelineConnector />
          <TimelineHeader>
            <TimelineIcon className="p-2">
              <ShoppingCartIcon className="h-5 w-5" />
            </TimelineIcon>
            <Typography variant="h5" color="blue-gray">
              Оформление заказа
            </Typography>
          </TimelineHeader>
          <TimelineBody className="pb-8">
            <Typography color="gray" className="font-normal text-gray-600">
              Введите свои контактные данные, адрес доставки и подтвердите заказ.
            </Typography>
          </TimelineBody>
        </TimelineItem>
        <TimelineItem>
          <TimelineConnector />
          <TimelineHeader>
            <TimelineIcon className="p-2">
              <TruckIcon className="h-5 w-5" />
            </TimelineIcon>
            <Typography variant="h5" color="blue-gray">
              Доставка товара
            </Typography>
          </TimelineHeader>
          <TimelineBody className="pb-8">
            <Typography color="gray" className="font-normal text-gray-600">
              Ваш заказ обрабатывается и отправляется курьером до вашего дома.
            </Typography>
          </TimelineBody>
        </TimelineItem>
        <TimelineItem>
          <TimelineHeader>
            <TimelineIcon className="p-2">
              <GiftIcon className="h-5 w-5" />
            </TimelineIcon>
            <Typography variant="h5" color="blue-gray">
              Получение
            </Typography>
          </TimelineHeader>
          <TimelineBody>
            <Typography color="gray" className="font-normal text-gray-600">
              Получите ваш заказ и насладитесь приобретенными товарами!
            </Typography>
          </TimelineBody>
        </TimelineItem>
      </Timeline>
    </div>
  );
}