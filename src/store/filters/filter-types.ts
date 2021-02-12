export type FilterState = {
  cardName: string,
  minCards: number | null
};

export enum ActionTypes {
  CLEAR_FILTERS = 'CLEAR_FILTERS',
  SET_CARD_NAME = 'SET_CARD_NAME',
  SET_MIN_CARDS = 'SET_MIN_CARDS'
}

interface ClearFiltersAction {
  type: ActionTypes.CLEAR_FILTERS
}

interface SetCardNameAction {
  type: ActionTypes.SET_CARD_NAME
  cardName: string
}

interface SetMinCardAction {
  type: ActionTypes.SET_MIN_CARDS,
  minCards: number | null
}

export type FilterActionTypes = ClearFiltersAction | SetCardNameAction | SetMinCardAction;