import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { cardsFrom } from '../../../../tests/helpers/card-helper';
import CardTable from './CardTable';

describe('Table', () => {
  it('shows card table', () => {
    const cards = cardsFrom(5);

    renderComponent({ cards });

    expect(screen.getByText(/Card name/)).toBeVisible();
    expect(screen.getByText(/Number of cards/)).toBeVisible();
    expect(screen.getByAltText('1-name')).toBeVisible();
    expect(screen.getByText('1-name')).toBeVisible();
    expect(screen.getByText('4')).toBeVisible();
  });

  it('shows pagination', () => {
    const cards = cardsFrom(50);
    const numberItemsInPage = 10;

    renderComponent({ cards, numberItemsInPage });

    expect(screen.getByText('9-name')).toBeVisible();
    expect(screen.queryByText('10-name')).not.toBeInTheDocument();
  });

  it('can change page', () => {
    const cards = cardsFrom(50);
    const numberItemsInPage = 10;
    renderComponent({ cards, numberItemsInPage });

    expect(screen.getByText('9-name')).toBeVisible();
    expect(screen.queryByText('10-name')).not.toBeInTheDocument();
  });

  it('triggers a callback on row click', () => {
    const cards = cardsFrom(10);
    const card = cards[3];
    const onClick = jest.fn();
    renderComponent({ cards, onClick });

    userEvent.click(screen.getByText(card.name));

    expect(onClick).toHaveBeenCalledWith(card._id);
  });

  it('triggers a callback on delete button click', () => {
    const cards = cardsFrom(1);
    const card = cards[0];
    const onClick = jest.fn();
    const onDelete = jest.fn();
    renderComponent({ cards, onClick, onDelete });

    userEvent.click(screen.getByText(/Delete/));

    expect(onDelete).toHaveBeenCalledWith(card._id);
    expect(onClick).not.toHaveBeenCalled();    
  });

  const renderComponent = (props?: Record<string, unknown>): void => {
    const defaultProps = {
      cards: [],
      numberItemsInPage: 10,
      onClick: jest.fn(),
      onDelete: jest.fn()
    };

    render(<CardTable {...defaultProps} {...props} />);
  };
});