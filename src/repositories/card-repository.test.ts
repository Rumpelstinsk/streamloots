import { ApiClient } from './api-client';
import { CardRepository } from './card-repository';

describe('CardRepository', () => {
  describe('.search', () => {
    it('returns user cards', async () => {
      const cards = [{ id: 'an-id' }];            
      ApiClient.fetch = jest.fn().mockReturnValue(cards);

      const result = await CardRepository.search('a-user-id');

      expect(result).toEqual(result);
    });
  });
});