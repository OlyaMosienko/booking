# Волшебная гостиница "Дырявый котёл"

Веб-приложение по поиску и бронированию номеров в отеле.
[🔗 Ссылка на демо приложения](http://45.139.78.151/)

<img width="500" alt="image" src="/main-demo.webp">

## Tech Stack:

### _Frontend:_

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white) ![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-%23EC5990.svg?style=for-the-badge&logo=reacthookform&logoColor=white) ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)

### _Backend:_

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)

### _Инструменты:_

![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white) ![Feature Slide Design (FSD)](https://img.shields.io/badge/-FSD-f4f4f4?style=for-the-badge&logo=FSD&logoColor=blue&color=blue) ![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white) ![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)

## Функционал

1. Поиск доступных номеров по заданным фильтрам (даты, тип номера, количество гостей, максимальная цена)
2. Возможность забронировать номер и просматривать/отменять уже существующие бронирования
3. Добавлять номер в список избранного
4. Редактировать информацию о номере (для администратора)

## Installation

_Изучить проект локально:_

-   клонирование репозитория

```js
git clone https://github.com/OlyaMosienko/booking.git
```

-   установка зависимостей (в обеих директориях)

```js
cd frontend/
npm i

cd backend/
npm i
```

-   в директории backend скопируйте файл .env.example, переименуйте его в .env и заполните свое окружение (DB_CONNECTION_STRING, JWT_SECRET)
-   запуск (в обеих директориях)

```js
npm run dev
```

-   откройте проект в браузере по адресу http://localhost:5173

_Docker:_

-   клонирование репозитория

```js
git clone https://github.com/OlyaMosienko/booking.git
```

-   в директории backend скопируйте файл .env.example, переименуйте его в .env и заполните свое окружение (DB_CONNECTION_STRING, JWT_SECRET)
-   в корневой директории проекта выполните следующие команды

```js
docker build -t booking .
docker run -p 3000:3000 -d booking
```

-   откройте проект в браузере по адресу http://localhost:3000
