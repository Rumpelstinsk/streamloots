import { render, screen } from '@testing-library/react';
import React from 'react';
import * as reactRedux from 'react-redux';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import { StoreType } from '../store/store';
import { initialState as initialCardState } from '../store/cards/reducer';
import { initialState as initialFilterState } from '../store/filters/reducer';
import ListPage from './ListPage';

describe('ListPage', () => {
  it('shows filter form', () => {
    renderComponent();

    expect(screen.getByLabelText(/card name/)).toBeVisible();
    expect(screen.getByLabelText(/number of cards/)).toBeVisible();
    expect(screen.getByText(/Clear/)).toBeVisible();
  });

  it('shows card list', () => {
    renderComponent();

    expect(screen.getByText(/Card name/)).toBeVisible();
  });

  const renderComponent = (): MockStoreEnhanced<unknown, {}> => {
    const store:StoreType = { cards: initialCardState, filters: initialFilterState };
    const mockStore = configureStore();
    const mock = mockStore(store);

    render(
      <reactRedux.Provider store={mock}>
        <ListPage />
      </reactRedux.Provider>
    );

    return mock;
  };
});