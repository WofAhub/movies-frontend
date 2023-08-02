// проверка ответа с сервера
export default function checkAnswerFromServer(res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}