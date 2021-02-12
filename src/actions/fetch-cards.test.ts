import { CardRepository } from '../repositories';
import cardsFrom from '../tests/helpers/cards-from';
import { FetchCards } from './fetch-cards';

describe('FetchCards', () => {
  it('returns all user cards', async () => {
    const cards = cardsFrom(100);    
    CardRepository.search = jest.fn().mockResolvedValue(cards);

    const result = await FetchCards.do();

    expect(result).toEqual(cards);
  });

  it('returns filtered cards', async () => {
    const cards = cardsFrom(100);    
    CardRepository.search = jest.fn().mockResolvedValue(cards);

    const result = await FetchCards.do('1-name');

    expect(result.length).toEqual(1);
  });

  it('returns an empty array if cards cannot be retrieved', async () => {       
    CardRepository.search = jest.fn().mockImplementation(() => {throw new Error('an error');});

    const result = await FetchCards.do();

    expect(result).toEqual([]);
  });  
});