// routes/usersRoutes.mjs

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Users management
 */

import express from 'express';
import { loginUser, signupUser } from '../controllers/usersController.js';

const router = express.Router();

/**
 * @swagger
 * /api/user/login:
 *   get:
 *     summary: Get a list of claims
 *     description: Retrieve a list of claims.
 */
// login
router.post('/login', loginUser)

/**
 * @swagger
 * /api/user/signup:
 *   get:
 *     summary: Get a list of claims
 *     description: Retrieve a list of claims.
 */
// signup
router.post('/signup', signupUser)

export default router;
