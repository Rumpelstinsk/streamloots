import { ActionTypes, FilterActionTypes } from './filter-types';


export const clearFilters = (): FilterActionTypes => ({
  type: ActionTypes.CLEAR_FILTERS
});

export const setCardName = (cardName: string): FilterActionTypes => ({
  type: ActionTypes.SET_CARD_NAME,
  cardName
});

export const setMinCards = (minCards: number | null):FilterActionTypes => ({
  type: ActionTypes.SET_MIN_CARDS,
  minCards
});