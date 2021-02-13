import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import * as reactRedux from 'react-redux';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import userEvent from '@testing-library/user-event';
import { StoreType } from '../store/store';
import { initialState as initialCardState } from '../store/cards/reducer';
import { initialState as initialFilterState } from '../store/filters/reducer';
import EditCardPage from './EditCardPage';
import { cardFrom } from '../tests/helpers/card-helper';
import { Navigation } from '../navigation';
import * as useCardHook from '../store/hooks/use-cards';
import { UpdateCard } from './actions/update-card';

const mockCard = cardFrom(5);
jest.mock('react-router-dom', () => ({    
  useParams: ():{ id:string } => ({
    id: mockCard._id
  })
}));

describe('EditCardPage', () => {
  describe('card not found', () => {
    it('shows an error', () => {
      jest.spyOn(useCardHook, 'useCards').mockReturnValue({ cards: [] } as unknown as useCardHook.HookType);

      renderComponent();

      expect(screen.getByText(/not found/)).toBeVisible();
    });
  });

  describe('card loaded', () => {
    const mockEditCard = jest.fn();

    beforeEach(() => {
      jest.spyOn(useCardHook, 'useCards').mockReturnValue({ 
        cards: [mockCard], 
        editCard: mockEditCard 
      } as unknown as useCardHook.HookType);
    });
    
    it('shows form to edit a card', () => {
      renderComponent();
    
      expect(screen.getByDisplayValue('5-url')).toBeVisible();
    });

    it('saves card data on save click', async () => {
      const newCard = { ...mockCard, name:'new name' };
      Navigation.toDashboard = jest.fn();
      UpdateCard.do = jest.fn().mockResolvedValue(true);
      renderComponent();

      const input = screen.getByLabelText('Name of the card');
      userEvent.clear(input);
      userEvent.type(input, newCard.name);
      userEvent.click(screen.getByText(/Save/));

      await waitFor(() => {
        expect(UpdateCard.do).toHaveBeenCalledWith(newCard);
        expect(mockEditCard).toHaveBeenCalledWith(newCard);
        expect(Navigation.toDashboard).toHaveBeenCalled();
      });            
    });

    it('returns to card list on cancel', () => {
      Navigation.toDashboard = jest.fn();
      renderComponent();

      userEvent.click(screen.getByText('Cancel'));

      expect(Navigation.toDashboard).toHaveBeenCalled();
    });
  });

  const renderComponent = (): MockStoreEnhanced<unknown, {}> => {
    const store: StoreType = { cards: initialCardState, filters: initialFilterState };
    const mockStore = configureStore();
    const mock = mockStore(store);

    render(
      <reactRedux.Provider store={mock}>
        <EditCardPage />
                
      </reactRedux.Provider>
    );

    return mock;
  };
});