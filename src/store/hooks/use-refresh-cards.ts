import { useDispatch, useSelector } from 'react-redux';
import { FetchCards } from '../../actions/fetch-cards';
import { setCards } from '../cards/actions';
import { StoreType } from '../store';

type HookType = {
  refreshCards: (cardName?: string, minCards?: number|null) => void
};

export const useRefreshCards = ():HookType => {
  const dispatch = useDispatch();
  const filterState = useSelector((state:StoreType) => state.filters);    

  const refreshCards = async (cardName?: string, minCards?: number|null): Promise<void> => {
    const cardNameFilter = cardName === undefined ? filterState.cardName : cardName;
    const minCardFilter = minCards === undefined ? filterState.minCards : minCards;

    const cards = await FetchCards.do(cardNameFilter, minCardFilter);
    dispatch(setCards(cards));
  };

  return { refreshCards };
};