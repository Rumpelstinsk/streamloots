import { useDispatch, useSelector } from 'react-redux';
import { Card } from '../../repositories';
import { deleteCard, editCard, setCards } from '../cards/actions';
import { CardActionTypes, CardState } from '../cards/cards-types';
import { StoreType } from '../store';

export type HookType = {
  cards: Card[],
  setCards: (cards: Card[]) => CardActionTypes,
  editCard: (card: Card) => CardActionTypes,
  deleteCard: (_id: string) => CardActionTypes
};


export const useCards = (): HookType => {
  const dispatch = useDispatch();
  const cardState: CardState = useSelector((state: StoreType) => state.cards);

  return {
    cards: cardState.cards,
    deleteCard: (_id: string): CardActionTypes => dispatch(deleteCard(_id)),
    editCard: (card: Card): CardActionTypes => dispatch(editCard(card)),
    setCards: (cards: Card[]): CardActionTypes => dispatch(setCards(cards))
  };
};