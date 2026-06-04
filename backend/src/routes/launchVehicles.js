const express = require('express');
const router = express.Router();
const launchVehiclesController = require('../controllers/launchVehiclesController');

// Определение маршрутов
router.get('/', launchVehiclesController.getAllLaunchVehicles);
router.get('/:id', launchVehiclesController.getLaunchVehicleById);
router.post('/', launchVehiclesController.createLaunchVehicle);
router.patch('/:id', launchVehiclesController.updateLaunchVehicle);
router.delete('/:id', launchVehiclesController.deleteLaunchVehicle);

module.exports = router;