import { Card } from '../../repositories';
import { deleteCard, editCard, setCards } from './actions';
import { cardReducer, initialState } from './reducer';

describe('CardReducer', () => {
  it('stores card information', () => {
    const cards = [aCard('an_id'), aCard('another_id')];
    const action = setCards(cards);

    const state = cardReducer(initialState, action);

    expect(state).toEqual({ cards });
  });

  it('updates card information', () => {
    const fooCard = aCard('foo_id');
    const card = aCard('an_id');
    const updatedCard = aCard('an_id', 'udpated_name', 'updated_url');
    const action = editCard(updatedCard);

    const state = cardReducer({ cards: [fooCard, card] }, action);

    expect(state).toEqual({ cards: [fooCard, updatedCard] });
  });

  it('deletes card', () => {
    const card = aCard('an_id');
    const anotherCard = aCard('another_card');
    const action = deleteCard('an_id');

    const state = cardReducer({ cards: [card, anotherCard] }, action);

    expect(state).toEqual({ cards: [anotherCard] });
  });

  const aCard = (_id: string, name = 'a_name', imageUrl = 'an_url'): Card =>({
    _id,
    count:{ total: 1 },
    imageUrl,
    name
  });
});