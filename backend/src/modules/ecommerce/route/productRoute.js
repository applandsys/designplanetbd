const express = require('express');
const router = express.Router();
const productController = require('../controller/productController');
const productReviewController = require("../controller/productReviewController");

// api/product/[categories]  ... ? [GET]

router.get('/all', productController.allProducts);
router.get('/categories', productController.productCategories);
router.get('/brands', productController.productBrands);
router.get('/featured', productController.featuredProducts);
router.get('/new', productController.newProducts);
router.get('/list/:slug', productController.productBySlug);
router.get('/list/:catid', productController.productByCatId);
router.get('/attribute/all',productController.productAttributes);

router.get('/reviews/:productId', productReviewController.getReviewsByProductId);

// router.get('/:id', userController.userById);
// router.get('/tree/:id', userController.userTree);
// router.get('/insert', userController.userInsert);

module.exports = router;