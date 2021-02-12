import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FetchCards } from '../../actions/fetch-cards';
import { Card } from '../../repositories';
import { deleteCard, editCard, setCards } from '../cards/actions';
import { CardActionTypes, CardState } from '../cards/cards-types';
import { FilterState } from '../filters/filter-types';
import { StoreType } from '../store';

type HookType = {
  cards: Card[],
  setCards: (cards: Card[]) => CardActionTypes,
  editCard: (card: Card) => CardActionTypes,
  deleteCard: (_id: string) => CardActionTypes,
  loadCards: () => Promise<void>
};


export const useCards = (): HookType => {
  const dispatch = useDispatch();
  const cardState: CardState = useSelector((state: StoreType) => state.cards);
  const filterState: FilterState = useSelector((state: StoreType) => state.filters);

  const loadCards = useCallback(async (): Promise<void> => {
    const cards = await FetchCards.do(filterState.cardName, filterState.minCards);
    dispatch(setCards(cards));
  }, [dispatch, filterState.cardName, filterState.minCards]);

  useEffect(() => {
    loadCards();
  }, [loadCards]);

  return {
    cards: cardState.cards,
    deleteCard: (_id: string): CardActionTypes => dispatch(deleteCard(_id)),
    editCard: (card: Card): CardActionTypes => dispatch(editCard(card)),
    setCards: (cards: Card[]): CardActionTypes => dispatch(setCards(cards)),
    loadCards
  };
};