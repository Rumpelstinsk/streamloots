import { Card } from '../../repositories';

const cardsFrom = (number: number):Card[] => new Array(number).fill({}).map((_, index):Card => ({
  _id: `${index}`,
  count: { total: index },
  imageUrl: `${index}-url`,
  name: `${index}-name`
}));

export default cardsFrom;