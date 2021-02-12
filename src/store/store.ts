import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { cardReducer } from './cards/reducer';
import { filterReducer } from './filters/reducer';
import { CardState } from './cards/cards-types';
import { FilterState } from './filters/filter-types';

export type StoreType = {
  cards: CardState,
  filters: FilterState
};
  
const reducer = combineReducers<StoreType>({ cards: cardReducer, filters: filterReducer });
export const store = createStore(reducer, applyMiddleware(thunk));