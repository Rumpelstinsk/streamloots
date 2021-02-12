import { Card, CardRepository } from '../repositories';

export class FetchCards {
  static async do():Promise<Card[]>{
    try {
      // We are asuming that this const is the user id.
      // In a real situation, the user should be logged in and here will be some logic to retrieve user id from jwt
      const user = '1Wz2QGDH9tsXIkaphMshpley58xNb8jKd';
      return await CardRepository.search(user);
    } catch {
      // Here we could place some logic to log the exception, in Sentry or somewhere else
      return [];
    }
  }
}