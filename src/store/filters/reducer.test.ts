import { clearFilters, setCardName, setMinCards } from './actions';
import { FilterState } from './filter-types';
import { filterReducer, initialState } from './reducer';

describe('FilterReducer', () => {
  it('clears previous filters',  () => {
    const previouState = aState('a card name', 5);
    const action = clearFilters();

    const state = filterReducer(previouState, action);

    expect(state).toEqual(initialState);
  });

  it('stores card name filter', () => {
    const expectedState = aState('a card name');
    const action = setCardName('a card name');

    const state = filterReducer(initialState, action);

    expect(state).toEqual(expectedState);
  });

  it('stores min cards filter', () => {
    const expectedState = aState(initialState.cardName, 25);
    const action = setMinCards(25);

    const state = filterReducer(initialState, action);

    expect(state).toEqual(expectedState);
  });

  const aState = (cardName = '', minCards:number|null = null):FilterState => ({ cardName, minCards });
});