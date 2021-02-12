import { ActionTypes, FilterActionTypes, FilterState } from './filter-types';

export const initialState:FilterState = { cardName: '', minCards: null };

export const filterReducer = (state = initialState, action: FilterActionTypes): FilterState => {
  switch (action.type) {
    case ActionTypes.CLEAR_FILTERS:
      return { ...initialState };
    case ActionTypes.SET_CARD_NAME:
      return { ...state, cardName: action.cardName };
    case ActionTypes.SET_MIN_CARDS:
      return { ...state, minCards: action.minCards };
    default:
      return { ...state };
  }
};