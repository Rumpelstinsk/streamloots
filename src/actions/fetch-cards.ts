import { Card, CardRepository } from '../repositories';

export class FetchCards {
  static async do(cardName:string = '', minCards: number | null = null):Promise<Card[]>{
    try {
      // We are asuming that this const is the user id.
      // In a real situation, the user should be logged in and here will be some logic to retrieve user id from jwt
      const user = '1Wz2QGDH9tsXIkaphMshpley58xNb8jKd';
      const baseCards = await CardRepository.search(user);

      // We assume that the filter will be done in server side
      // In a real situation probably we found a complex api, to retrieve the page,
      // to set number ites per page, etc... This code is just to simulate server filtering
      const filterCards = baseCards
        .filter(card => cardName === '' || card.name === cardName)
        .filter(card => minCards === null || card.count.total >= minCards);

      return filterCards;
    } catch {
      // Here we could place some logic to log the exception, in Sentry or somewhere else
      return [];
    }
  }
}