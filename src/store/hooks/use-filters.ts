import { useDispatch, useSelector } from 'react-redux';
import { clearFilters, setCardName, setMinCards } from '../filters/actions';
import { FilterActionTypes } from '../filters/filter-types';
import { StoreType } from '../store';

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
  
  return {
    cardName: filterState.cardName,
    minCards: filterState.minCards,
    clearFilters: (): FilterActionTypes => dispatch(clearFilters()),
    setCardName: (cardName: string): FilterActionTypes => dispatch(setCardName(cardName)),
    setMinCards: (minCards: number| null):FilterActionTypes => dispatch(setMinCards(minCards))
  };
};