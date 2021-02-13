import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import * as reactRedux from 'react-redux';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import userEvent from '@testing-library/user-event';
import { StoreType } from '../store/store';
import { initialState as initialCardState } from '../store/cards/reducer';
import { initialState as initialFilterState } from '../store/filters/reducer';
import ListPage from './ListPage';
import { FetchCards } from '../actions/fetch-cards';
import { setCards } from '../store/cards/actions';
import { cardsFrom } from '../tests/helpers/card-helper';
import Navigation from '../navigation/navigation';
import * as useCardHook from '../store/hooks/use-cards';



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

  it('refreshes cards on load', async () => {
    const cards = cardsFrom(3);
    const action = setCards(cards);
    FetchCards.do = jest.fn().mockResolvedValue(cards);

    const mock = renderComponent();

    await waitFor(() => {
      const [triggeredAction] = mock.getActions();
      expect(action).toEqual(triggeredAction);
    });    
  });

  it('does not refreshes cards if they are cached', async () => {
    const cards = cardsFrom(3);
    jest.spyOn(useCardHook, 'useCards').mockReturnValue({ cards } as useCardHook.HookType);  

    const mock = renderComponent();

    await waitFor(() => {
      const triggeredAction = mock.getActions();
      expect(triggeredAction).toEqual([]);
    });    
  });

  it('redirects to edit page on card click', () => {
    const cards = cardsFrom(3);
    const card = cards[0];
    Navigation.toCardDetail = jest.fn();
    jest.spyOn(useCardHook, 'useCards').mockReturnValue({ cards } as useCardHook.HookType);        
    renderComponent();

    userEvent.click(screen.getByText(card.name));
    
    expect(Navigation.toCardDetail).toHaveBeenCalledWith(card._id);
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