import { Card } from '../../repositories';
import { ActionTypes, CardActionTypes } from './cards-types';


export const setCards = (cards: Card[]): CardActionTypes => ({
  type: ActionTypes.SET_CARDS,
  cards
});

export const editCard = (card: Card): CardActionTypes => ({
  type: ActionTypes.EDIT_CARD,
  card
});

export const deleteCard = (_id:string):CardActionTypes => ({
  type: ActionTypes.DELETE_CARD,
  _id
});