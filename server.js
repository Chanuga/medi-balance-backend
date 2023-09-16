import path from "path";
import { fileURLToPath } from 'url'; // New import for file URL conversion
import express from "express";
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from "cors"
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express"
import claimsRoutes from './routes/claims.js'
import userRoutes from './routes/users.js'
import dashboardRoutes from './routes/dashboard.js'
// const cors = require('cors');

dotenv.config();

const __filename = fileURLToPath(import.meta.url); // Convert import.meta.url to __filename
const __dirname = path.dirname(__filename); // Derive __dirname from __filename

// create the express app
const app = express();

// Swagger configuration options
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Medi Balance',
            version: '1.0.0',
            description: 'API documentation for Medi Balance',
        },
    },
    // Use a glob pattern to include all route files in the routes directory
    apis: [path.join(__dirname, 'routes', '*.js')],
};

// Initialize Swagger
const swaggerSpec = swaggerJsDoc(swaggerOptions);

// middleware
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})

// routes
app.use('/api/user', userRoutes);
app.use('/api/claims', claimsRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen for requests
        app.listen(process.env.PORT, () => {
            console.log('connected to the db & listning on port', process.env.PORT);
        })
    })
    .catch((error) => {
        console.log(error);
    })