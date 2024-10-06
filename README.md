Структура данных приложения

-   База данных на JSON Server.
-   BFF (Backend for Frontend).
-   Redux Store на клиенте.

Определение сущностей приложения

-   Пользователь: БД (весь список), BFF (сессия текущего), Redux Store (отображение в браузере).
-   Роль пользователя: БД (весь список), BFF (сессия текущего пользователя с ролью), Redux Store (использование на клиенте).
-   Номера: БД (весь список), Redux Store (отображение в браузере).
-   Бронирования: БД (весь список), Redux Store (отображение в браузере).
-   Избранное: БД (весь список), Redux Store (отображение в браузере).
-   Отзывы: БД (весь список), Redux Store (отображение в браузере).

Определение таблиц БД и их схемы

-   Пользователи (users):
    -   id
    -   login
    -   password
    -   role_id
-   Роли (roles):
    -   id
    -   name
-   Номера (rooms):
    -   id
    -   title
    -   image_url
    -   description
    -   type
    -   price
    -   availability
    -   amenities: []
    -   capacity: [adults / children]
    -   reviews_count
-   Бронирования (bookings):
    -   id
    -   user_id
    -   room_id
    -   check_in_date
    -   check_out_date
-   Избранное (favorites):
    -   id
    -   user_id
    -   room_id
-   Отзывы (reviews):
    -   id
    -   author_id
    -   room_id
    -   content

Определение схемы состояния на BFF

-   Сессия текущего пользователя:
    -   login
    -   password
    -   role

Определение схемы для Redux Store

```
user: {
  id,
  login,
  roleId,
},
rooms: [{
  id,
  title,
  imageUrl,
  price,
  description,
  type,
  availability,
  reviewsCount
}],
bookings: [{
  id,
  userId,
  roomId,
  checkInDate,
  checkOutDate,
}],
favorites: [{
  id,
  userId,
  roomId,
}],
reviews: [{
  id,
  authorId,
  roomId,
  content,
}],
```
