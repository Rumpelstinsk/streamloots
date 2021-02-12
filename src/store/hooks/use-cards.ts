import { useDispatch, useSelector } from 'react-redux';
import { FetchCards } from '../../actions/fetch-cards';
import { Card } from '../../repositories';
import { deleteCard, editCard, setCards } from '../cards/actions';
import { CardActionTypes } from '../cards/cards-types';
import { StoreType } from '../store';

type HookType = {
  cards: Card[],
  setCards:  (cards: Card[]) => CardActionTypes,
  editCard: (card: Card) => CardActionTypes,
  deleteCard: (_id: string) => CardActionTypes,
  loadNotes: () => Promise<void>
};


export const useCards = ():HookType => {    
  const dispatch = useDispatch();
  const cardState = useSelector((state:StoreType) => state.cards);    

  const loadNotes = async ():Promise<void> =>{
    const cards = await FetchCards.do();
    dispatch(setCards(cards));
  };

  return {
    cards: cardState.cards,
    deleteCard: (_id:string): CardActionTypes => dispatch(deleteCard(_id)),
    editCard: (card: Card): CardActionTypes => dispatch(editCard(card)),
    setCards: (cards: Card[]):CardActionTypes => dispatch(setCards(cards)),
    loadNotes
  };
};