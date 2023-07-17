import express from 'express';
import {
  createDeck,
  deleteDeck,
  getDeck,
  getDecks,
  updateDeck,
} from './deckControllers';
import { verifySessionAndToken } from '../middleware/authMiddleware';
const router = express.Router();

router.post('/', verifySessionAndToken, createDeck);
router.get('/', verifySessionAndToken, getDecks);
router.get('/:id', verifySessionAndToken, getDeck);
router.patch('/:id', verifySessionAndToken, updateDeck);
router.delete('/:id', verifySessionAndToken, deleteDeck);

export default router;
