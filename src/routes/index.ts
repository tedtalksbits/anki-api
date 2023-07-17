import express from 'express';
import authRoutes from '../auth/authRoutes';
import userRoutes from '../user/userRoutes';
import deckRoutes from '../deck/deckRoutes';
import flashcardRoutes from '../flashcard/flashcardRoutes';
const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/decks', deckRoutes);
router.use('/flashcards', flashcardRoutes);

export default router;
