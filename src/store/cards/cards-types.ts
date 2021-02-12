import { Card } from '../../repositories';

export type CardState = {
  cards: Card[]
};

export enum ActionTypes {
  SET_CARDS = 'SET_CARDS',
  EDIT_CARD = 'EDIT_CARD',
  DELETE_CARD = 'DELETE_CARD'
}

interface SetCardAction {
  type: ActionTypes.SET_CARDS,
  cards: Card[]
}

interface EditCardAction {
  type: ActionTypes.EDIT_CARD,
  card: Card
}

interface DeleteCardAction {
  type: ActionTypes.DELETE_CARD,
  _id: string
}

export type CardActionTypes = SetCardAction | EditCardAction | DeleteCardAction;