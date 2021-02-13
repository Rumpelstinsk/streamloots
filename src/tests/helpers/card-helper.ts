import { Card } from '../../repositories';


export const cardFrom = (_id:number):Card => ({
  _id: `${_id}`,
  count: { total: _id },
  imageUrl: `${_id}-url`,
  name: `${_id}-name`
});

export const cardsFrom = (number: number):Card[] => 
  new Array(number)
    .fill({})
    .map((_, index):Card => cardFrom(index));