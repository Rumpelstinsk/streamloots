import { ApiClient } from './api-client';
import { Card } from './dto/card';

export class CardRepository {
  static async search(user:string): Promise<Card[]> {    
    return ApiClient.fetch<Card[]>(user);
  }
}