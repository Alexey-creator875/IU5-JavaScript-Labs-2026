# Лабораторная работа №4. Создание бэкенда на Express.js

## Содержание

1. [Постановка задачи](#постановка-задачи)
2. [Тема](#тема)
3. [Результат работы](#результат-работы)
4. [Дополнительное задание](#дополнительное-задание)

## Постановка задачи

**Задача** — разработать REST API сервис карточек `launchVehicle` c методами:

- GET `/launchVehicles/` — получение всех карточек
- POST `/launchVehicles` — создание новой карточки
- GET `/launchVehicles/:id` — получение карточки по ID
- PATCH `/launchVehicles/:id` — обновление карточки по ID
- DELETE `/launchVehicles/:id` — удаление карточки по ID

## Тема

**Сборка ракетоносителей Ангара разных типов**

В соответствии с темой, карточки содержат информацию о ракетоносителях (`launchVehicles`).

## Результат работы

### Запуск сервера

![Фото 1](assets/readme/web_server_works.png)


### GET /launchVehicles/ — получение всех карточек

![Фото 2](assets/readme/get_all_launch_vehicles.png)
![Фото 3](assets/readme/console_GET_request.png)

### GET /launchVehicles?title=Ангара-1.2 — поиск по названию

![Фото 4](assets/readme/get_launch_vehicles_by_name.png)

### POST /launchVehicles — создание новой карточки

![Фото 5](assets/readme/add_new_launch_vehicle.png)

Проверка:

![Фото 6](assets/readme/check_adding_new_launch_vehicle.png)

### GET /launchVehicles/:id — получение карточки по ID

![Фото 7](assets/readme/get_launch_vehicle_by_id.png)

### PATCH /launchVehicles/:id — обновление карточки

![Фото 8](assets/readme/update_launch_vehicle.png)

Проверка:

![Фото 9](assets/readme/check_updating_launch_vehicle.png)

### DELETE /launchVehicles/:id — удаление карточки

![Фото 10](assets/readme/delete_launch_vehicle.png)

Проверка:

![Фото 11](assets/readme/check_delete_launch_vehicle.png)

## Дополнительное задание

- Реализовать поиск карточек по **цене**

Функция `getAllLaunchVehicles(req, res)` теперь помимо параметра `title` учитывает `price`. Далее передаёт оба параметра в функцию `findAll(title, price)`.

```javascript
const getAllLaunchVehicles = (req, res) => {
    const { title, price } = req.query;
    const launchVehicles = launchVehiclesService.findAll(title, price);
    res.json(launchVehicles);
};
```

Функция `findAll(req, res)` читает все записи, а затем использует по очереди два параметра. Сначала фильтрует записи по названию, если оно задано, а потом - по цене. Если вдруг оба параметра не заданы (их значения равны `undefined`), функция возвращает все записи.

```javascript
const findAll = (title, price) => {
    const launchVehicles = fileService.readData(dataFilePath);

    if (!title & !price) {
        return launchVehicles;
    }

    let filteredLaunchVehicles = launchVehicles;

    if (title) {
        filteredLaunchVehicles = filteredLaunchVehicles.filter(launchVehicle => 
            launchVehicle.title.toLowerCase().includes(title.toLowerCase())
        );
    }

    if (price) {
        filteredLaunchVehicles = filteredLaunchVehicles.filter(launchVehicle => 
            launchVehicle.price.toLowerCase().includes(price.toLowerCase())
        );
    }

    return filteredLaunchVehicles;
};
```

![Фото 12](assets/readme/extra_get_launch_vehicles_by_price.png)