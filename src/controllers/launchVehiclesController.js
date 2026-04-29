const launchVehiclesService = require('../services/launchVehiclesService');

const getAllLaunchVehicles = (req, res) => {
    const { title } = req.query;
    const launchVehicles = launchVehiclesService.findAll(title);
    res.json(launchVehicles);
};

const getLaunchVehicleById = (req, res) => {
    const id = parseInt(req.params.id);
    const launchVehicle = launchVehiclesService.findOne(id);
    
    if (!launchVehicle) {
        return res.status(404).json({ error: 'Карточка не найдена' });
    }
    
    res.json(launchVehicle);
};

const createLaunchVehicle = (req, res) => {
    const { src, title, description, price } = req.body;
    
    // Простая валидация
    if (!src || !title || !description || !price) {
        return res.status(400).json({ error: 'Не все поля заполнены' });
    }
    
    const newlaunchVehicle = launchVehiclesService.create({ src, title, description, price });
    res.status(201).json(newlaunchVehicle);
};

const updateLaunchVehicle = (req, res) => {
    const id = parseInt(req.params.id);
    const updatedLaunchVehicle = launchVehiclesService.update(id, req.body);
    
    if (!updatedLaunchVehicle) {
        return res.status(404).json({ error: 'Карточка не найдена' });
    }
    
    res.json(updatedLaunchVehicle);
};

const deleteLaunchVehicle = (req, res) => {
    const id = parseInt(req.params.id);
    const success = launchVehiclesService.remove(id);
    
    if (!success) {
        return res.status(404).json({ error: 'Карточка не найдена' });
    }
    
    res.status(204).send(); // 204 No Content
};

module.exports = {
    getAllLaunchVehicles: getAllLaunchVehicles,
    getLaunchVehicleById: getLaunchVehicleById,
    createLaunchVehicle: createLaunchVehicle,
    updateLaunchVehicle: updateLaunchVehicle,
    deleteLaunchVehicle: deleteLaunchVehicle
};