import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import PlainForm from './PlainForm';

describe('PlainForm', () => {
  it('shows filter form', () => {
    renderComponent();

    expect(screen.getByLabelText(/card name/)).toBeVisible();
    expect(screen.getByLabelText(/number of cards/)).toBeVisible();
    expect(screen.getByText(/Clear/)).toBeVisible();
  });

  it('can render with default filters', () => {
    const cardName = 'a card name';
    const minCard = 25;

    renderComponent({ cardName, minCard });

    expect(screen.getByDisplayValue(cardName)).toBeVisible();
    expect(screen.getByDisplayValue(minCard)).toBeVisible();
  });

  it('triggers a callback when filters are cleared', () => {
    const onClearFilter = jest.fn();
    renderComponent({ onClearFilter });

    userEvent.click(screen.getByText(/Clear/));

    expect(onClearFilter).toHaveBeenCalled();
  });

  it('triggers a callback when card name filter change', async () => {
    const cardName = 'a card name';
    const minCard = null;
    const newFilter = 'new card name';
    const onFilterChange = jest.fn();
    renderComponent({ cardName, minCard, onFilterChange });

    userEvent.clear(screen.getByLabelText(/card name/));
    userEvent.type(screen.getByLabelText(/card name/), newFilter);

    await waitFor(() => expect(onFilterChange).toHaveBeenCalledWith(newFilter, minCard));
  });

  it('triggers a callback when total of cards change', async () => {
    const cardName = 'a card name';
    const minCard = null;
    const newFilter = 28;
    const onFilterChange = jest.fn();
    renderComponent({ cardName, minCard, onFilterChange });

    userEvent.type(screen.getByLabelText(/number of cards/), newFilter.toString());

    await waitFor(() => expect(onFilterChange).toHaveBeenCalledWith(cardName, newFilter));
  });

  const renderComponent = (props?: Record<string, unknown>): void => {
    const defaultProps = {
      cardName: '',
      minCard: null,
      onFilterChange: jest.fn(),
      onClearFilter: jest.fn()
    };

    render(<PlainForm {...defaultProps} {...props} />);
  };
});