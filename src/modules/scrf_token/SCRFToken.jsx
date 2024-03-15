import { Button } from "@material-tailwind/react";
import { useState, useEffect } from "react";

export default function ScrfToken() {
  const domainUrl = "http://localhost:5000"; // URL вашего сервера
  const [csrfTokenState, setCsrfTokenState] = useState(""); // Состояние для CSRF-токена
  const [haveWeReceivedPostResponseState, setHaveWeReceivedPostResponseState] =
    useState("not yet"); // Состояние для отслеживания успешности POST-запроса

  // Функция для выполнения GET-запроса к серверу для получения формы и CSRF-токена
  async function getCallToForm() {
    const url = "/form"; // Путь к форме на сервере
    let fetchGetResponse = await fetch(`${domainUrl}${url}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include", // Включаем передачу кук в запросе
      mode: "cors", // Режим запроса
    });
    let parsedResponse = fetchGetResponse.json(); // Преобразование ответа в формат JSON
    setCsrfTokenState(parsedResponse); // Устанавливаем CSRF-токен в состояние
  }

  // Выполнение GET-запроса при загрузке компонента
  useEffect(() => {
    getCallToForm();
  }, []);

  // Функция для выполнения POST-запроса с CSRF-токеном на сервер
  async function testCsurfPostClick() {
    const url = "/process"; // Путь к обработчику POST-запроса на сервере
    let fetchPostResponse = await fetch(`${domainUrl}${url}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "xsrf-token": csrfTokenState, // Передача CSRF-токена в заголовке запроса
      },
      credentials: "include", // Включаем передачу кук в запросе
      mode: "cors", // Режим запроса
    });
    let parsedResponse = await fetchPostResponse.text(); // Преобразование ответа в текст
    setHaveWeReceivedPostResponseState(parsedResponse); // Устанавливаем состояние для отслеживания успешности POST-запроса
  }

  return (
    <div className="py-10">
      <Button color="blue" onClick={testCsurfPostClick}>
        Получить токен
      </Button>
      <p>csrf Token: {csrfTokenState}</p>
      <p>Токен еще не получен: {haveWeReceivedPostResponseState}</p>
    </div>
  );
}
