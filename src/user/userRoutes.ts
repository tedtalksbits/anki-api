import express from 'express';
import { verifySessionAndToken } from '../middleware/authMiddleware';
import { getCurrentUser } from './userControllers';

const router = express.Router();

router.get('/me', verifySessionAndToken, getCurrentUser);

export default router;
