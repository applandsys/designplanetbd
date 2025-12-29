require('module-alias/register');
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

/**
 * ✅ CORS: Allow everything (no checks)
 */
app.use(cors());

/**
 * ✅ Body parsing
 */
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

/**
 * ✅ Health check
 */
app.get('/', (req, res) => {
    res.send("Its An API Server");
});

/**
 * ======================
 *        ROUTES
 * ======================
 */

// Auth
const customerAuthRoute = require('@/modules/auth/route/customerAuthRoute');
const userAuthRoute = require('@/modules/auth/route/userAuthRoute');

// Ecommerce
const customerRoute = require('@/modules/ecommerce/route/customerRoute');
const productRoute = require('@/modules/ecommerce/route/productRoute');
const productAdminRoute = require('@/modules/ecommerce/route/productAdminRoute');
const orderAdminRoute = require('@/modules/ecommerce/route/orderAdminRoute');
const vendorRoute = require('@/modules/ecommerce/route/vendorRoute');
const categoryRoute = require('@/modules/ecommerce/route/categoryRoute');
const settingRoute = require('@/modules/ecommerce/route/settingRoute');
const userStatsRoute = require('@/modules/ecommerce/route/stats/userStatsRoute');
const userDataRoute = require('@/modules/ecommerce/route/user/userDataRoute');

/**
 * ======================
 *     API ENDPOINTS
 * ======================
 */

// Customer
app.use('/v1/customer', customerRoute);
app.use('/v1/customer/auth', customerAuthRoute);

// Products & Categories
app.use('/v1/product', productRoute);
app.use('/v1/category', categoryRoute);

// Vendor
app.use('/v1/vendor', vendorRoute);

// Admin
app.use('/v1/admin/product', productAdminRoute);
app.use('/v1/admin/order', orderAdminRoute);
app.use('/v1/admin/setting', settingRoute);

// User
app.use('/v1/user/auth', userAuthRoute);
app.use('/v1/user/stats', userStatsRoute);
app.use('/v1/user/data', userDataRoute);

/**
 * ======================
 *   STATIC FILES
 * ======================
 */
app.use(express.static('public'));

/**
 * ======================
 *      SERVER
 * ======================
 */
const port = process.env.PORT || 4001;

app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on ${port} PORT`);
});
