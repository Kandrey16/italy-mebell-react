Нужно сделать к диплому:

    Очень надо:
        - Более сложная фильтрация (checkbox, цена, диапозон значений)

    Может подождать
        - Смена цены за заказ и доставку
            цена доставки после подтвеждения (пункт о том, что стоимость не конечная)
        - Смена пароля

    Косметика
        - Переключение между характеристиками и описанием

    Товары:
        - Одновременный поиск и фильтрация
        - Более сложная фильтрация (checkbox, цена, диапозон значений)
        - Сортировка
        - Изменения характеристик

        - Переключение между характеристиками и описанием

        Поиск:
            - Поиск по ключевым словам (данные дочерних таблиц)
            - Выпадение списка товаров подходящих по поиску

        Наличие товаров
        - Если количество больше 0 - доступен, если 0 - недоступен
        - Скидки (процент, дата начала и окончания, цена после скидки)

        Уменьшение количества товара при завершении заказа

        Featured Image Galery - компонент для нескольких фотографий

        Исправить добавление, изменение (категории и коллекции)

    Избранное
        - Создание таблицы для избранных товаров

    Админка
        - Импорт/ЭКСПОРТ данных
        - Создание товарных накладных excel

        - Смена цены за заказ и доставку
            цена доставки после подтвеждения (пункт о том, что стоимость не конечная)

    Личный кабинет:
        - Смена пароля
            - Реализация метода на сервере (put-запрос на сервер, метод для отправки сообщения в mailer)
            - Создание api, store и компонентов на клиенте
        
    Уведомления:
        - Уведомления через почту

    Аутентификация
        Регистрация:
            - 2факторная аутентификация
        Авторизация/регистрация:
            - после регистрации система не запоминает данные пользователя, только после авторизации

    Подвал сайта

    Категории:
        отображать только те, у которых есть товар в наличии
---
Рефакторинг:
    SCSS:
        Carousel - Масштаб фотографий
        CatalogCard - Изменение теста при адаптиве
        Pagination - Цвет кнопок
        ProductCard - изменение размеров при адаптиве
        CommentCard - адаптив
        SideBar - адаптив
        ProductPage - размеры объектов, разеделение на компоненты
        LoginPage - Изменение цветов, сделать форму более контрасной

    Смена обычных alert на компонент библиотеки
---

Баги:
    Отзывы
        Не появлеются отзывы после добавления
        Не отображаются обновленные отзывы
        Не удалятся сразу отзывы

    Товары:
        ошибки на странице товара при выводе характеристик

    Бесконечный рендеринг во время оформления заказа.

    Валидация всех полей

    Сообщения на почту
        Исправить отправление всех данных

    Создание корзины
        -Создавать корзину не клиенте, а на сервере


    После регистрации нет перехода на главную

    Карусель:
        - Правильное заполнение пространства картинкой
---

---

Идеи:
Генерация товарных накладных в excel

---

CREATE TABLE IF NOT EXISTS public.order_history
(
id_order_history SERIAL PRIMARY KEY, -- Поле для уникального идентификатора записи истории заказа
id_order integer NOT NULL, -- Идентификатор заказа
number_order integer NOT NULL, -- Номер заказа
price_order numeric(18,2) NOT NULL, -- Цена заказа
date_order timestamp with time zone NOT NULL, -- Дата заказа
id_order_address integer, -- Идентификатор адреса доставки
id_payment_method integer, -- Идентификатор способа оплаты
id_order_product integer, --Идентификатор товаров заказа
address_order text COLLATE pg_catalog."default" NOT NULL, -- Адрес доставки
entrance_order integer, -- Номер подъезда
floor_order integer, -- Этаж
home_code_order character varying(255) COLLATE pg_catalog."default", -- Код домофона
name_payment_method character varying(255) COLLATE pg_catalog."default" NOT NULL, -- Название способа оплаты
email_user character varying(255) COLLATE pg_catalog."default" NOT NULL, -- Электронная почта пользователя
CONSTRAINT order_history_fk1 FOREIGN KEY (id_order) REFERENCES public.orders (id_order) ON UPDATE CASCADE ON DELETE CASCADE, -- Внешний ключ, связывающий историю заказов с таблицей заказов
CONSTRAINT order_history_fk2 FOREIGN KEY (id_order_address) REFERENCES public.order_addresses (id_order_address) ON UPDATE CASCADE ON DELETE SET NULL, -- Внешний ключ, связывающий адрес доставки и историю заказов
CONSTRAINT order_history_fk3 FOREIGN KEY (id_payment_method) REFERENCES public.payment_methods (id_payment_method) ON UPDATE CASCADE ON DELETE SET NULL, -- Внешний ключ, связывающий способ оплаты и историю заказов
CONSTRAINT order_history_fk4 FOREIGN KEY (id_order_product) REFERENCES public.order_products (id_order_product) ON UPDATE CASCADE ON DELETE SET NULL -- Внешний ключ, связывающий товары заказа и историю заказов
);

-- Создание триггера для автоматического добавления данных о заказе в таблицу order_history
CREATE OR REPLACE FUNCTION add_to_order_history()
RETURNS TRIGGER AS $$
BEGIN
INSERT INTO public.order_history (
id_order,
number_order,
price_order,
date_order,
id_order_address,
id_payment_method,
id_order_product,
address_order,
entrance_order,
floor_order,
home_code_order,
name_payment_method,
email_user
) VALUES (
NEW.id_order,
NEW.number_order,
NEW.price_order,
NEW.date_order,
NEW.id_order_address,
NEW.id_payment_method,
NEW.id_order_product,
(SELECT address_order FROM public.order_addresses WHERE id_order_address = NEW.id_order_address), -- Получение адреса доставки из таблицы order_addresses
(SELECT entrance_order FROM public.order_addresses WHERE id_order_address = NEW.id_order_address), -- Получение номера подъезда из таблицы order_addresses
(SELECT floor_order FROM public.order_addresses WHERE id_order_address = NEW.id_order_address), -- Получение этажа из таблицы order_addresses
(SELECT home_code_order FROM public.order_addresses WHERE id_order_address = NEW.id_order_address), -- Получение кода домофона из таблицы order_addresses
(SELECT name_payment_method FROM public.payment_methods WHERE id_payment_method = NEW.id_payment_method), -- Получение названия способа оплаты из таблицы payment_methods
(SELECT email_user FROM public.order_addresses WHERE id_order_address = NEW.id_order_address), -- Получение электронной почты пользователя из таблицы order_addresses
);
RETURN NEW;
END;

$$
LANGUAGE plpgsql;
$$
