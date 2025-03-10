// #1 За допомогою ajax-запиту вивести погоду
//
// http://api.openweathermap.org/data/2.5/weather?q=LVIV&units=metric&APPID=5d066958a60d315387d9492393935c19
// q=XXX - місто, для якого показати погоду

// Вводимо в інпут назву міста, натискаємо кнопку Погода
// Якщо таке місто не існує (404), виводимо напис, що таке місце не знайдено
// Якщо місто існує, виводимо наступну інформацію:
// temp – температура
// pressure - тиск
// description – опис
// humidity – вологість
// speed – швидкість вітру
// deg - напрям у градусах
// icon - значок, де 10d код іконки (виводимо картинку з таким урлом, як нам повернувся)
// http://openweathermap.org/img/w/10d.png

const cityData = document.getElementById('cityData');
const button = document.getElementById('button');
const input = document.getElementById('input');

async function fetchWeather() {
  const city = input.value.trim().toLowerCase();

  if (!city) {
    alert('Please enter a city name');
    return;
  }

  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=5d066958a60d315387d9492393935c19`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('City not found');
    }

    const data = await response.json();
    const { temp, pressure, humidity } = data.main;
    const { description } = data.weather[0];
    const { speed, deg } = data.wind;
    const icon = data.weather[0].icon;
    const iconUrl = `http://openweathermap.org/img/w/${icon}.png`;

    cityData.innerHTML = `
      <h2>Weather in ${data.name}</h2>
      <p><strong>Temperature:</strong> ${temp}°C</p>
      <p><strong>Pressure:</strong> ${pressure} hPa</p>
      <p><strong>Description:</strong> ${description}</p>
      <p><strong>Humidity:</strong> ${humidity}%</p>
      <p><strong>Wind Speed:</strong> ${speed} m/s</p>
      <p><strong>Wind Direction:</strong> ${deg}°</p>
      <img src="${iconUrl}" alt="Weather icon">
    `;
  } catch (error) {
    cityData.innerHTML = `<p style="color:red;">City not found. Please try again.${error}</p>`;
  }
}

button.addEventListener('click', fetchWeather);
input.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    fetchWeather();
  }
});











// За бажанням:
// #2 Використовуючи API https://jsonplaceholder.typicode.com/ зробити пошук поста за ід.
// На сторінку вивести інпут та кнопку Пошук
// Ід поста має бути введений в інпут (валідація: ід від 1 до 100)
// Якщо знайдено пост, то вивести на сторінку нижче блок з постом і зробити кнопку для отримання коментарів до посту.
// По клику на кнопку коментарі має бути виведені нижче під постом коментарі до цього посту
// Якщо зробити Пошук нового поста, старий пост та коментарі видаляються зі сторінки
// Зробити завдання використовуючи проміси, перехопити помилки.


