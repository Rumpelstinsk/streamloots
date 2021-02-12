import { CardRepository, Card } from '../repositories';
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

  const cardsFrom = (number: number):Card[] => new Array(number).fill({}).map((_, index):Card => ({
    _id: `${index}`,
    count: { total: 10 },
    imageUrl: `${index}-url`,
    name: `${index}-name`
  }));
});