require('module-alias/register');
require('dotenv').config();
const express = require('express');
const BodyParser = require("body-parser");

const app = express();

// Allow CORS from any origin
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Allow necessary methods
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization'); // Allow necessary headers
    res.setHeader('Access-Control-Allow-Credentials', 'true'); // If you need to handle cookies or authorization headers
    next();
});

// For JSON body parsing
app.use(express.json());
app.use(BodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Custom Global Middlewares
app.get('/', async (req, res) => {
    res.end("It's An API Server");
});


// Custom Routes
const customerAuthRoute = require('@/modules/auth/route/customerAuthRoute');
const userAuthRoute = require('@/modules/auth/route/userAuthRoute');
const customerRoute = require('@/modules/ecommerce/route/customerRoute');
const productRoute = require('@/modules/ecommerce/route/productRoute');
const productAdminRoute = require('@/modules/ecommerce/route/productAdminRoute');
const orderAdminRoute = require('@/modules/ecommerce/route/orderAdminRoute');
const vendorRoute = require('@/modules/ecommerce/route/vendorRoute');
const categoryRoute = require('@/modules/ecommerce/route/categoryRoute');
const settingRoute = require('@/modules/ecommerce/route/settingRoute');
const userStatsRoute = require('@/modules/ecommerce/route/stats/userStatsRoute');
const userDataRoute = require('@/modules/ecommerce/route/user/userDataRoute');


// Customer Route //
app.use('/v1/customer', customerRoute);
app.use('/v1/customer/auth', customerAuthRoute);

// ECOMMERCE
app.use('/v1/product', productRoute); // Product and Categories
app.use('/v1/category', categoryRoute);

// Vendor
app.use('/v1/vendor', vendorRoute);

// ADMIN
app.use('/v1/admin/product', productAdminRoute);
app.use('/v1/admin/order', orderAdminRoute);
app.use('/v1/admin/setting', settingRoute);

// User
app.use('/v1/user/auth', userAuthRoute);
app.use('/v1/user/stats', userStatsRoute);
app.use('/v1/user/data', userDataRoute);

// Serve static files from the "public" directory
app.use(express.static('public'));

// Define the port and start the server
const port = process.env.PORT || 4000;
app.listen(port, '0.0.0.0', () => console.log(`Server running on port ${port}`));
