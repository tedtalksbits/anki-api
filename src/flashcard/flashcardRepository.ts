import { EasyMySql } from '../lib/easyMySql';
import { FlashcardDTOType, FlashcardType } from './flashcardType';
export class FlashcardRepository {
  tableName: string;

  constructor() {
    this.tableName = 'flashcards';
  }

  async save(flashcard: FlashcardDTOType): Promise<any[]> {
    return (await EasyMySql.save(this.tableName, flashcard)) as any[];
  }
  async find(where: any): Promise<FlashcardType[]> {
    return (await EasyMySql.select(this.tableName, where)) as FlashcardType[];
  }
  async findById(id: number): Promise<FlashcardType[]> {
    return (await EasyMySql.select(this.tableName, { id })) as FlashcardType[];
  }

  async findAll(): Promise<FlashcardType[]> {
    return (await EasyMySql.selectAll(this.tableName)) as FlashcardType[];
  }

  async findByDeckId(deckId: number): Promise<FlashcardType[]> {
    return (await EasyMySql.select(this.tableName, {
      deck_id: deckId,
    })) as FlashcardType[];
  }

  async patch(patch: Partial<FlashcardType>, where: any): Promise<any[]> {
    return (await EasyMySql.update(this.tableName, patch, where)) as any[];
  }
  async delete(where: any): Promise<any[]> {
    return (await EasyMySql.delete(this.tableName, where)) as any[];
  }
}
