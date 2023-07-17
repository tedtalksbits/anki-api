import express from 'express';
import {
  createFlashcard,
  deleteFlashcard,
  getFlashcard,
  getFlashcards,
  patchFlashcard,
} from './flashcardController';
import { verifySessionAndToken } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/', verifySessionAndToken, createFlashcard);
router.get('/', verifySessionAndToken, getFlashcards);
router.get('/:id', verifySessionAndToken, getFlashcard);
router.delete('/:id', verifySessionAndToken, deleteFlashcard);
router.patch('/:id', verifySessionAndToken, patchFlashcard);

export default router;
