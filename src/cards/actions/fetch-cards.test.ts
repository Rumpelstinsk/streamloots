import { Analitics } from '../../analitics';
import { CardRepository } from '../../repositories';
import { cardsFrom } from '../../tests/helpers/card-helper';
import { FetchCards } from './fetch-cards';

describe('FetchCards', () => {
  it('returns all user cards', async () => {
    const cards = cardsFrom(100);    
    CardRepository.search = jest.fn().mockResolvedValue(cards);

    const result = await FetchCards.do();

    expect(result).toEqual(cards);
  });

  it('save total number of cards of the user', async () => {
    const cards = cardsFrom(5);    
    const totalCards = 10;
    CardRepository.search = jest.fn().mockResolvedValue(cards);
    Analitics.saveUserCards = jest.fn();

    await FetchCards.do();

    expect(Analitics.saveUserCards).toHaveBeenCalledWith(totalCards);
  });

  it('returns filtered cards by name', async () => {
    const cards = cardsFrom(100);    
    CardRepository.search = jest.fn().mockResolvedValue(cards);

    const result = await FetchCards.do('10-name');

    expect(result.length).toEqual(1);
  });

  it('returns filtered cards by total cards', async () => {
    const cards = cardsFrom(100);    
    CardRepository.search = jest.fn().mockResolvedValue(cards);

    const result = await FetchCards.do('', 90);

    expect(result.length).toEqual(10);
  });

  it('returns an empty array if cards cannot be retrieved', async () => {       
    CardRepository.search = jest.fn().mockImplementation(() => {throw new Error('an error');});

    const result = await FetchCards.do();

    expect(result).toEqual([]);
  });  
});