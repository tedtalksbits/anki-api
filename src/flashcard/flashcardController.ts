import { Response, Request } from 'express';
import { HTTPError } from '../exception/index';
import { FlashcardRepository } from './flashcardRepository';
import { DeckRepository } from '../deck/deckRepository';

export const createFlashcard = async (req: Request, res: Response) => {
  const { question, answer, tags, deck_id, type, image, audio, video, hint } =
    req.body;

  if (!question || !answer || !deck_id) {
    const err = HTTPError.BAD_REQUEST(
      'question, answer, and deck_id are required'
    );
    return res.status(err.statusCode).json({ message: err.message });
  }
  const userId = req.session?.user?.id;
  const flashcardRepo = new FlashcardRepository();
  const deckRepo = new DeckRepository();

  try {
    const [deckFound] = await deckRepo.find({
      user_id: userId,
      id: deck_id,
    });

    if (!deckFound) {
      const err = HTTPError.NOT_FOUND('Deck not found');
      return res.status(err.statusCode).json({ message: err.message });
    }

    const flashcard = await flashcardRepo.save({
      question,
      answer,
      tags: tags || null,
      deck_id,
      type: type || 'basic',
      image: image || null,
      audio: audio || null,
      video: video || null,
      hint: hint || null,
      user_id: userId,
    });

    return res.status(201).json(flashcard);
  } catch (logError) {
    console.log(logError);
    const err = HTTPError.INTERNAL_ERROR(
      'Internal Server Error - code: RABBIT'
    );
    return res.status(err.statusCode).json({ message: err.message });
  }
};

export const getFlashcards = async (req: Request, res: Response) => {
  const userId = req.session?.user?.id;

  const flashcardRepo = new FlashcardRepository();

  try {
    const flashcards = await flashcardRepo.find({
      user_id: userId,
    });

    if (!flashcards || flashcards.length === 0) {
      const err = HTTPError.NOT_FOUND('No flashcards found');
      return res.status(err.statusCode).json({ message: err.message });
    }

    return res.status(200).json(flashcards);
  } catch (logError) {
    console.log(logError);
    const err = HTTPError.INTERNAL_ERROR(
      'Internal Server Error - code: RABBIT'
    );
    return res.status(err.statusCode).json({ message: err.message });
  }
};

export const getFlashcard = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.session?.user?.id;

  const flashcardRepo = new FlashcardRepository();

  try {
    const [foundFlashcard] = await flashcardRepo.findById(Number(id));

    if (!foundFlashcard) {
      const err = HTTPError.NOT_FOUND('Flashcard not found');
      return res.status(err.statusCode).json({ message: err.message });
    }

    // check if flashcard belongs to user
    if (foundFlashcard.user_id !== userId) {
      const err = HTTPError.FORBIDDEN();
      return res.status(err.statusCode).json({ message: err.message });
    }

    return res.status(200).json(foundFlashcard);
  } catch (logError) {
    console.log(logError);
    const err = HTTPError.INTERNAL_ERROR(
      'Internal Server Error - code: RABBIT'
    );
    return res.status(err.statusCode).json({ message: err.message });
  }
};

export const deleteFlashcard = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.session?.user?.id;

  const flashcardRepo = new FlashcardRepository();

  try {
    const [foundFlashcard] = await flashcardRepo.findById(Number(id));

    if (!foundFlashcard) {
      const err = HTTPError.NOT_FOUND('Flashcard not found');
      return res.status(err.statusCode).json({ message: err.message });
    }

    // check if flashcard belongs to user
    if (foundFlashcard.user_id !== userId) {
      const err = HTTPError.FORBIDDEN();
      return res.status(err.statusCode).json({ message: err.message });
    }

    await flashcardRepo.delete({
      user_id: userId,
      id,
    });

    return res.status(204).json();
  } catch (logError) {
    console.log(logError);
    const err = HTTPError.INTERNAL_ERROR(
      'Internal Server Error - code: RABBIT'
    );
    return res.status(err.statusCode).json({ message: err.message });
  }
};

export const patchFlashcard = async (req: Request, res: Response) => {
  const { id: flashcardId } = req.params;
  const userId = req.session?.user?.id;
  const { id: _, user_id: __, created_at: ___, updated_at: ____ } = req.body;

  if (__ || ___ || ____) {
    const err = HTTPError.BAD_REQUEST('One or more invalid fields');
    return res.status(err.statusCode).json({ message: err.message });
  }

  if (!req.body) {
    const err = HTTPError.BAD_REQUEST('No fields to update');
    return res.status(err.statusCode).json({ message: err.message });
  }

  const flashcardRepo = new FlashcardRepository();

  try {
    const [foundFlashcard] = await flashcardRepo.findById(Number(flashcardId));

    if (!foundFlashcard) {
      const err = HTTPError.NOT_FOUND('Flashcard not found');
      return res.status(err.statusCode).json({ message: err.message });
    }

    // check if flashcard belongs to user
    if (foundFlashcard.user_id !== userId) {
      const err = HTTPError.FORBIDDEN();
      return res.status(err.statusCode).json({ message: err.message });
    }

    await flashcardRepo.patch(
      { ...foundFlashcard, ...req.body },
      {
        id: flashcardId,
        user_id: userId,
      }
    );

    return res.status(200).json(foundFlashcard);
  } catch (logError) {
    console.log(logError);
    const err = HTTPError.INTERNAL_ERROR(
      'Internal Server Error - code: RABBIT'
    );
    return res.status(err.statusCode).json({ message: err.message });
  }
};
