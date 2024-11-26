import { Router } from 'express';
const router = Router();
// verify
import authVerify from '../middleware/authVerify.mjs';
import casbinMiddleware from '../middleware/casbinMiddleware.mjs';
// controller
import CensorshipsController from '../app/controllers/CensorshipsController.mjs';

/**
 * @openapi
 * tags:
 *   name: Censorships
 *   description: Censorship management endpoints
 */

/**
 * @openapi
 * /api/v1/censorships:
 *   get:
 *     summary: Get all censorships
 *     tags: [Censorships]
 *     responses:
 *       200:
 *         description: List of censorships
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   status:
 *                     type: string
 *                   description:
 *                     type: string
 *       500:
 *         description: Server error
 */
router.get('/', CensorshipsController.getAllCensorships);

/**
 * @openapi
 * /api/v1/censorships/update:
 *   put:
 *     summary: Update censorship
 *     tags: [Censorships]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               status:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Censorship updated
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
router.put('/update', CensorshipsController.updateCensorship);

export default router;
