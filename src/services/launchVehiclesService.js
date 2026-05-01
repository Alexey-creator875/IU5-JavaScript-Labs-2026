const fileService = require('./fileService');

// Переменная для хранения пути к файлу данных, будет установлена при инициализации
let dataFilePath;

// Функция инициализации сервиса с путем к файлу данных
const init = (filePath) => {
    dataFilePath = filePath;
};

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

const findOne = (id) => {
    const launchVehicles = fileService.readData(dataFilePath);
    return launchVehicles.find(launchVehicle => launchVehicle.id === id);
};

const create = (launchVehicleData) => {
    const launchVehicles = fileService.readData(dataFilePath);
    
    // Генерация ID: берем максимальный ID + 1
    const newId = launchVehicles.length > 0 
        ? Math.max(...launchVehicles.map(lv => lv.id)) + 1 
        : 1;
        
    const newLaunchVehicle = { id: newId, ...launchVehicleData };
    launchVehicles.push(newLaunchVehicle);
    fileService.writeData(dataFilePath, launchVehicles);
    
    return newLaunchVehicle;
};

const update = (id, launchVehicleData) => {
    const launchVehicles = fileService.readData(dataFilePath);
    const index = launchVehicles.findIndex(lv => lv.id === id);
    
    if (index === -1) return null;
    
    launchVehicles[index] = { ...launchVehicles[index], ...launchVehicleData };
    fileService.writeData(dataFilePath, launchVehicles);
    
    return launchVehicles[index];
};

const remove = (id) => {
    const launchVehicles = fileService.readData(dataFilePath);
    const filteredLaunchVehicles = launchVehicles.filter(lv => lv.id !== id);
    
    if (filteredLaunchVehicles.length === launchVehicles.length) {
        return false; // Ничего не удалили
    }
    
    fileService.writeData(dataFilePath, filteredLaunchVehicles);
    return true;
};

module.exports = { init, findAll, findOne, create, update, remove };