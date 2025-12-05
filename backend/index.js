require('module-alias/register');
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const BodyParser = require("body-parser");

const app = express();
app.use(cors());

// ✅ Allow specific domains
const allowedOrigins = [
    "http://localhost:3000",
    "https://bdhoms.com",
    "https://www.bdhoms.com"
];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps, curl)
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        } else {
            return callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
}));

// For JSON body parsing
app.use(express.json());
app.use(BodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Custom Global Middlewares
app.get('/', async (req,res)=>{
        res.end("Its An API Server");
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
const settingRoute =  require('@/modules/ecommerce/route/settingRoute');
const userStatsRoute = require('@/modules/ecommerce/route/stats/userStatsRoute');
const userDataRoute = require('@/modules/ecommerce/route/user/userDataRoute');


// Customer Route //
app.use('/v1/customer', customerRoute );
app.use('/v1/customer/auth', customerAuthRoute );

// ECOMMERCE
app.use('/v1/product', productRoute ); // Product and Categories
app.use('/v1/category', categoryRoute );
 // app.use('/v1/location', locationRoute );

// Vendor
app.use('/v1/vendor', vendorRoute );

// ADMIN
app.use('/v1/admin/product', productAdminRoute);
app.use('/v1/admin/order', orderAdminRoute);
app.use('/v1/admin/setting', settingRoute );


// User
app.use('/v1/user/auth', userAuthRoute );
app.use('/v1/user/stats', userStatsRoute);

app.use('/v1/user/data', userDataRoute);

// Serve static files from the "public" directory
app.use(express.static('public'));
const port = process.env.PORT;
app.listen(port, '0.0.0.0',  () => console.log('Server running on 4000 PORT'));

