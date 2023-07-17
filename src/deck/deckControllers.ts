import { Request, Response } from 'express';
import { HTTPError } from '../exception/index';
import { DeckRepository } from './deckRepository';

//:TODO: add pagination, sorting, filtering, searching
// TODO: endpoints that return only one deck should return the deck object, not an array

export const createDeck = async (req: Request, res: Response) => {
  const { name, description, image, tags, visibility } = req.body;

  if (!name) {
    const err = HTTPError.BAD_REQUEST('Name and description are required');
    return res.status(err.statusCode).json({ message: err.message });
  }
  const userId = req.session?.user?.id;
  const deckRepo = new DeckRepository();
  try {
    const saveResult = await deckRepo.save({
      name,
      description: description || null,
      user_id: userId,
      image: image || null,
      tags: tags || null,
      visibility: visibility || 'PUBLIC',
    });
    return res.status(201).json({ deck: saveResult });
  } catch (error) {
    console.log(error);
    const err = HTTPError.INTERNAL_ERROR();
    return res.status(err.statusCode).json({ message: err.message });
  }
};

export const getDeck = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.session?.user?.id;
  const deckRepo = new DeckRepository();
  try {
    const deck = await deckRepo.find({ id, user_id: userId });
    if (!deck || deck.length === 0) {
      const err = HTTPError.NOT_FOUND('Deck not found');
      return res.status(err.statusCode).json({ message: err.message });
    }
    return res.status(200).json({ deck });
  } catch (error) {
    console.log(error);
    const err = HTTPError.INTERNAL_ERROR();
    return res.status(err.statusCode).json({ message: err.message });
  }
};

export const getDecks = async (req: Request, res: Response) => {
  const deckRepo = new DeckRepository();
  const userId = req.session?.user?.id;

  try {
    const decks = await deckRepo.findAllByUserId(userId);

    if (!decks || decks.length === 0) {
      const err = HTTPError.NOT_FOUND('Decks not found');
      return res.status(err.statusCode).json({ message: err.message });
    }

    return res.status(200).json({ decks });
  } catch (error) {
    console.log(error);
    const err = HTTPError.INTERNAL_ERROR();
    return res.status(err.statusCode).json({ message: err.message });
  }
};

export const updateDeck = async (req: Request, res: Response) => {
  const { id: deckId } = req.params;
  const { user_id, created_at, updated_at, id } = req.body;

  if (user_id || created_at || updated_at || id) {
    const err = HTTPError.BAD_REQUEST('one or more invalid fields');
    return res.status(err.statusCode).json({ message: err.message });
  }

  if (!req.body) {
    const err = HTTPError.BAD_REQUEST('No fields to update');
    return res.status(err.statusCode).json({ message: err.message });
  }

  const userId = req.session?.user?.id;
  const deckRepo = new DeckRepository();
  try {
    const [foundDeck] = await deckRepo.findOneById(Number(deckId));
    if (!foundDeck) {
      const err = HTTPError.NOT_FOUND('Deck not found');
      return res.status(err.statusCode).json({ message: err.message });
    }

    // check if user is authorized to update deck
    if (foundDeck.user_id !== userId) {
      const err = HTTPError.FORBIDDEN();
      return res.status(err.statusCode).json({ message: err.message });
    }

    const updateResult = await deckRepo.patch(
      { ...foundDeck, ...req.body },
      {
        id: deckId,
        user_id: userId,
      }
    );
    return res.status(200).json({ deck: updateResult });
  } catch (error) {
    console.log(error);
    const err = HTTPError.INTERNAL_ERROR();
    return res.status(err.statusCode).json({ message: err.message });
  }
};

export const deleteDeck = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.session?.user?.id;
  const deckRepo = new DeckRepository();
  try {
    const [foundDeck] = await deckRepo.find({
      id,
      user_id: userId,
    });

    if (!foundDeck) {
      const err = HTTPError.NOT_FOUND('Deck not found');
      return res.status(err.statusCode).json({ message: err.message });
    }

    // check if user is authorized to delete deck
    if (foundDeck.user_id !== userId) {
      const err = HTTPError.FORBIDDEN();
      return res.status(err.statusCode).json({ message: err.message });
    }

    const deleteResult = await deckRepo.delete({ id, user_id: userId });
    return res.status(200).json({ deck: deleteResult });
  } catch (error) {
    console.log(error);
    const err = HTTPError.INTERNAL_ERROR();
    return res.status(err.statusCode).json({ message: err.message });
  }
};
