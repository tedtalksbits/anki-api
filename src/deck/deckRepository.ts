import { DeckDTOType, DeckType } from './deckType';
import { EasyMySql } from '../lib/easyMySql';

export class DeckRepository {
  tableName: string;
  constructor() {
    this.tableName = 'decks';
  }
  async save(deck: DeckDTOType): Promise<any[]> {
    return (await EasyMySql.save(this.tableName, deck)) as any[];
  }
  async find(where: any): Promise<DeckType[]> {
    return (await EasyMySql.select(this.tableName, where)) as DeckType[];
  }
  async findOneById(id: number): Promise<DeckType[]> {
    return (await EasyMySql.select(this.tableName, { id })) as DeckType[];
  }
  async findAll(): Promise<DeckType[]> {
    return (await EasyMySql.selectAll(this.tableName)) as DeckType[];
  }

  async findAllByUserId(userId: number): Promise<DeckType[]> {
    return (await EasyMySql.select(this.tableName, {
      user_id: userId,
    })) as DeckType[];
  }
  async patch(patch: Partial<DeckType>, where: any): Promise<any[]> {
    return (await EasyMySql.update(this.tableName, patch, where)) as any[];
  }
  async delete(where: any): Promise<any[]> {
    return (await EasyMySql.delete(this.tableName, where)) as any[];
  }
}
