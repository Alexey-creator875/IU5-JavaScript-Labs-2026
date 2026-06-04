const express = require('express');
const path = require('path');
const launchVehiclesRouter = require('./routes/launchVehicles');
const launchVehiclesService = require('./services/launchVehiclesService');

const app = express();
const PORT = 3000;

// Определяем путь к файлу данных
const DATA_FILE_PATH = path.join(__dirname, 'data/launchVehicles.json');

// Инициализируем сервис с путем к файлу данных
launchVehiclesService.init(DATA_FILE_PATH);

// 1. Встроенный middleware для парсинга JSON
app.use(express.json());

// Обработка preflight запроса
app.options('/launchVehicles/:id', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.sendStatus(204);
});

// 2. Логирующий middleware
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next(); // Обязательно вызываем next(), иначе запрос зависнет
});

// 3. Подключение маршрутов
app.use('/launchVehicles', launchVehiclesRouter);

// 4. Глобальная обработка 404
app.use((req, res) => {
    res.status(404).json({ error: 'Маршрут не найден' });
});

// error handler
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
});

// 5. Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен по адресу http://localhost:${PORT}`);
});