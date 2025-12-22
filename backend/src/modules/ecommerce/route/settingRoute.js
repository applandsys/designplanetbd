const express = require('express');
const router = express.Router();
const locationController = require('../controller/locationController');
const siteSettingController = require('../controller/admin/siteSettingController');
const upload = require("@/middleware/siteLogoUpload");
const productAdminController = require("@/modules/ecommerce/controller/admin/productController");

// BASE LOCATION: // /v1/admin/setting

// v1/setting/location/ ... ? [GET, POST]
router.get('/location/all-primary', locationController.allPrimaryLocation);
router.get('/location/all', locationController.allLocations);
router.get('/location/type/:level', locationController.allLocations);
router.get('/location/parents/:parentId', locationController.allLocations);
router.post('/location/add', locationController.addLocation);

router.post(
    '/site-setting',
    upload.fields([
        { name: 'logo', maxCount: 1 }
    ]),
    siteSettingController.siteSetting
);

router.get(
    '/site-setting',
    siteSettingController.getSiteSetting
);

module.exports = router;