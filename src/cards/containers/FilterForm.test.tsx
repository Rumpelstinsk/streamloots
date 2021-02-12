import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import * as reactRedux from 'react-redux';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import FilterForm from './FilterForm';
import { StoreType } from '../../store/store';
import { initialState as initialCardState } from '../../store/cards/reducer';
import { initialState as initialFilterState } from '../../store/filters/reducer';
import { clearFilters, setCardName, setMinCards } from '../../store/filters/actions';


describe('FilterForm', () => {
  it('shows filter form', () => {
    renderComponent();

    expect(screen.getByLabelText(/card name/)).toBeVisible();
    expect(screen.getByLabelText(/number of cards/)).toBeVisible();
    expect(screen.getByText(/Clear/)).toBeVisible();
  });

  it('clear filter store on filters clear click', () => {
    const action = clearFilters();
    const store = renderComponent();

    userEvent.click(screen.getByText(/Clear/));

    const [triggeredAction] = store.getActions();
    expect(triggeredAction).toEqual(action);
  });

  it('updates filter store when a filter change', async () => {
    const aCardFilter = 'a card filter';
    const aMinCardFilter = 25;
    const actions = [setCardName(aCardFilter), setMinCards(aMinCardFilter)];
    const store = renderComponent();

    userEvent.type(screen.getByLabelText(/card name/), aCardFilter);
    userEvent.type(screen.getByLabelText(/number of cards/), `${aMinCardFilter}`);

    await waitFor(() => {
      const triggeredActions = store.getActions();
      expect(triggeredActions).toEqual(actions);
    });        
  });

  const renderComponent = (): MockStoreEnhanced<unknown, {}> => {
    const store:StoreType = { cards: initialCardState, filters: initialFilterState };
    const mockStore = configureStore();
    const mock = mockStore(store);

    render(
      <reactRedux.Provider store={mock}>
        <FilterForm />
      </reactRedux.Provider>
    );

    return mock;
  };
});