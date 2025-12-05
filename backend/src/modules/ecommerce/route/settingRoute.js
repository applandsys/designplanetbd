const express = require('express');
const router = express.Router();
const locationController = require('../controller/locationController');

// v1/setting/location/ ... ? [GET, POST]
router.get('/location/all-primary', locationController.allPrimaryLocation);
router.get('/location/all', locationController.allLocations);
router.get('/location/type/:level', locationController.allLocations);
router.get('/location/parents/:parentId', locationController.allLocations);
router.post('/location/add', locationController.addLocation);

module.exports = router;