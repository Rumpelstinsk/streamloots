import { useDispatch, useSelector } from 'react-redux';
import { clearFilters as clearFiltersAction, setCardName as setCardNameAction, setMinCards as setMinCardsAction } from '../filters/actions';
import { FilterActionTypes } from '../filters/filter-types';
import { initialState } from '../filters/reducer';
import { StoreType } from '../store';
import { useRefreshCards } from './use-refresh-cards';

type HookType = {
  cardName: string,
  minCards: number | null,
  clearFilters:  () => FilterActionTypes,
  setCardName: (cardName: string) => FilterActionTypes,
  setMinCards: (minCards: number | null) => FilterActionTypes
};

export const useFilters = ():HookType => {    
  const dispatch = useDispatch();
  const filterState = useSelector((state:StoreType) => state.filters);    
  const { refreshCards } = useRefreshCards();

  const setCardName = (cardName: string): FilterActionTypes => {
    refreshCards(cardName, filterState.minCards);
    return dispatch(setCardNameAction(cardName));
  };

  const setMinCards = (minCards: number| null): FilterActionTypes => {
    refreshCards(filterState.cardName, minCards);
    return dispatch(setMinCardsAction(minCards));
  };

  const clearFilters = (): FilterActionTypes => {
    refreshCards(initialState.cardName, initialState.minCards);
    return dispatch(clearFiltersAction());
  };


  return {
    cardName: filterState.cardName,
    minCards: filterState.minCards,
    clearFilters: (): FilterActionTypes => dispatch(clearFilters()),
    setCardName,
    setMinCards
  };
};