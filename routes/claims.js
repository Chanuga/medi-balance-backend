// routes/claimsRoutes.mjs

/**
 * @swagger
 * tags:
 *   name: Claims
 *   description: Claims management
 */

import express from 'express';
import { deleteClaim, getAllClaims, getClaim, saveClaim, updateClaim } from '../controllers/claimsController.js';
import { requireAuth } from '../middleware/requireAuth.js';

const router = express.Router();

router.use(requireAuth)

/**
 * @swagger
 * /api/claims:
 *   get:
 *     summary: Get a list of claims
 *     description: Retrieve a list of claims.
 */
router.get('/', getAllClaims);

/**
 * @swagger
 * /api/claims/:id:
 *   get:
 *     summary: Get a list of claims
 *     description: Retrieve a list of claims.
 */
router.get('/:id', getClaim);

/**
 * @swagger
 * /api/claims:
 *   post:
 *     summary: Get a list of claims
 *     description: Retrieve a list of claims.
 */
router.post('/', saveClaim);

/**
 * @swagger
 * /api/claims/delete/:id:
 *   post:
 *     summary: Get a list of claims
 *     description: Retrieve a list of claims.
 */
router.post('/delete/:id', deleteClaim);

/**
 * @swagger
 * /api/claims/update/:id:
 *   post:
 *     summary: Get a list of claims
 *     description: Retrieve a list of claims.
 */
router.post('/update/:id', updateClaim);

export default router;