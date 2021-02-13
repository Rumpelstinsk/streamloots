import { Analitics } from '../../analitics';
import { Card, CardRepository } from '../../repositories';

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
      // Also if the API response were more complex, probably it would contain the total row numbers
      Analitics.saveUserCards(this.totalCardsFrom(baseCards));
      const filteredNameCards = this.filterByName(baseCards, cardName);

      return this.filterByMinCards(filteredNameCards, minCards);
    } catch {
      // Here we could place some logic to log the exception, in Sentry or somewhere else
      return [];
    }
  }

  private static totalCardsFrom(cards:Card[]): number {
    return cards
      .map(card => card.count.total)
      .reduce((acc, total) => acc + total);
  }

  private static filterByName(cards: Card[], cardName:string):Card[] {
    if (cardName === '') return cards;

    const filterName = cardName.toLowerCase();
    return cards.filter(card => card.name.toLowerCase().indexOf(filterName) >= 0);
  }

  private static filterByMinCards(cards: Card[], minCards:number | null):Card[] {
    if (minCards === null || minCards <= 0) return cards;

    return cards.filter(card => card.count.total >= minCards);
  }
}