import { ActionTypes, CardActionTypes, CardState } from './cards-types';

export const initialState:CardState = { cards: [] };

export const cardReducer = (state = initialState, action: CardActionTypes): CardState => {
  switch (action.type) {
    case ActionTypes.SET_CARDS:
      return { ...state, cards: action.cards };
    case ActionTypes.EDIT_CARD:
      return { ...state, cards: state.cards.map(card => card._id === action.card._id ? action.card : card) };
    case ActionTypes.DELETE_CARD:
      return { ...state, cards: state.cards.filter(card => card._id !== action._id) };
    default:
      return { ...state };
  }
};